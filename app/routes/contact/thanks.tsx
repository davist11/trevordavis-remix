import Divider from '~/components/Divider'
import PageHeading from '~/components/PageHeading'
import useMetaData from '~/hooks/use-meta-data'
import Doodle from '~/images/icons/Doodle'

export const meta = () => {
    return useMetaData({
        title: 'Thanks',
        description: 'I will reply back to your message soon!',
    })
}

export default function ContactThanks() {
    return (
        <div className="max-w-768 mx-auto px-20 min-h-2/3-screen">
            <div className="relative pb-48 mb-48">
                <PageHeading>Thanks</PageHeading>

                <Divider />
            </div>

            <div className="text">
                <p>I&rsquo;ve got your message and will be in touch soon.</p>
            </div>

            <div className="mt-48 dark:text-blue-100">
                <Doodle className="rect-doodle" />
            </div>
        </div>
    )
}
