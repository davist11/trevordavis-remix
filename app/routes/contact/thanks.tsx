import { getMeta } from '~/helpers/get-meta'

export const meta = () => {
    return getMeta({
        title: 'Thanks',
        description: 'I will reply back to your message soon!',
    })
}

export default function ContactThanks() {
    return (
        <div className="max-w-768 mx-auto px-20 min-h-2/3-screen">
            <div className="relative pb-48 mb-48">
                <h1 className="text-jb text-yellow">Thanks</h1>

                <div className="absolute left-0 bottom-0 h-2 w-120 bg-blue-600"></div>
            </div>

            <div className="text">
                <p>I&rsquo;ve got your message and will be in touch soon.</p>
            </div>
        </div>
    )
}
