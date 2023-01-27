import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { ActionFunction, LoaderFunction } from '@remix-run/router'
import InnerHTML from 'dangerously-set-html-content'

import useGqlClient from '~/hooks/use-gql-client'
import useMetaData from '~/hooks/use-meta-data'
import useBlogSummary from '~/hooks/use-blog-summary'

import { GET_ARTICLE } from '~/graphql/queries'

import Like, { handleLike } from '~/components/Like'
import Share from '~/components/Share'
import PageHeading from '~/components/PageHeading'
import Divider from '~/components/Divider'
import BodyBlocks from '~/components/BodyBlocks'

export const meta = ({ data }: any) => {
    if (!data) {
        return useMetaData({
            title: 'Blog',
            description: 'Read from my infrequently updated blog',
        })
    }

    const entry = data.entries[0]

    return useMetaData({
        title: ` ${entry.title} | Blog`,
        description: useBlogSummary(entry.body, 160),
    })
}

export const loader: LoaderFunction = async ({ request, params }) => {
    const { entries } = await useGqlClient(request).request(GET_ARTICLE, {
        slug: params.slug,
    })

    return json({ entries })
}

export const action: ActionFunction = async ({ request, params }) => {
    return handleLike(request, params)
}

export default function BlogEntry() {
    const { entries } = useLoaderData()
    const entry = entries[0]

    return (
        <div className="max-w-768 mx-auto px-20">
            <div className="relative pb-48 mb-48">
                <time
                    dateTime={entry.attributeDate}
                    className="block mb-24 text-sm tracking-wider text-right"
                >
                    {entry.displayDate}
                </time>

                <PageHeading>{entry.title}</PageHeading>

                <Divider />
            </div>

            {entry.bodyBlocks.length ? (
                <BodyBlocks blocks={entry.bodyBlocks} />
            ) : (
                <InnerHTML html={entry.body} className="text -long" />
            )}

            <div className="relative mt-48 pt-48">
                <div className="absolute left-0 top-0 h-2 w-120 bg-blue-600"></div>

                <div className="flex">
                    <Share title={entry.title} />

                    <Like
                        storageKey={`entry-${entry.id}-like`}
                        likes={entry.numberOfLikes ?? 0}
                    />
                </div>
            </div>
        </div>
    )
}
