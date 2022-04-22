import Twitter from '~/images/icons/Twitter'
import Instagram from '~/images/icons/Instagram'
import Github from '~/images/icons/Github'

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
            className="bg-blue-700 py-32 px-16 space-y-32"
        >
            <dl className="flex items-center justify-center space-x-16 -mx-16">
                <dt className="sr-only">Connect with me on:</dt>
                {footerNav.map(({ label, url, icon: Icon }) => (
                    <dd key={label}>
                        <a
                            href={url}
                            className="duration-200 transition-default hover:text-pink-400"
                        >
                            <span className="sr-only">{label}</span>
                            <Icon className="rect-icon-md" />
                        </a>
                    </dd>
                ))}
            </dl>

            <div className="text text-center">
                <p className="text-sm">
                    Run into a problem?{' '}
                    <a href="https://github.com/davist11/trevordavis-remix/issues/new">
                        Submit an issue
                    </a>{' '}
                    to let me know. Thanks!
                </p>
            </div>
        </footer>
    )
}

export default Footer
