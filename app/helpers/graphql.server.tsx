import { GraphQLClient } from 'graphql-request'

const getQueryParams = (request: Request): string => {
    const url = new URL(request.url)
    const craftPreview = url.searchParams.get('x-craft-preview')
    const token = url.searchParams.get('token')

    if (!craftPreview || !token) {
        return ''
    }

    return `?x-craft-preview=${craftPreview}&token=${token}`
}

export const gqlClient = (request = null) => {
    const queryString = request ? getQueryParams(request) : ''

    return new GraphQLClient(`${process.env.GRAPHQL_ENDPOINT}${queryString}`, {
        headers: {
            authorization: `Bearer ${process.env.GRAPHQL_TOKEN}`,
        },
    })
}
