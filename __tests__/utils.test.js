const articles = require('../db/data/development-data/articles');
const {
  timeStampFormatter,
  createRefObject,
  commentFormatter,
} = require('../db/utils/data-manipulation');

describe('timeStampFormatter', () => {
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
  test('Will return an object with a formatted timestamp key', () => {
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
describe('create ref object', () => {
  test('returns a new object', () => {
    const inputRows = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
      {
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body:
          'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
        created_at: 1416140514171,
      },
    ];

    const expectedOutput = {
      'Living in the shadow of a great man': 1,
      'Sony Vaio; or, The Laptop': 2,
    };

    expect(typeof createRefObject(inputRows, 'title', 'article_id')).toEqual(
      'object'
    );
  });
  test('does not mutate input', () => {
    const inputRows = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
      {
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body:
          'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
        created_at: 1416140514171,
      },
    ];
    createRefObject(inputRows, 'title', 'article_id');
    expect(inputRows).toEqual(inputRows);
  });
  test('will return a reference object', () => {
    const inputRows = [
      {
        article_id: 1,
        title: 'Living in the shadow of a great man',
        topic: 'mitch',
        author: 'butter_bridge',
        body: 'I find this existence challenging',
        created_at: 1542284514171,
        votes: 100,
      },
      {
        article_id: 2,
        title: 'Sony Vaio; or, The Laptop',
        topic: 'mitch',
        author: 'icellusedkars',
        body:
          'Call me Mitchell. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would buy a laptop about a little and see the codey part of the world. It is a way I have of driving off the spleen and regulating the circulation. Whenever I find myself growing grim about the mouth; whenever it is a damp, drizzly November in my soul; whenever I find myself involuntarily pausing before coffin warehouses, and bringing up the rear of every funeral I meet; and especially whenever my hypos get such an upper hand of me, that it requires a strong moral principle to prevent me from deliberately stepping into the street, and methodically knocking people’s hats off—then, I account it high time to get to coding as soon as I can. This is my substitute for pistol and ball. With a philosophical flourish Cato throws himself upon his sword; I quietly take to the laptop. There is nothing surprising in this. If they but knew it, almost all men in their degree, some time or other, cherish very nearly the same feelings towards the the Vaio with me.',
        created_at: 1416140514171,
      },
    ];
    const expectedOutput = {
      'Living in the shadow of a great man': 1,
      'Sony Vaio; or, The Laptop': 2,
    };

    expect(createRefObject(inputRows, 'title', 'article_id')).toEqual(
      expectedOutput
    );
  });
});
describe('commentFormatter', () => {
  test('returns a new array', () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const refObject = {
      'Living in the shadow of a great man': 1,
    };

    expect(commentFormatter(input, refObject)).toEqual(expect.any(Array));
    expect(commentFormatter(input, refObject)).not.toEqual(input);
  });
  test('does not mutate input', () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const refObject = {
      'Living in the shadow of a great man': 1,
    };
    commentFormatter(input, refObject);
    expect(input).toEqual(input);
  });
  test('returns array of comments in the correct format', () => {
    const input = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        belongs_to: "They're not exactly dogs, are they?",
        created_by: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        belongs_to: 'Living in the shadow of a great man',
        created_by: 'butter_bridge',
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    const refObject = {
      'Living in the shadow of a great man': 1,
      "They're not exactly dogs, are they?": 9,
    };

    const expectedOutput = [
      {
        body:
          "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
        article_id: 9,
        author: 'butter_bridge',
        votes: 16,
        created_at: 1511354163389,
      },
      {
        body:
          'The beautiful thing about treasure is that it exists. Got to find out what kind of sheets these are; not cotton, not rayon, silky.',
        author: 'butter_bridge',
        article_id: 1,
        votes: 14,
        created_at: 1479818163389,
      },
    ];
    expect(commentFormatter(input, refObject)).toEqual(expectedOutput);
  });
});
