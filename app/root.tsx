import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch,
} from 'remix'
import styles from './tailwind.css'
import Header from './components/Header'
import Footer from './components/Footer'
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

                <main id="content" role="main" tabIndex={-1} className="py-64">
                    <Outlet />
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

                <main id="content" role="main" tabIndex={-1} className="py-64">
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

                <main id="content" role="main" tabIndex={-1} className="py-64">
                    <CatchError errorText={errorText} />
                </main>

                <Footer />

                <Scripts />
            </body>
        </html>
    )
}
