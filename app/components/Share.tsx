import { useEffect, useState } from 'react'

type ShareProps = {
    title: string
}

const Share = ({ title }: ShareProps) => {
    const [isShareSupported, setIsShareSupported] = useState(false)

    const handleOnClick = () => {
        navigator
            .share({
                title,
                url: window.location.href,
            })
            .then(() => {
                console.log('Callback after sharing')
            })
    }

    useEffect(() => {
        if ('share' in navigator) {
            setIsShareSupported(true)
        }
    }, [])

    return isShareSupported ? (
        <button
            onClick={handleOnClick}
            className="bg-teal text-blue-400 px-32 py-16 mr-32 rounded-full transition-default duration-200 hover:bg-orange"
        >
            Share
        </button>
    ) : null
}

export default Share
