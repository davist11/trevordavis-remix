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
            className="bg-blue-200 border-2 border-blue-200 text-blue-400 leading-none py-10 px-20 rounded-md antialiased font-medium transition-all duration-200 hover:bg-blue-400 hover:text-blue-100 hover:rounded-xl mr-32"
        >
            Share
        </button>
    ) : null
}

export default Share
