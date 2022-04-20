import { useEffect, useState } from 'react'
import cx from 'classnames'
import { useFetcher } from 'remix'

import Heart from '~/images/icons/Heart'

type LikeProps = {
    storageKey: string
    likes: number
}

const Like = ({ storageKey, likes }: LikeProps) => {
    const [hasLiked, setHasLiked] = useState(false)
    const fetcher = useFetcher()

    const handleLike = () => {
        setHasLiked((hasLiked) => {
            const updatedHasLiked = !hasLiked
            window.localStorage.setItem(storageKey, updatedHasLiked.toString())

            // Submit request to the server
            fetcher.submit(
                {
                    liked: updatedHasLiked.toString(),
                },
                {
                    method: 'post',
                }
            )

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

            <span className="ml-16">
                {numberOfLikes} {numberOfLikes === 1 ? 'Like' : 'Likes'}
            </span>
        </button>
    )
}

export default Like
