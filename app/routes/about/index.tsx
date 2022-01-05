import { useLoaderData, json } from 'remix'
import type { LoaderFunction } from 'remix'
import { gql } from 'graphql-request'
import { gqlClient } from '~/helpers/graphql-client'
import cx from 'classnames'
import { getMeta } from '~/helpers/get-meta'

export const meta = () => {
    return getMeta({
        title: 'About',
        description: 'Find out a little more about me',
    })
}

export const loader: LoaderFunction = async () => {
    const { entries } = await gqlClient.request(gql`
        {
            entries(section: "about", limit: 1) {
                id
                title
                ... on about_about_Entry {
                    id
                    facts {
                        ... on facts_fact_BlockType {
                            id
                            fact
                            image {
                                url
                                    @transform(
                                        width: 850
                                        height: 575
                                        immediately: true
                                    )
                            }
                        }
                    }
                }
            }
        }
    `)

    return json({ entries })
}

interface FactImage {
    url: string
}

interface FactType {
    id: number
    fact: string
    image: FactImage[]
}

export default function AboutIndex() {
    const { entries } = useLoaderData()
    const entry = entries[0]
    const facts: FactType[] = entry.facts

    const randomImageUrl = (images: FactImage[]) =>
        images[Math.floor(Math.random() * images.length)].url

    return (
        <div className="max-w-1064 mx-auto px-20">
            <div className="relative pb-48 mb-48">
                <h1 className="text-jb text-purple">{entry.title}</h1>

                <div className="absolute left-0 bottom-0 h-2 w-120 bg-blue-600"></div>
            </div>

            <div className="space-y-48">
                {facts.map((item, index: number) => (
                    <div
                        key={item.id}
                        className={cx('sm:flex sm:items-center', {
                            'sm:flex-row-reverse': index % 2 === 0,
                        })}
                    >
                        <div
                            className={cx('smd:mb-16 sm:w-1/3 text', {
                                'sm:pl-20': index % 2 === 0,
                                'sm:pr-20': index % 2 !== 0,
                            })}
                            dangerouslySetInnerHTML={{ __html: item.fact }}
                        ></div>

                        {item.image.length ? (
                            <div className="sm:w-2/3">
                                <img src={randomImageUrl(item.image)} alt="" />
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    )
}
