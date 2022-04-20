import { useLoaderData, json } from 'remix'

import useGqlClient from '~/hooks/use-gql-client'
import useMetaData from '~/hooks/use-meta-data'

import { GET_ARTICLES } from '~/graphql/queries'

import Pagination from '~/components/Pagination'
import BlogSummary from '~/components/BlogSummary'

export const meta = () => {
    return useMetaData({
        title: 'Blog',
        description: 'Read from my infrequently updated blog',
    })
}

export let loader = async ({ request }: any) => {
    const url = new URL(request.url)
    const pageParam = url.searchParams.get('page')
    const currentPage = pageParam ? Number.parseInt(pageParam) : 1
    const offset = (currentPage - 1) * 10

    const { entries, total } = await useGqlClient().request(GET_ARTICLES, {
        offset,
    })

    return json({ entries, total, currentPage })
}

interface Blog {
    slug: string
    title: string
    typeHandle: 'externalArticle' | 'blog'
    website?: string
    body: string
}

export default function BlogIndex() {
    const response = useLoaderData()
    const blogEntries: Blog[] = response.entries

    return (
        <div className="max-w-1064 mx-auto px-20">
            <h1 className="sr-only">Blog</h1>

            {blogEntries.map(({ slug, title, website, typeHandle, body }) => (
                <div className="relative mb-48 pb-48" key={slug}>
                    <h2 className="text-lg text-teal mb-16">
                        {website ? (
                            <a href={website}>{title}</a>
                        ) : (
                            <a href={`/blog/${slug}`}>{title}</a>
                        )}
                    </h2>

                    <BlogSummary typeHandle={typeHandle} body={body} />

                    <div className="absolute left-0 bottom-0 h-2 w-120 bg-blue-600"></div>
                </div>
            ))}

            <Pagination
                currentPage={response.currentPage}
                totalResults={response.total}
            />
        </div>
    )
}
