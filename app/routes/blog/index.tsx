import { useLoaderData, json } from 'remix'
import Pagination from '~/components/Pagination'
import useGqlClient from '~/hooks/use-gql-client'
import { getMeta } from '~/helpers/get-meta'
import { GET_ARTICLES } from '~/graphql/queries'

export const meta = () => {
    return getMeta({
        title: 'Blog',
        description: 'Read from my infrequently updated blog',
    })
}

export let loader = async ({ request }: any) => {
    const url = new URL(request.url)
    const currentPage: number = Number.parseInt(
        url.searchParams.get('page') ?? 1
    )
    const offset: number = (currentPage - 1) * 10

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

const blogSummary = (html: string): string => {
    const summary = html.replace(/(<([^>]+)>)/gi, '').trim()

    return summary.length > 400
        ? `${summary.substring(0, 400).trim()}…`
        : summary
}

export default function BlogIndex() {
    let response = useLoaderData()
    let blogEntries: Blog[] = response.entries

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
                    <div className="text -long">
                        {typeHandle === 'externalArticle' ? (
                            <div
                                dangerouslySetInnerHTML={{ __html: body }}
                            ></div>
                        ) : (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: blogSummary(body),
                                }}
                            ></div>
                        )}
                    </div>

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
