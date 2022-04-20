import { GraphQLClient } from 'graphql-request'

// Extract allowed query params and construct query string
const getQueryString = (request: Request): string => {
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

export default function useGqlClient(request?: Request) {
    const queryString = request ? getQueryString(request) : ''

    return new GraphQLClient(`${process.env.GRAPHQL_ENDPOINT}${queryString}`, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
        },
    })
}
