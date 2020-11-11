process.env.NODE_ENV = 'test';
const app = require('../app');
const request = require('supertest');
const connection = require('../connection');

describe('API', () => {
  beforeEach(() => {
    return connection.seed.run();
  });
  afterAll(() => {
    return connection.destroy();
  });

  test('will return 404 for invalid endpoint', () => {
    return request(app)
      .get('/api/hello')
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toEqual('invalid endpoint');
      });
  });

  describe('API/TOPICS', () => {
    it('GET - 200 - will return all topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          expect(res.body.topics).toEqual(expect.any(Array));
        });
    });
  });
  describe('API/USERS', () => {
    it('GET - 200 - will return object for given username', () => {
      return request(app)
        .get('/api/users/rogersop')
        .expect(200)
        .then((res) => {
          expect(res.body).toEqual({
            user: {
              username: 'rogersop',
              avatar_url:
                'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
              name: 'paul',
            },
          });
        });
    });
    it('GET - 404 - when no user at given username', () => {
      return request(app)
        .get('/api/users/nouserhere')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toEqual('no user found');
        });
    });
  });
  describe('API/ARTICLES', () => {
    test('GET - 200 - responds with all articles', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).toEqual(expect.any(Array));
          expect(res.body.articles[0]).toHaveProperty('author');
        });
    });
    test('GET - 200 - responds articles that have a count of their comments in a comment_count prop', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0]).toHaveProperty('comment_count');
          expect(res.body.articles[0].comment_count).toBe('13');
          expect(res.body.articles[1].comment_count).toBe('0');
        });
    });
    test.only('GET - 200 - responds with the articles sorted and ordered  by given query', () => {
      return request(app)
        .get('/api/articles?sort_by=votes&order=desc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].votes).toBe(100);
        });
    });
    test('GET - 200 - responds with articles filtered by a query', () => {
      return request(app)
        .get('/api/articles?author=rogersop')
        .expect(200)
        .then((res) => {
          expect(res.body.articles.length).toBe(3);
        });
    });

    describe('API/ARTICLES/ARTICLEID', () => {
      test('GET - 200 - responds with article at a given id', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((res) => {
            expect(typeof res.body.article).toEqual('object');
            expect(res.body.article).toHaveProperty('article_id');
          });
      });
      test('GET - 200 - responds with article that has a count of its comments in a comment_count prop', () => {
        return request(app)
          .get('/api/articles/1')
          .expect(200)
          .then((res) => {
            expect(res.body.article.comment_count).toBe('13');
          });
      });
      test('GET - 404 - when no article is found', () => {
        return request(app)
          .get('/api/articles/500')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe('article not found');
          });
      });
      test('PATCH - 200 - updates article at given id', () => {
        return request(app)
          .patch('/api/articles/1')
          .send({ inc_votes: 50 })
          .expect(200)
          .then((res) => {
            expect(res.body.article.votes).toEqual(150);
          });
      });
      test('PATCH - 404 - when no article is found', () => {
        return request(app)
          .patch('/api/articles/500')
          .send({ inc_votes: 50 })
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe('article not found');
          });
      });
      test('DELETE - 204 - will delete article at given id', () => {
        return request(app)
          .delete('/api/articles/1')
          .expect(204)
          .then((res) => {
            return connection('articles')
              .select('*')
              .returning('*')
              .then((articles) => {
                expect(articles.length).toBe(11);
              });
          });
      });
      test('DELETE - 204 - will delete article at given id and all its comments', () => {
        return request(app)
          .delete('/api/articles/1')
          .expect(204)
          .then((res) => {
            return connection('comments')
              .select('*')
              .where('article_id', '=', '1')
              .returning('*')
              .then((comments) => {
                expect(comments.length).toBe(0);
              });
          });
      });
      test('DELETE - 400 - if the article doesnt exist', () => {
        return request(app)
          .delete('/api/articles/2000')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe('no article with an id of 2000');
          });
      });
    });
    describe('API/ARTICLES/:ARTICLEID/COMMENTS', () => {
      test('POST - 201 - will post a new comment on an article', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'rogersop', body: 'this is great!!' })
          .expect(201)
          .then((res) => {
            expect(typeof res.body).toBe('object');
            expect(res.body.comment.body).toBe('this is great!!');
          });
      });
      test('POST - 400 - if the article does not exist', () => {
        return request(app)
          .post('/api/articles/300/comments')
          .send({ username: 'rogersop', body: 'this is great!!' })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe('Bad Request');
          });
      });
      test('POST - 400 - if the username does not exist', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ username: 'nouser', body: 'this is great!!' })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe('Bad Request');
          });
      });
      test('GET - 200 - responds with all the comments of a given article', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then((res) => {
            expect(res.body.comments).toEqual(expect.any(Array));
            expect(res.body.comments[0]).toHaveProperty('comment_id');
            expect(res.body.comments[0]).toHaveProperty('votes');
          });
      });
      test('GET - 200 - responds with the comments sorted by a given query', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=votes&order=desc')
          .expect(200)
          .then((res) => {
            expect(res.body.comments[0].votes).toBe(100);
            expect(res.body.comments[1].votes).toBe(16);
            expect(res.body.comments[1].votes).toBe(16);
          });
      });
    });
  });
});
