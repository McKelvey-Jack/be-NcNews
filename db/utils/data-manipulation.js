// extract any functions you are using to manipulate your data, into this file

const { articlesData } = require("../data/development-data");

// pure function

const articlesFormatter = (articledata) => {
   
    return articledata.map((article) => {
        const newArticle = {...article}

        newArticle.created_at = new Date(article["created_at"]).toLocaleDateString('en-GB')

        return newArticle;
    })

      }
    

module.exports = {articlesFormatter}

