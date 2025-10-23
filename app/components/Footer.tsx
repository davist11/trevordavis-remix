import Github from '~/images/icons/Github'
import Linkedin from '~/images/icons/Linkedin'

interface FooterNavItem {
    label: string
    url: string
    icon: any
}

const footerNav: FooterNavItem[] = [
    {
        label: 'Linkedin',
        url: 'https://www.linkedin.com/in/trevordavis11/',
        icon: Linkedin,
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
            className="max-w-1280 mx-auto flex justify-between items-center px-16 py-24 border-t-2 border-blue-500"
        >
            <dl className="flex items-center justify-center gap-16">
                <dt className="sr-only">Connect with me on:</dt>
                {footerNav.map(({ label, url, icon: Icon }) => (
                    <dd key={label}>
                        <a
                            href={url}
                            className="duration-200 transition-default dark:text-cream-100 hover:text-blue-200"
                        >
                            <span className="sr-only">{label}</span>
                            <Icon className="rect-icon" />
                        </a>
                    </dd>
                ))}
            </dl>

            <div className="text">
                <p className="text-xs sm:text-sm">
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
