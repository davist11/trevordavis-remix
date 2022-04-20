import { useLoaderData, json, ActionFunction } from 'remix'
import type { LoaderFunction } from 'remix'

import useGqlClient from '~/hooks/use-gql-client'
import useMetaData from '~/hooks/use-meta-data'
import useBlogSummary from '~/hooks/use-blog-summary'

import { GET_ARTICLE, GET_ARTICLE_LIKES } from '~/graphql/queries'
import { UPDATE_ARTICLE_LIKES } from '~/graphql/mutations'

import Like from '~/components/Like'

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
    const isLiked = (await request.formData()).get('liked')

    // Get the current count in case it's changed since page load
    const { entries } = await useGqlClient(request).request(GET_ARTICLE_LIKES, {
        slug: params.slug,
    })

    const entry = entries[0]
    const prevNumberOfLikes = entry.numberOfLikes
    const newNumberOfLikes =
        isLiked === 'true' ? prevNumberOfLikes + 1 : prevNumberOfLikes - 1

    // Update the number of likes
    const data = await useGqlClient().request(UPDATE_ARTICLE_LIKES, {
        id: entry.id,
        numberOfLikes: newNumberOfLikes,
    })

    // Really don't need to read from data since we are reading this value and incrementing
    return {
        numberOflikes: newNumberOfLikes,
    }
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

            <div className="relative mt-48 pt-48">
                <div className="absolute left-0 top-0 h-2 w-120 bg-blue-600"></div>

                <Like
                    storageKey={`entry-${entry.id}-like`}
                    likes={entry.numberOfLikes ?? 0}
                />
            </div>
        </div>
    )
}
