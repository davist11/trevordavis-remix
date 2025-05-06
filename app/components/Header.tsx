import { Link, useMatches } from '@remix-run/react'
import { useState } from 'react'
import cx from 'classnames'
import LogoText from '~/images/icons/LogoText'
import LogoIcon from '~/images/icons/LogoIcon'
import MenuIcon from '~/images/icons/Menu'
import Close from '~/images/icons/Close'
import { ThemeToggle } from '~/components/ThemeToggle'
import { Theme } from '~/hooks/use-theme'
interface NavItem {
    title: string
    url: string
}

const nav: NavItem[] = [
    {
        title: 'Portfolio',
        url: '',
    },
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

type HeaderProps = {
    handleThemeToggle: () => void
    setTheme: (theme: Theme) => void
    theme: Theme
}

const Header = ({ theme, handleThemeToggle, setTheme }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false)

    const handleToggleNav = () => {
        setIsOpen(!isOpen)
    }

    const matches = useMatches()
    const currentSection = matches[matches.length - 1].pathname.split('/')[1]

    return (
        <header
            id="header"
            role="banner"
            // className="bg-blue-500 text-blue-100"
            data-controller="header"
        >
            <div className="max-w-1280 mx-auto flex justify-between items-center px-16 py-24">
                <Link to="/" className="flex items-center">
                    <span className="sr-only">Trevor Davis</span>

                    <span className="block mr-16 text-blue-200">
                        <LogoIcon className="rect-logo-icon" />
                    </span>

                    <span>
                        <LogoText className="rect-logo-text" />
                    </span>
                </Link>

                <button className="md:hidden" onClick={handleToggleNav}>
                    <span className="sr-only">Menu</span>
                    <MenuIcon className="rect-icon" />
                </button>

                <div className="flex items-center gap-24">
                    <nav className="bg-black/5 border-2 border-blue-700 p-4 rounded-full text-xs font-bold dark:text-cream-100 text-blue-500">
                        <ul className="flex items-center gap-8">
                            {nav.map(({ title, url }) => (
                                <li key={title}>
                                    <Link
                                        to={url}
                                        className={cx(
                                            'block leading-none px-12 py-4  transition-all duration-400',
                                            {
                                                'bg-blue-200 rounded-full dark:text-blue-400 text-cream-100':
                                                    currentSection === url,
                                                'hover:text-blue-200 dark:hover:text-blue-100':
                                                    currentSection !== url,
                                            }
                                        )}
                                        onClick={handleToggleNav}
                                    >
                                        {title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <ThemeToggle
                        handleThemeToggle={handleThemeToggle}
                        theme={theme}
                        setTheme={setTheme}
                    />
                </div>

                {/* TODO fix mobile display */}
                {/* <div className="flex items-center">
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
                                            'block px-16 py-24 border-y-4 border-transparent rounded-b-default duration-200 transition-default  hover:text-white-default hover:border-b-blue-200'
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

                    <ThemeToggle
                        handleThemeToggle={handleThemeToggle}
                        theme={theme}
                    />
                </div> */}
            </div>
        </header>
    )
}

export default Header
