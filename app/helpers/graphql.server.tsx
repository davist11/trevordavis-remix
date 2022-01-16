import { GraphQLClient } from 'graphql-request'

// Pass through allowed query params to the requst
const getQueryParams = (request: Request): string => {
    const url = new URL(request.url)
    const allowedKeys = ['x-craft-preview', 'x-craft-live-preview', 'token']
    const filteredParams = Object.entries(
        Object.fromEntries(url.searchParams)
    ).filter(([key]) => allowedKeys.includes(key))

    if (!filteredParams.length) {
        return ''
    }

    const queryString = filteredParams.map((val) => val.join('=')).join('&')

    return `?${queryString}`
}

export const gqlClient = (request = null) => {
    const queryString = request ? getQueryParams(request) : ''

    return new GraphQLClient(`${process.env.GRAPHQL_ENDPOINT}${queryString}`, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
        },
    })
}
