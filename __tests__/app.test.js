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
    test('GET - 200 - will return object for given username', () => {
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
    test('GET - 404 - when no user at given username', () => {
      return request(app)
        .get('/api/users/nouserhere')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toEqual('no user found');
        });
    });
    test('POST - 201 - will post a new user', () => {
      return request(app)
        .post('/api/users')
        .send({ username: 'Stevo', name: 'Steve' })
        .expect(201)
        .then((res) => {
          expect(res.body.user.name).toBe('Steve');
        });
    });
    test('POST - 400 - if format is invalid', () => {
      return request(app)
        .post('/api/users')
        .send({ invaldkey: 'Stevo', name: 'Steve' })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe('Bad Request');
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
    test('GET - 200 - responds with articles that have a count of their comments in a comment_count prop', () => {
      return request(app)
        .get('/api/articles')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0]).toHaveProperty('comment_count');
          expect(res.body.articles[0].comment_count).toBe('13');
          expect(res.body.articles[1].comment_count).toBe('0');
        });
    });
    test('GET - 200 - responds with the articles sorted and ordered by given query', () => {
      return request(app)
        .get('/api/articles?sort_by=votes&order=desc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].votes).toBe(100);
        });
    });
    test('GET - 200 - sort query will default to created_at & desc if ', () => {
      return request(app)
        .get('/api/articles?sor=votes&ord=desc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].created_at).toBe(
            '2018-11-15T12:21:54.171Z'
          );
          expect(res.body.articles[1].created_at).toBe(
            '2014-11-16T12:21:54.171Z'
          );
        });
    });
    test('GET - 400 - if invalid sortBy row ', () => {
      return request(app)
        .get('/api/articles?sort_by=hello')
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe('Bad Request');
        });
    });

    test('GET - 200 - responds with articles filtered by a query', () => {
      return request(app)
        .get('/api/articles?author=rogersop')
        .expect(200)
        .then((res) => {
          expect(res.body.articles.length).toBe(3);
          return request(app)
            .get('/api/articles?topic=mitch')
            .expect(200)
            .then((res) => {
              expect(res.body.articles.length).toBe(11);
            });
        });
    });
    test('GET - 200 - will work with multiple queries', () => {
      return request(app)
        .get('/api/articles?author=rogersop&sort_by=votes&order=asc')
        .expect(200)
        .then((res) => {
          expect(res.body.articles[0].created_at).toBe(
            '2006-11-18T12:21:54.171Z'
          );
        });
    });
    test('GET - 404 - author doesnt exist', () => {
      return request(app)
        .get('/api/articles?author=notopic')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toEqual('Not Found');
        });
    });
    test('GET - 404 - topic doesnt exist', () => {
      return request(app)
        .get('/api/articles?topic=notopic')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toEqual('Not Found');
        });
    });
    test('GET - 200 - ignores invalid query', () => {
      return request(app)
        .get('/api/articles?notopic=notopic')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).toEqual(expect.any(Array));
        });
    });
    test('GET - 200 - if topic/author does exist but with no articles', () => {
      return request(app)
        .get('/api/articles?author=lurker')
        .expect(200)
        .then((res) => {
          expect(res.body.articles).toEqual([]);
        });
    });

    test('POST 201 - will post a new article', () => {
      return request(app)
        .post('/api/articles')
        .send({
          title: 'hello world',
          body: 'its a long way to the top if you want to rock and roll',
          author: 'butter_bridge',
          topic: 'mitch',
        })
        .expect(201)
        .then((res) => {
          expect(typeof res.body.article).toEqual('object');
          expect(res.body.article).toHaveProperty('author');
          expect(res.body.article).toHaveProperty('topic');
        });
    });
    test('POST 400 -  if the format of post is incorrect', () => {
      return request(app)
        .post('/api/articles')
        .send({
          badformat: 'hello world',
          body: 'its a long way to the top if you want to rock and roll',
          author: 'butter_bridge',
          topic: 'mitch',
        })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe('Bad Request');
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
            expect(res.body.article.article_id).toBe(1);
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
            expect(res.body.msg).toBe('No Article Found');
          });
      });
      test('PATCH - 400 - if non numerical value is passed as inc value', () => {
        return request(app)
          .patch('/api/articles/500')
          .send({ inc_votes: '1' })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe('Bad Request');
          });
      });
      test('PATCH - 400 - if format of body if invalid', () => {
        return request(app)
          .patch('/api/articles/500')
          .send({ inc_v: 50 })
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe('Bad Request');
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
      test('POST - 400 - if the input format is invalid', () => {
        return request(app)
          .post('/api/articles/1/comments')
          .send({ userame: 'nouser', boy: 'this is great!!' })
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
            expect(res.body.comments[0].article_id).toBe(1);
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
      test('GET - 200 - will default to created_at & desc ', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then((res) => {
            expect(res.body.comments[0].created_at).toBe(
              '2016-11-22T12:36:03.389Z'
            );
            expect(res.body.comments[1].created_at).toBe(
              '2015-11-23T12:36:03.389Z'
            );
            expect(res.body.comments[2].created_at).toBe(
              '2014-11-23T12:36:03.389Z'
            );
          });
      });

      test('GET - 400 - invalid sortby row', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=hello')
          .expect(400)
          .then((res) => {
            expect(res.body.msg).toBe('Bad Request');
          });
      });
      test('GET - 404 - if no article at id', () => {
        return request(app)
          .get('/api/articles/1000/comments')
          .expect(404)
          .then((res) => {
            expect(res.body.msg).toBe('Not Found');
          });
      });
    });
  });
  describe('API/COMMENTS', () => {
    test('PATCH -  200 - will update a comment at given id', () => {
      return request(app)
        .patch('/api/comments/1')
        .send({ inc_votes: 10 })
        .expect(200)
        .then((res) => {
          expect(res.body.comment.votes).toBe(26);
        });
    });
    test('PATCH - 404 - if no comment if found', () => {
      return request(app)
        .patch('/api/comments/1000')
        .send({ inc_votes: 10 })
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe('Not Found');
        });
    });
    test('PATCH - 400 - if non numerical value is passed', () => {
      return request(app)
        .patch('/api/comments/1000')
        .send({ inc_votes: 'one' })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe('Bad Request');
        });
    });
    test('PATCH - 400 - if key of body is wrong', () => {
      return request(app)
        .patch('/api/comments/1000')
        .send({ inc_vs: 10 })
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe('Bad Request');
        });
    });
    test('DELETE - 204 - will delete comment comment with given id', () => {
      return request(app)
        .delete('/api/comments/1')
        .expect(204)
        .then((res) => {
          return connection('comments')
            .select('*')
            .returning('*')
            .then((comments) => {
              expect(comments.length).toBe(17);
            });
        });
    });
    test('DELETE - 400 - will delete comment comment with given id', () => {
      return request(app)
        .delete('/api/comments/1000')
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe('no comment with id of 1000');
        });
    });
  });
});
