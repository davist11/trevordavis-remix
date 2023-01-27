import { type LoaderFunction } from "@remix-run/node";
import useGqlClient from '~/hooks/use-gql-client'
import { GET_RSS_ITEMS } from '~/graphql/queries'

export const loader: LoaderFunction = async ({ request }) => {
    const host = `https://www.trevor-davis.com/`
    const { entries } = await useGqlClient().request(GET_RSS_ITEMS)

    const sitemapString = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>${host}</loc>
            </url>
            <url>
                <loc>${host}about</loc>
            </url>
            <url>
                <loc>${host}about?pets[dogs]=all</loc>
            </url>
            <url>
                <loc>${host}blog</loc>
            </url>
            <url>
                <loc>${host}contact</loc>
            </url>
            ${entries
                .filter((entry: any) => entry.typeHandle === 'blog')
                .map((entry: any) =>
                    `<url>
                        <loc>${host}${entry.uri}</loc>
                    </url>`.trim()
                )
                .join('')}
        </urlset>`.trim()

    return new Response(sitemapString, {
        headers: {
            'Content-Type': 'application/xml',
            'xml-version': '1.0',
            encoding: 'UTF-8',
        },
    })
}
