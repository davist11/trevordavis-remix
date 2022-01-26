import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
    useTransition,
} from 'remix'
import styles from './tailwind.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Loader from '~/components/Loader'
import { MetaBase, SkipLink } from './components/Layout'
import CatchError from './components/CatchError'

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
            href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;400&Open+Sans:wght@300&display=swap',
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
            rel: 'mask-icon',
            href: '/safari-pinned-tab.svg',
            color: '#60a7c7',
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

    return (
        <html lang="en" dir="ltr">
            <head>
                <MetaBase />
                <Meta />
                <Links />
            </head>
            <body>
                <SkipLink />

                <Header />

                <main
                    id="content"
                    role="main"
                    tabIndex={-1}
                    className="py-64 outline-none relative"
                >
                    <Outlet />

                    {transition.state === 'loading' ? (
                        <div className="inset-0 absolute">
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
    const caught = useCatch()

    return (
        <html lang="en" dir="ltr">
            <head>
                <MetaBase />
                <Meta />
                <Links />
                <title>{caught.statusText}</title>
            </head>
            <body>
                <SkipLink />

                <Header />

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
export function ErrorBoundary({ error }) {
    console.error(error)

    const errorText = 'Whoops!'

    return (
        <html lang="en" dir="ltr">
            <head>
                <MetaBase />
                <Meta />
                <Links />
                <title>{errorText}</title>
            </head>
            <body>
                <SkipLink />

                <Header />

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
