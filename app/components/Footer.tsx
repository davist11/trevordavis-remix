import Twitter from '~/images/icons/Twitter'
import Instagram from '~/images/icons/Instagram'
import Github from '~/images/icons/Github'
import Doodle from '~/images/icons/Doodle'

interface FooterNavItem {
    label: string
    url: string
    icon: any //update to component
}

const footerNav: FooterNavItem[] = [
    {
        label: 'Instagram',
        url: 'https://www.instagram.com/trevor_davis/',
        icon: Instagram,
    },
    {
        label: 'Twitter',
        url: 'https://twitter.com/trevor_davis',
        icon: Twitter,
    },
    {
        label: 'GitHub',
        url: 'https://github.com/davist11',
        icon: Github,
    },
]

const Footer = () => {
    return (
        <footer
            id="footer"
            role="contentinfo"
            className="bg-blue-700 py-32 px-16 relative"
        >
            <dl className="flex items-center justify-center space-x-16 -mx-16 mb-32">
                <dt className="sr-only">Connect with me on:</dt>
                {footerNav.map(({ label, url, icon: Icon }) => (
                    <dd key={label}>
                        <a
                            href={url}
                            className="duration-200 transition-default text-white-default hover:text-blue-200"
                        >
                            <span className="sr-only">{label}</span>
                            <Icon className="rect-icon-md" />
                        </a>
                    </dd>
                ))}
            </dl>

            <div className="text text-center">
                <p className="text-xs sm:text-sm">
                    Run into a problem?{' '}
                    <a href="https://github.com/davist11/trevordavis-remix/issues/new">
                        Submit an issue
                    </a>{' '}
                    to let me know. Thanks!
                </p>
            </div>

            <Doodle className="rect-doodle-sm smd:mt-32 smd:mx-auto sm:rect-doodle sm:absolute sm:bottom-0 sm:left-full sm:-translate-x-48 sm:-rotate-45 sm:scale-50 sm:transition-all sm:duration-200 sm:hover:-translate-x-full sm:hover:rotate-0 sm:hover:scale-100" />
        </footer>
    )
}

export default Footer
