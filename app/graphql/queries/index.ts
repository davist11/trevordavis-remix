import { gql } from 'graphql-request'

export const GET_HOMEPAGE = gql`
    query GetHomepage {
        workEntries: entries(section: "work", orderBy: "lft DESC") {
            id
            title
            ... on work_work_Entry {
                website
                listingImage {
                    largeUrl: url
                        @transform(width: 1200, height: 675, immediately: true)
                    smallUrl: url
                        @transform(width: 680, height: 382, immediately: true)
                }
            }
        }

        homepageEntry: entries(section: "homepage", limit: 1) {
            id
            ... on homepage_homepage_Entry {
                id
                description
            }
        }
    }
`

export const GET_ABOUT = gql`
    query GetAbout {
        entries(section: "about", limit: 1) {
            id
            title
            ... on about_about_Entry {
                id
                facts {
                    ... on facts_fact_BlockType {
                        id
                        fact
                        image {
                            url
                                @transform(
                                    width: 850
                                    height: 575
                                    immediately: true
                                )
                            focalPoint
                        }
                    }
                }
                experience {
                    ... on experience_experience_BlockType {
                        id
                        company
                        companyUrl
                        companyStartDate: startDate
                            @formatDateTime(format: "m.Y")
                        jobTitles {
                            endDate @formatDateTime(format: "m.Y")
                            jobTitle
                            startDate @formatDateTime(format: "m.Y")
                        }
                        description
                    }
                }
                capabilities {
                    capability
                }
            }
        }
    }
`

export const GET_ARTICLES = gql`
    query GetArticles($offset: Int!) {
        entries(section: "blog", limit: 10, offset: $offset) {
            title
            slug
            ... on blog_blog_Entry {
                id
                typeHandle
                body
                bodyBlocks {
                    ... on bodyBlocks_text_BlockType {
                        id
                        typeHandle
                        text
                    }
                }
            }
            ... on blog_externalArticle_Entry {
                id
                typeHandle
                body
                website
            }
        }
        total: entryCount(section: "blog")
    }
`

export const GET_ARTICLE = gql`
    query GetArticle($slug: String!) {
        entries(section: "blog", limit: 1, slug: [$slug]) {
            id
            title
            displayDate: postDate @formatDateTime(format: "m.d.Y")
            attributeDate: postDate @formatDateTime(format: "Y-m-d")

            ... on blog_blog_Entry {
                id
                body
                numberOfLikes
                bodyBlocks {
                    ... on bodyBlocks_code_BlockType {
                        id
                        typeHandle
                        code
                        lang
                    }
                    ... on bodyBlocks_text_BlockType {
                        id
                        typeHandle
                        text
                    }
                }
            }
        }
    }
`

export const GET_ARTICLE_LIKES = gql`
    query GetArticleLikes($slug: String!) {
        entries(section: "blog", limit: 1, slug: [$slug]) {
            id

            ... on blog_blog_Entry {
                id
                numberOfLikes
            }
        }
    }
`

export const GET_RSS_ITEMS = gql`
    query GetRssItems {
        entries(section: ["blog", "work"], orderBy: "postDate DESC") {
            id
            title
            sectionHandle
            postDate @formatDateTime(format: "rss")
            uri
            ... on work_work_Entry {
                id
                website
                listingImage {
                    url
                }
            }
            ... on blog_blog_Entry {
                id
                body
                typeHandle
                bodyBlocks {
                    ... on bodyBlocks_code_BlockType {
                        id
                        typeHandle
                        code
                        lang
                    }
                    ... on bodyBlocks_text_BlockType {
                        id
                        typeHandle
                        text
                    }
                }
            }
            ... on blog_externalArticle_Entry {
                id
                body
                typeHandle
                website
            }
        }
    }
`
