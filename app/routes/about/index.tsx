import type { LoaderFunction } from '@remix-run/router'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import cx from 'classnames'

import useGqlClient from '~/hooks/use-gql-client'
import useMetaData from '~/hooks/use-meta-data'

import { GET_ABOUT } from '~/graphql/queries'

import Image from '~/components/Image'
import Dogs from '~/components/Dogs'
import PageHeading from '~/components/PageHeading'
import Divider from '~/components/Divider'

type FactImage = {
    url: string
}

type FactType = {
    id: number
    fact: string
    image: FactImage[]
}

export const meta = ({ data }: any) => {
    if (data?.dogs) {
        return useMetaData({
            title: 'Newman',
            description: 'Helloooooo Newman',
        })
    }

    return useMetaData({
        title: 'About',
        description: 'Find out a little more about me',
    })
}

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url)
    const dogs = url.searchParams.get('pets[dogs]')
    const { entries } = await useGqlClient().request(GET_ABOUT)

    return json({ entries, dogs })
}

export default function AboutIndex() {
    const { entries, dogs } = useLoaderData()
    const entry = entries[0]
    const facts: FactType[] = entry.facts

    const randomImageUrl = (images: FactImage[]) => {
        return images[Math.floor(Math.random() * images.length)].url
    }

    if (dogs) {
        return <Dogs facts={facts} />
    }

    return (
        <div className="max-w-1064 mx-auto px-20">
            <div className="relative pb-48 mb-48">
                <PageHeading>{entry.title}</PageHeading>

                <Divider />
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
                                {item.fact.includes('Newman') ? (
                                    <Link
                                        to="/about?pets[dogs]=all"
                                        className="block aspect-about"
                                    >
                                        <Image
                                            src={randomImageUrl(item.image)}
                                            options={{ w: 850, h: 575 }}
                                            alt="Newman"
                                        />
                                    </Link>
                                ) : (
                                    <div className="aspect-about">
                                        <Image
                                            src={randomImageUrl(item.image)}
                                            options={{ w: 850, h: 575 }}
                                        />
                                    </div>
                                )}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        </div>
    )
}
