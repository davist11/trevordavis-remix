import { useLoaderData, json } from 'remix'
import type { LoaderFunction } from 'remix'
import { gql } from 'graphql-request'
import { gqlClient } from '~/helpers/graphql.server'
import { getMeta } from '~/helpers/get-meta'

export const meta = ({ data }: any) => {
    if (!data) {
        return getMeta({
            title: 'Blog',
            description: 'Read from my infrequently updated blog',
        })
    }

    return getMeta({
        title: ` ${data.entries[0].title} | Blog`,
    })
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const { entries } = await gqlClient(request).request(gql`
        {
            entries(section: "blog", limit: 1, slug: "${params.slug}") {
                id
                title
                displayDate: postDate @formatDateTime (format: "m.d.Y")
                attributeDate: postDate @formatDateTime (format: "Y-m-d")

                ... on blog_blog_Entry {
                    id
                    body
                }
            }
        }
    `)

    return json({ entries })
}

export default function BlogEntry() {
    const { entries } = useLoaderData()
    const entry = entries[0]

    return (
        <div className="max-w-1064 mx-auto px-20">
            <div className="relative pb-48 mb-48">
                <time
                    dateTime={entry.attributeDate}
                    className="block mb-16 text-sm"
                >
                    {entry.displayDate}
                </time>

                <h1 className="text-xl md:text-jb leading-snug text-teal">
                    {entry.title}
                </h1>

                <div className="absolute left-0 bottom-0 h-2 w-120 bg-blue-600"></div>
            </div>

            <div
                className="text -long"
                dangerouslySetInnerHTML={{ __html: entry.body }}
            ></div>
        </div>
    )
}
