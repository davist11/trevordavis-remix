import type { LoaderFunction } from '@remix-run/node'
import useGqlClient from '~/hooks/use-gql-client'
import { GET_RSS_ITEMS } from '~/graphql/queries'

import type { TextBlockType } from '~/components/blocks/TextBlock'
import type { CodeBlockType } from '~/components/blocks/CodeBlock'

const escapeCdata = (s: string) => {
    return s.replace(/\]\]>/g, ']]]]><![CDATA[>')
}

export const loader: LoaderFunction = async ({ request }) => {
    const { entries } = await useGqlClient().request(GET_RSS_ITEMS)

    const host =
        request.headers.get('X-Forwarded-Host') ?? request.headers.get('host')

    if (!host) {
        throw new Error('Could not determine domain URL.')
    }

    const protocol = host.includes('localhost') ? 'http' : 'https'
    const domain = `${protocol}://${host}`
    const newestDate = entries[0].postDate

    const rssString = `
        <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
          <channel>
            <title>Trevor Davis</title>
            <link>${domain}</link>
            <description>Blog and Portfolio for Trevor Davis</description>
            <language>en-us</language>
            <pubDate>${newestDate}</pubDate>
			<lastBuildDate>${newestDate}</lastBuildDate>
            <ttl>120</ttl>
            ${entries
                .map((entry: any) => {
                    // TODO correctly type entry with interface
                    const url =
                        entry.sectionHandle === 'work' ||
                        entry.typeHandle === 'externalArticle'
                            ? entry.website
                            : `${domain}/${entry.uri}`

                    let body = entry?.body

                    if (entry?.bodyBlocks) {
                        body = ''

                        entry.bodyBlocks.forEach(
                            (block: TextBlockType | CodeBlockType) => {
                                if (block.typeHandle === 'text') {
                                    body += block.text
                                } else if (block.typeHandle === 'code') {
                                    body += `<pre>${block.code}</pre>`
                                }
                            }
                        )
                    }

                    if (entry.sectionHandle === 'work') {
                        const imageUrl = entry?.listingImage?.[0].url
                        const image = imageUrl
                            ? `<img src="${imageUrl}" alt="${entry.title}" width="440">`
                            : entry.title

                        body = `
                        <p>
                            ${url ? '<a href="' + url + '">' : ''}
                                ${image}
                            ${url ? '</a>' : ''}
                        </p>
                        `
                    }

                    return `
                    <item>
                        <title><![CDATA[${escapeCdata(entry.title)}]]></title>
                        <link>${url ?? ''}</link>
                        <pubDate>${entry.postDate}</pubDate>
                        <author>Trevor Davis</author>
                        <guid>${url ?? ''}</guid>
                        <description><![CDATA[${escapeCdata(body)}]]>
                        </description>
                    </item>`.trim()
                })
                .join('\n')}
          </channel>
        </rss>
      `.trim()

    return new Response(rssString, {
        headers: {
            'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${
                60 * 60 * 24
            }`,
            'Content-Type': 'application/xml',
            'Content-Length': String(Buffer.byteLength(rssString)),
        },
    })
}
