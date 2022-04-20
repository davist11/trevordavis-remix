import { useLoaderData, json, ActionFunction } from 'remix'
import type { LoaderFunction } from 'remix'
import cx from 'classnames'

import { gql } from 'graphql-request'
import { gqlClient } from '~/helpers/graphql.server'
import { getMeta } from '~/helpers/get-meta'
import { useState } from 'react'
import Heart from '~/images/icons/Heart'
import Like from '~/components/Like'

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
                    numberOfLikes
                }
            }
        }
    `)

    return json({ entries })
}

export const action: ActionFunction = async ({ request, params }) => {
    const isLiked = (await request.formData()).get('liked')

    // Get the current count in case it's changed since page load
    const { entries } = await gqlClient(request).request(gql`
        {
            entries(section: "blog", limit: 1, slug: "${params.slug}") {
                id

                ... on blog_blog_Entry {
                    id
                    numberOfLikes
                }
            }
        }
    `)

    const entry = entries[0]
    const prevNumberOfLikes = entry.numberOfLikes
    const newNumberOfLikes =
        isLiked === 'true' ? prevNumberOfLikes + 1 : prevNumberOfLikes - 1

    // Update the number of likes
    const mutation = gql`
        mutation updateLikes($id: ID, $numberOfLikes: Number) {
            save_blog_blog_Entry(id: $id, numberOfLikes: $numberOfLikes) {
                id
                numberOfLikes
            }
        }
    `
    const variables = {
        id: entry.id,
        numberOfLikes: newNumberOfLikes,
    }

    const data = await gqlClient().request(mutation, variables)

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
