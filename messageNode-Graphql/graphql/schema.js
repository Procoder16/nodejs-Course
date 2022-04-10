const { buildSchema } = require('graphql');
//buildSchema is the function that we import from the graphql package to create schemas 

module.exports = buildSchema(`
    type TestData {
        text: String!
        views: Int!
    }

    type RootQuery {
        hello: TestData
    }

    schema {
        query: RootQuery
    }
`);