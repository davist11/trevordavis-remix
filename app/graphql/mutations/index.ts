import { gql } from 'graphql-request'

export const UPDATE_ARTICLE_LIKES = gql`
    mutation updateLikes($id: ID, $numberOfLikes: Number) {
        save_blog_blog_Entry(id: $id, numberOfLikes: $numberOfLikes) {
            id
            numberOfLikes
        }
    }
`
