import type { LoaderFunction } from 'remix'
import { gqlClient } from '~/helpers/graphql.server'
import { gql } from 'graphql-request'

const escapeCdata = (s: string) => {
    return s.replace(/\]\]>/g, ']]]]><![CDATA[>')
}

export const loader: LoaderFunction = async ({ request }) => {
    const { entries } = await gqlClient().request(gql`
        {
            entries(section: ["blog", "work"], orderBy: "postDate DESC") {
                id
                title
                sectionHandle
                postDate @formatDateTime(format: "rss")
                uri
                ... on work_work_Entry {
                    id
                    website
                    listingImage {
                        url
                    }
                }
                ... on blog_blog_Entry {
                    id
                    body
                    typeHandle
                }
                ... on blog_externalArticle_Entry {
                    id
                    body
                    typeHandle
                    website
                }
            }
        }
    `)

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
