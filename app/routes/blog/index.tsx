import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'

import useGqlClient from '~/hooks/use-gql-client'
import useMetaData from '~/hooks/use-meta-data'

import { GET_ARTICLES } from '~/graphql/queries'

import type { TextBlockType } from '~/components/blocks/TextBlock'

import Pagination from '~/components/Pagination'
import BlogSummary from '~/components/BlogSummary'
import Divider from '~/components/Divider'

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
    bodyBlocks: TextBlockType[]
}

export default function BlogIndex() {
    const response = useLoaderData()
    const blogEntries: Blog[] = response.entries

    return (
        <div className="max-w-768 mx-auto px-20">
            <h1 className="sr-only">Blog</h1>

            {blogEntries.map(
                ({ slug, title, website, typeHandle, body, bodyBlocks }) => {
                    const bodyForSummary = bodyBlocks?.[0]?.text ?? body
                    const linkClasses =
                        'block decoration-2 decoration-blue-200 transition-all duration-200 underline-offset-2 underline hover:decoration-transparent'

                    return (
                        <div className="relative mb-48 pb-48" key={slug}>
                            <h2 className="text-lg text-white-default font-serif mb-16">
                                {website ? (
                                    <a href={website} className={linkClasses}>
                                        {title}
                                    </a>
                                ) : (
                                    <Link
                                        to={`/blog/${slug}`}
                                        className={linkClasses}
                                    >
                                        {title}
                                    </Link>
                                )}
                            </h2>

                            <BlogSummary
                                typeHandle={typeHandle}
                                body={bodyForSummary}
                            />

                            <Divider />
                        </div>
                    )
                }
            )}

            <Pagination
                currentPage={response.currentPage}
                totalResults={response.total}
            />
        </div>
    )
}
