import { useEffect, useState } from 'react'
import cx from 'classnames'
import { useFetcher } from "@remix-run/react";

import Heart from '~/images/icons/Heart'
import useGqlClient from '~/hooks/use-gql-client'
import { GET_ARTICLE_LIKES } from '~/graphql/queries'
import { UPDATE_ARTICLE_LIKES } from '~/graphql/mutations'
import { Params } from 'react-router'

type LikeProps = {
    storageKey: string
    likes: number
}

type HandleLikeReturn = {
    numberOflikes: number
}

export const handleLike = async (
    request: Request,
    params: Params
): Promise<HandleLikeReturn> => {
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
    await useGqlClient().request(UPDATE_ARTICLE_LIKES, {
        id: entry.id,
        numberOfLikes: newNumberOfLikes,
    })

    // Really don't need to read from data since we are reading this value and incrementing
    return {
        numberOflikes: newNumberOfLikes,
    }
}

const Like = ({ storageKey, likes }: LikeProps) => {
    const [hasLiked, setHasLiked] = useState(false)
    const fetcher = useFetcher()

    const handleLike = () => {
        // Submit request to the server
        fetcher.submit(
            {
                liked: (!hasLiked).toString(),
            },
            {
                method: 'post',
            }
        )

        // Update state and local storage value
        setHasLiked((hasLiked) => {
            const updatedHasLiked = !hasLiked
            window.localStorage.setItem(storageKey, updatedHasLiked.toString())

            return updatedHasLiked
        })
    }

    // Pull the value from local storage
    useEffect(() => {
        setHasLiked(window.localStorage.getItem(storageKey) === 'true')
    }, [storageKey])

    const numberOfLikes =
        fetcher.type === 'done' ? fetcher.data.numberOflikes : likes

    return (
        <button
            onClick={handleLike}
            type="submit"
            className="flex items-center"
        >
            <Heart
                className={cx('rect-icon-md duration-400 transition-default', {
                    'text-blue-700': !hasLiked,
                    'text-pink-400': hasLiked,
                })}
            />
            <span className="sr-only">
                {hasLiked ? 'Un-like' : 'Like'} this post
            </span>

            <span
                className={cx('ml-16 duration-400 transition-default', {
                    'opacity-25': fetcher.state === 'submitting',
                })}
            >
                {numberOfLikes} {numberOfLikes === 1 ? 'Like' : 'Likes'}
            </span>
        </button>
    )
}

export default Like
