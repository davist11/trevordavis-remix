import { Link } from "@remix-run/react";
import { useState } from 'react'
import cx from 'classnames'
import LogoText from '~/images/icons/LogoText'
import LogoIcon from '~/images/icons/LogoIcon'
import MenuIcon from '~/images/icons/Menu'
import Close from '~/images/icons/Close'

interface NavItem {
    title: string
    url: string
}

const nav: NavItem[] = [
    {
        title: 'About',
        url: 'about',
    },
    {
        title: 'Blog',
        url: 'blog',
    },
    {
        title: 'Contact',
        url: 'contact',
    },
]

const Header = () => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggleNav = () => {
        setIsOpen(!isOpen)
    }

    return (
        <header
            id="header"
            role="banner"
            className="bg-blue-500"
            data-controller="header"
        >
            <div className="max-w-1280 mx-auto flex justify-between items-center px-16 mdd:py-16">
                <Link to="/" className="flex items-center">
                    <span className="sr-only">Trevor Davis</span>

                    <span className="block mr-16 text-blue-200">
                        <LogoIcon className="rect-logo-icon" />
                    </span>

                    <span className="text-white-default">
                        <LogoText className="rect-logo-text" />
                    </span>
                </Link>

                <button className="md:hidden" onClick={handleToggleNav}>
                    <span className="sr-only">Menu</span>
                    <MenuIcon className="rect-icon" />
                </button>

                <nav
                    data-header-target="nav"
                    className={cx(
                        'mdd:bg-blue-700 mdd:fixed mdd:inset-0 mdd:z-nav-overlay mdd:flex mdd:items-center mdd:justify-center mdd:p-16 mdd:transition-opacity-transform mdd:duration-200 mdd:transform',
                        {
                            'mdd:translate-x-full mdd:opacity-0': !isOpen,
                            'mdd:opacity-1': isOpen,
                        }
                    )}
                >
                    <ul className=" font-medium mdd:space-y-16 mdd:text-center mdd:text-xl md:flex md:items-center md:space-x-16">
                        {nav.map(({ title, url }) => (
                            <li key={title}>
                                <Link
                                    to={url}
                                    className={cx(
                                        'block px-16 py-24 border-y-4 border-transparent rounded-b-default duration-200 transition-default hover:text-white-default hover:border-b-blue-200'
                                    )}
                                    onClick={handleToggleNav}
                                >
                                    {title}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <button
                        className="md:hidden absolute right-16 top-16"
                        onClick={handleToggleNav}
                    >
                        <span className="sr-only">Close</span>
                        <Close className="rect-icon-lg" />
                    </button>
                </nav>
            </div>
        </header>
    )
}

export default Header
