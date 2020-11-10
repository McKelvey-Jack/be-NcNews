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
        expect(res.text).toEqual('invalid endpoint');
      });
  });

  describe('API/TOPICS', () => {
    it.only('GET - 200 - will return all topics', () => {
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
    it('GET - 404 when no user at given username', () => {
      return request(app)
        .get('/api/users/nouserhere')
        .expect(404)
        .then((res) => {
          expect(res.text).toEqual('no user found');
        });
    });
  });
  describe('API/ARTICLES', () => {
    test.only('GET - 200 - responds with article at a given id', () => {
      return request(app)
        .get('/api/articles/1')
        .expect(200)
        .then((res) => {
          console.log(res.body);
          const expectedOutput = expect(typeof res.body.article).toEqual(
            'object'
          );
          console.log(res.body);
          expect(res.body.article.votes).toEqual(100);
        });
    });
  });
});
