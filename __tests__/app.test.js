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

  describe('API/TOPICS', () => {
    it('GET - 200 - will return all topics', () => {
      return request(app)
        .get('/api/topics')
        .expect(200)
        .then((res) => {
          console.log(res.body);
          expect(res.body.topics).toEqual(expect.any(Array));
        });
    });
  });
});
