import { GraphQLClient } from 'graphql-request'

export const gqlClient = new GraphQLClient(process.env.GRAPHQL_ENDPOINT, {
    headers: {
        authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
    },
})
