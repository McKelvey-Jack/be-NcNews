const articles = require('../db/data/development-data/articles');
const {
  timeStampFormatter,
  createIdRef,
  commenttimeStampFormatter,
} = require('../db/utils/data-manipulation');

describe('timeStamptimeStampFormatter', () => {
  // test('If passed an empty object, it will return an empty object', () => {
  //     expect(timeStampFormatter({})).toEqual({})
  // });
  test('Returns a new array', () => {
    const testArray = [{ key: 'hello' }];
    const returnValue = timeStampFormatter(testArray);
    expect(testArray).not.toEqual(returnValue);
  });
  test('Should not mutate the input', () => {
    const testArray = [{ key: 'hello' }];
    timeStampFormatter(testArray);
    expect(testArray).toEqual(testArray);
  });
  test('Will return an article object with the correct date format', () => {
    const article = [
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell....',
        created_at: 1416140514171,
      },
    ];
    const expectedOutput = [
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell....',
        created_at: new Date(1416140514171),
      },
    ];
    expect(timeStampFormatter(article)).toEqual(expectedOutput);
    const multipleArticles = [
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell....',
        created_at: 1416140514171,
      },
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell....',
        created_at: 1416140514171,
      },
    ];
    const expectedOutput2 = [
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell....',
        created_at: new Date(1416140514171),
      },
      {
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body: 'Call me Mitchell....',
        created_at: new Date(1416140514171),
      },
    ];

    expect(timeStampFormatter(multipleArticles)).toEqual(expectedOutput2);
  });
});
