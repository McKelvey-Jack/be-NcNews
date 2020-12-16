const endpoints = {
  endpoints: {
    'GET /api': {
      description:
        'serves up a json representation of all the available endpoints of the api',
    },
    'GET /api/topics': {
      description: 'serves an array of all topics',
      queries: [],
      exampleResponse: {
        topics: [{ slug: 'football', description: 'Footie!' }],
      },
    },
    'POST /api/topics': {
      description: 'posts a new topic',
      queries: [],
      exampleResponse: {
        topics: [{ slug: 'farming', description: 'farm' }],
      },
    },
    'GET /api/articles': {
      description: 'serves an array of all topics',
      queries: ['author', 'topic', 'sort_by', 'order'],
      exampleResponse: {
        articles: [
          {
            title: 'Seafood substitutions are increasing',
            topic: 'cooking',
            author: 'weegembump',
            body: 'Text from the article..',
            created_at: '2018-05-30T15:59:13.341Z',
          },
        ],
      },
    },
    'GET /api/users': {
      description: 'serves a user object',
      queries: [],
      exampleResponse: {
        users: [
          {
            username: 'butter_bridge',
            avatar_url:
              'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
            name: 'jonny',
          },
          {
            username: 'icellusedkars',
            avatar_url:
              'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
            name: 'sam',
          },
          {
            username: 'rogersop',
            avatar_url:
              'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
            name: 'paul',
          },
          {
            username: 'lurker',
            avatar_url:
              'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
            name: 'do_nothing',
          },
        ],
      },
    },
    'GET /api/users/:username': {
      description: 'serves a user object',
      queries: [],
      exampleResponse: {
        user: {
          username: 'tickle122',
          avatar_url:
            'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
          name: 'Tom Tickle',
        },
      },
    },
    'POST /api/users': {
      description: 'posts a new user',
      queries: [],
      exampleResponse: {
        user: {
          username: 'mike123',
          avatar_url:
            'https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953',
          name: 'mike man',
        },
      },
    },
    'DELETE /api/articles/:article_id': {
      description: 'Deletes the article that corresponds with the provided id',
      queries: [],
      exampleResponse: {
        deletedArticle: 1,
      },
    },
    'PATCH /api/articles/:article_id': {
      description:
        'Update the article that corresponds to the provided id with the sent body',
      queries: [],
      exampleResponse: {
        article: [
          {
            author: 'jessjelly',
            title: 'Running a Node App',
            article_id: 1,
            body:
              'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
            topic: 'coding',
            created_at: '2016-08-18T12:07:52.389Z',
            votes: 10,
            comment_count: 8,
          },
        ],
      },
    },
    'GET /api/articles/:article_id': {
      description: 'Get the article that corresponds to the provided id',
      queries: [],
      exampleResponse: {
        article: {
          author: 'jessjelly',
          title: 'Running a Node App',
          article_id: 1,
          body:
            'This is part two of a series on how to get up and running with Systemd and Node.js. This part dives deeper into how to successfully run your app with systemd long-term, and how to set it up in a production environment.',
          topic: 'coding',
          created_at: '2016-08-18T12:07:52.389Z',
          votes: 0,
          comment_count: 8,
        },
      },
    },
    'POST /api/articles/:article_id/comments': {
      description:
        'Post a comment on the article that corresponds to the provided id',
      queries: [],
      exampleResponse: {
        comment: [
          {
            comment_id: 19,
            author: 'butter_bridge',
            article_id: 1,
            votes: 0,
            created_at: '2020-11-16T11:47:45.497Z',
            body: 'Hello there',
          },
        ],
      },
    },
    'GET /api/articles/:article_id/comments': {
      description: 'Get an array of comments for the given article id',
      queries: ['sort_by', 'order'],
      exampleResponse: {
        comments: [
          {
            comment_id: 4,
            votes: -100,
            created_at: '2014-11-23T12:36:03.389Z',
            author: 'icellusedkars',
            body: ' I carry a log — yes. Is it funny to you? It is not to me.',
          },
          {
            comment_id: 13,
            votes: 0,
            created_at: '2005-11-25T12:36:03.389Z',
            author: 'icellusedkars',
            body: 'Fruit pastilles',
          },
          {
            comment_id: 5,
            votes: 0,
            created_at: '2013-11-23T12:36:03.389Z',
            author: 'icellusedkars',
            body: 'I hate streaming noses',
          },
        ],
      },
    },
    'POST /api/articles': {
      description: 'Post an article',
      queries: [],
      exampleResponse: {
        article: [
          {
            article_id: 13,
            title: 'What about the Droid attack on the Wookies?',
            body: "We'll just send Yoda.",
            votes: 0,
            topic: 'mitch',
            author: 'butter_bridge',
            created_at: '2020-11-16T11:56:58.098Z',
          },
        ],
      },
    },
    'PATCH /api/comments/:comment_id': {
      description:
        'Update a comment that corresponds with the provided comment id',
      queries: [],
      exampleResponse: {
        updatedComment: [
          {
            comment_id: 1,
            author: 'butter_bridge',
            article_id: 9,
            votes: 19,
            created_at: '2017-11-22T12:36:03.389Z',
            body:
              "Oh, I've got compassion running out of my nose, pal! I'm the Sultan of Sentiment!",
          },
        ],
      },
    },
    'DELETE /api/comments/:comment_id': {
      description: 'Deletes the comment that corresponds with the provided id',
      queries: [],
      exampleResponse: {
        deletedComment: 1,
      },
    },
  },
};

module.exports = endpoints;
