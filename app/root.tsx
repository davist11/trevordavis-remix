import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
    useTransition,
    useLoaderData,
} from '@remix-run/react'
import styles from './tailwind.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from '~/components/Loader'
import { MetaBase, SkipLink } from './components/Layout'
import CatchError from './components/CatchError'
import { useTheme } from './hooks/use-theme'
import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { themeCookie } from '~/cookies.server'

export const loader: LoaderFunction = async ({ request }) => {
    const cookieHeader = request.headers.get('Cookie')
    const theme = (await themeCookie.parse(cookieHeader)) || 'dark'

    return json({ theme })
}

export function links() {
    return [
        {
            rel: 'stylesheet',
            href: styles,
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
        },
        {
            rel: 'preconnect',
            href: 'https://assets.trevor-davis.com',
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400&family=Quicksand:wght@300;500&family=JetBrains+Mono:wght@100&display=swap',
        },
        {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: '/apple-touch-icon.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '32x32',
            href: '/favicon-32x32.png',
        },
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            href: '/favicon-16x16.png',
        },
        {
            rel: 'manifest',
            href: '/site.webmanifest',
        },
        {
            rel: 'mask-icon',
            href: '/safari-pinned-tab.svg',
            color: '#5bbad5',
        },
        {
            rel: 'alternate',
            href: '/feed.rss',
            type: 'application/rss+xml',
            title: 'Trevor Davis',
        },
    ]
}

// App layout
export default function App() {
    const transition = useTransition()

    const { theme: initialTheme } = useLoaderData()
    const { theme, setTheme, handleThemeToggle } = useTheme(initialTheme)

    return (
        <html lang="en" dir="ltr" className={theme}>
            <head>
                <MetaBase />
                <Meta />
                <Links />
            </head>
            <body className="dark:bg-blue-400 dark:text-cream-100 bg-cream-100 text-blue-400 font-light font-sans text-md">
                <SkipLink />

                <Header
                    theme={theme}
                    setTheme={setTheme}
                    handleThemeToggle={handleThemeToggle}
                />

                <main
                    id="content"
                    role="main"
                    tabIndex={-1}
                    className="py-64 outline-none"
                >
                    <Outlet />

                    {transition.state === 'loading' ? (
                        <div className="inset-0 fixed z-2">
                            <div className="fixed w-64 top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-2">
                                <Loader />
                            </div>
                            <div className="inset-0 absolute bg-blue-500 opacity-50 z-1"></div>
                        </div>
                    ) : null}
                </main>

                <Footer />

                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === 'development' && <LiveReload />}
            </body>
        </html>
    )
}

// 404
export function CatchBoundary() {
    const { theme, setTheme, handleThemeToggle } = useTheme('dark')

    const caught = useCatch()

    return (
        <html lang="en" dir="ltr" className={theme}>
            <head>
                <MetaBase />
                <Meta />
                <Links />
                <title>{caught.statusText}</title>
            </head>
            <body className="dark:bg-blue-400 dark:text-cream-100 bg-cream-100 text-blue-400 font-light font-sans text-md">
                <SkipLink />

                <Header
                    theme={theme}
                    setTheme={setTheme}
                    handleThemeToggle={handleThemeToggle}
                />

                <main
                    id="content"
                    role="main"
                    tabIndex={-1}
                    className="py-64 outline-none"
                >
                    <CatchError errorText={caught.statusText} />
                </main>

                <Footer />

                <Scripts />
            </body>
        </html>
    )
}

// Uncaught exception
export function ErrorBoundary({ error }: { error: Error }) {
    const { theme, setTheme, handleThemeToggle } = useTheme('dark')

    console.error(error)

    const errorText = 'Whoops!'

    return (
        <html lang="en" dir="ltr" className={theme}>
            <head>
                <MetaBase />
                <Meta />
                <Links />
                <title>{errorText}</title>
            </head>
            <body className="dark:bg-blue-400 dark:text-cream-100 bg-cream-100 text-blue-400 font-light font-sans text-md">
                <SkipLink />

                <Header
                    theme={theme}
                    setTheme={setTheme}
                    handleThemeToggle={handleThemeToggle}
                />

                <main
                    id="content"
                    role="main"
                    tabIndex={-1}
                    className="py-64 outline-none"
                >
                    <CatchError errorText={errorText} />
                </main>

                <Footer />

                <Scripts />
            </body>
        </html>
    )
}
