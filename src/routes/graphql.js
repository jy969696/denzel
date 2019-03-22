const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');
var Movie = require('../db/mongo')

var schema = buildSchema(`
    type Movie {
        link: String
        metascore: Int
        synopsis: String
        title: String
        year: Int
    }

    type SaveMessage {
        _id: String
    }   

    type populateMessage {
        total: Int
    }

    type Query {
        movie: Movie
        specific(id: String): Movie
        search(limit: Int,metascore: Int): [Movie]
    }

    type Mutation {
        saveWatched(id: String,date: String,review: String): SaveMessage
        populate: populateMessage
    }
`);

var root = {
    movie: async () => {
        return await Movie.mustWatch()
    },
    search: async ({ limit = 5, metascore = 0 }) => {
        return await Movie.search({ limit, metascore })
    },
    specific: async ({ id }) => {
        // curl -d '{"query":"{movie {link metascore  synopsis title year } }"}' -H "Content-Type: application/json" http://localhost:9292/graphql
        return await Movie.specific(id)
    },
    saveWatched: async ({ id, date, review }) => {
        return await Movie.saveWatched({ id, date, review })
    },
    populate: async () => {
        return await Movie.populate()
    }
};
module.exports = graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
})