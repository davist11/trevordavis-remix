import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'remix'
import styles from './tailwind.css'
import Header from './components/Header'
import Github from './images/icons/Github'
import Twitter from './images/icons/Twitter'
import Instagram from './images/icons/Instagram'

// TODO figure out RSS feed
// <link rel="alternate" type="application/rss+xml" title="Trevor Davis" href="{{ url('feed.rss') }}">

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
    ]
}

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

export default function App() {
    return (
        <html lang="en" dir="ltr">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width,initial-scale=1"
                />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
                <meta name="theme-color" content="#ffffff" />
                <Meta />
                <Links />
            </head>
            <body>
                <a
                    href="#content"
                    className="sr-only focus:sr-undo-absolute bg-orange text-blue-400"
                >
                    <div className="p-8">Skip to Content</div>
                </a>

                <Header />

                <main id="content" role="main" tabIndex={-1} className="py-64">
                    <Outlet />
                </main>

                <footer
                    id="footer"
                    role="contentinfo"
                    className="bg-blue-700 p-16"
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
                </footer>

                <ScrollRestoration />
                <Scripts />
                {process.env.NODE_ENV === 'development' && <LiveReload />}
            </body>
        </html>
    )
}

/*
{%- from '_macros' import icon %}
{%- set entry = entry ?? null -%}
{%- set isHomepage = entry  and entry.isHomepage -%}
<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, minimum-scale=1">
	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<title>{% if title is defined %}{{ title }} | {% endif %}{{ siteName }} | Front-End Development Technical Director @ Viget</title>
	{# <link rel="stylesheet" href="{{ rev('stylesheets/application.css', false) }}" media="not print"> #}
	{%- if craft.app.env != 'dev' -%}
    	<link href="{{ rev('app.css') }}" rel="stylesheet">
  	{%- endif -%}
	<link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;400&Open+Sans:wght@300&display=swap" rel="stylesheet">

	<link rel="alternate" type="application/rss+xml" title="Trevor Davis" href="{{ url('feed.rss') }}">

	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
	<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
	<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
	<link rel="manifest" href="/manifest.json">
	<link rel="mask-icon" href="/safari-pinned-tab.svg" color="#60a7c7">
	<meta name="theme-color" content="#ffffff">

    <script>
		if ('visibilityState' in document) {
			document.documentElement.classList.add('enhanced');
		}
	</script>

    {# runtime and vendors only split in prod #}
	{% if craft.app.env != 'dev' %}
		<script src="{{ rev('runtime.js') }}" defer></script>

		{# vendors could still not exist in prod #}
		{% if rev('vendors.js') != 'vendors.js' %}
			<script src="{{ rev('vendors.js') }}" defer></script>
		{% endif %}
	{% endif %}

	<script src="{{ rev('app.js') }}" defer></script>
</head>

<body>
	<a
        href="#content"
        className="sr-only focus:sr-undo-absolute bg-orange text-blue-400"
    >
        <div className="p-8">
            Skip to Content
        </div>
    </a>

	<header id="header" role="banner" className="bg-blue-500" data-controller="header">
        <div className="max-w-1280 mx-auto flex justify-between items-center py-16 px-16">

            {% if isHomepage %}
                <h1 className="flex items-center">
            {% else %}
                <a href="{{ url('/') }}" className="flex items-center">
            {% endif %}

            <span className="sr-only">Trevor Davis</span>

            <span className="block mr-16 text-pink-400">
                {{ icon('logo-icon', 48, 48) }}
            </span>

            <span className="text-white-default">
                {{ icon('logo-text', 168, 25) }}
            </span>

            {% if isHomepage %}
                </h1>
            {% else %}
                </a>
            {% endif %}

            <button className="md:hidden" data-action="header#open">
                <span className="sr-only">Menu</span>
                {{ icon('menu', 24, 24) }}
            </button>

            <nav
                data-header-target="nav"
                className="mdd:bg-blue-700 mdd:fixed mdd:inset-0 mdd:z-nav-overlay mdd:flex mdd:items-center mdd:justify-center mdd:p-16 mdd:transition-opacity-transform mdd:duration-200 mdd:transform mdd:translate-x-full mdd:opacity-0"
            >
                {% set nav = [
                    {
                        title: 'About',
                        url: 'about',
                        color: 'bg-purple',
                    },
                    {
                        title: 'Blog',
                        url: 'blog',
                        color: 'bg-teal',
                    },
                    {
                        title: 'Contact',
                        url: 'contact',
                        color: 'bg-yellow',
                    }
                ] %}

                <ul
                    className="text-shadow-white font-normal mdd:font-hairline mdd:space-y-16 mdd:text-center mdd:text-xl md:flex md:items-center md:space-x-16"
                >
                    {% for item in nav %}
                        <li>
                            <a
                                href="{{ url(item.url) }}"
                                className="{{ cx('block text-blue-500 rounded-full px-16 py-8 mdd:px-32 mdd:py-16', item.color) }}"
                            >
                                {{ item.title }}
                            </a>
                        </li>
                    {% endfor %}
                </ul>

                <button className="md:hidden absolute right-16 top-16" data-action="header#close">
                    <span className="sr-only">Close</span>
                    {{ icon('close', 48, 48) }}
                </button>
            </nav>
        </div>
	</header>

	<main id="content" role="main" tabindex="-1" className="py-64">
		{% block content %}
		{% endblock %}
	</main>

	<footer id="footer" role="contentinfo" className="bg-blue-700 p-16">
		{% set social = [
			{
				label: 'Instagram',
				url: 'https://www.instagram.com/trevor_davis/',
				icon: 'instagram'
			},
			{
				label: 'Twitter',
				url: 'https://twitter.com/trevor_davis',
				icon: 'twitter'
			},
			{
				label: 'GitHub',
				url: 'https://github.com/davist11',
				icon: 'github'
			}
		] %}
		<dl className="flex items-center justify-center space-x-16 -mx-16">
			<dt className="sr-only">Connect with me on:</dt>
			{% for item in social %}
				<dd>
					<a
                        href="{{ item.url }}"
                        className="duration-200 transition-default hover:text-pink-400"
                    >
						<span className="sr-only">{{ item.label }}</span>
						{{ icon(item.icon, 36, 36) }}
					</a>
				</dd>
			{% endfor %}
		</dl>
	</footer>

	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-751954-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments)};
		gtag('js', new Date());

		gtag('config', 'UA-751954-1');
	</script>

	{% if craft.app.config.general.devMode or (currentUser and currentUser.can('accessCp')) %}
		{% set item = entry ?? null %}

		{% if item %}
			<a
                href="{{ item.cpEditUrl }}"
                className="fixed bottom-0 left-0 z-2 bg-yellow p-8 text-blue-700"
                target="_blank"
            >
                Edit Entry
            </a>
		{% endif %}
	{% endif %}
</body>
</html>
*/
