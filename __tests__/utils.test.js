const articles = require('../db/data/development-data/articles');
const {articlesFormatter} = require('../db/utils/data-manipulation')

describe('articlesFormatter', () => {
    // test('If passed an empty object, it will return an empty object', () => {
    //     expect(articlesFormatter({})).toEqual({})
    // });
    test('Returns a new array', () => {
        const testArray = [{"key": "hello"}]
        const returnValue = articlesFormatter(testArray)
        expect(testArray).not.toEqual(returnValue)
    });
    test('Should not mutate the input', () => {
        const testArray = [{"key": "hello"}]
        articlesFormatter(testArray)
        expect(testArray).toEqual(testArray)
    });
    test('Will return an article object with the correct date format', () => {
        const article =   [{
            title: 'Sony Vaio; or, The Laptop',
            topic: 'mitch',
            author: 'icellusedkars',
            body:
              'Call me Mitchell....',
            created_at: 1416140514171,
          }]
     const expectedOutput = [{
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body:
          'Call me Mitchell....',
        created_at: '11/16/2014',
      }]
     expect(articlesFormatter(article)).toEqual(expectedOutput)
     const multipleArticles =   [{
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell....',
      created_at: 1416140514171,
    }, {
      title: 'Sony Vaio; or, The Laptop',
      topic: 'mitch',
      author: 'icellusedkars',
      body:
        'Call me Mitchell....',
      created_at: 1416140514171,
    }]
const expectedOutput2 = [{
  title: 'Sony Vaio; or, The Laptop',
  topic: 'mitch',
  author: 'icellusedkars',
  body:
    'Call me Mitchell....',
  created_at: '11/16/2014',
}, {
  title: 'Sony Vaio; or, The Laptop',
  topic: 'mitch',
  author: 'icellusedkars',
  body:
    'Call me Mitchell....',
  created_at: '11/16/2014',
}]

expect(articlesFormatter(multipleArticles)).toEqual(expectedOutput2)
    });
    // no mutation
    // return a new obj with formatted time stamp
});