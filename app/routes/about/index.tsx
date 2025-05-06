import type { LoaderFunction } from '@remix-run/router'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import cx from 'classnames'

import useGqlClient from '~/hooks/use-gql-client'
import useMetaData from '~/hooks/use-meta-data'

import { GET_ABOUT } from '~/graphql/queries'

import Image from '~/components/Image'
import PageHeading from '~/components/PageHeading'
import Divider from '~/components/Divider'

import { linkClasses } from '~/routes/blog'
import { useEffect, useState } from 'react'

type FactImage = {
    url: string
}

type FactType = {
    id: number
    fact: string
    image: FactImage[]
}

type FormattedFactType = {
    id: number
    fact: string
    image: FactImage
}

type Experience = {
    id: number
    company: string
    companyUrl: string
    companyStartDate: string
    endDate: string
    description: string
    jobTitles: {
        jobTitle: string
        startDate: string
        endDate: string
    }[]
}

type Capability = {
    capability: string
}

export const meta = ({ data }: any) => {
    return useMetaData({
        title: 'About',
        description: 'Find out a little more about me',
    })
}

export const loader: LoaderFunction = async ({ request }) => {
    const { entries } = await useGqlClient().request(GET_ABOUT)

    return json({ entries })
}

const AboutImage = ({ image }: { image: FactImage }) => {
    return (
        <div className="aspect-about mb-10">
            <Image
                src={image.url}
                options={{
                    w: 850,
                    h: 575,
                }}
            />
        </div>
    )
}

export default function AboutIndex() {
    const { entries } = useLoaderData()
    const entry = entries[0]
    const facts: FactType[] = entry.facts
    const experience: Experience[] = entry.experience
    const capabilities: Capability[] = entry.capabilities
    const [formattedFacts, setFormattedFacts] = useState<FormattedFactType[]>(
        []
    )

    useEffect(() => {
        const factsWithRandomImage = facts.map((fact) => {
            return {
                ...fact,
                image: randomImage(fact.image),
            }
        })

        setFormattedFacts(factsWithRandomImage)
    }, [facts])

    const randomImage = (images: FactImage[]): FactImage => {
        return images[Math.floor(Math.random() * images.length)]
    }

    return (
        <div className="max-w-1064 mx-auto px-20">
            <div className="relative pb-48 mb-48">
                <PageHeading>A Bit About Me</PageHeading>

                <Divider />
            </div>

            <div className="space-y-48">
                <div>
                    <div className="flex flex-wrap gap-40 mb-80">
                        {formattedFacts.map(({ id, image, fact }) => (
                            <div key={id} className="sm:w-1/2-grid">
                                {image ? <AboutImage image={image} /> : null}

                                <div
                                    className="text"
                                    dangerouslySetInnerHTML={{
                                        __html: fact,
                                    }}
                                ></div>
                            </div>
                        ))}
                    </div>

                    <div className="relative pb-48 mb-48">
                        <h2 className="text-lg leading-snug font-serif antialiased md:text-xl">
                            My Software Enginering Journey
                        </h2>

                        <Divider />
                    </div>

                    <div className="mb-80">
                        {experience.map(
                            (
                                {
                                    id,
                                    company,
                                    companyUrl,
                                    companyStartDate,
                                    description,
                                    jobTitles,
                                },
                                index
                            ) => (
                                <div
                                    key={id}
                                    className="relative pl-40 sm:pl-140 pb-48 group"
                                >
                                    <div
                                        className={cx(
                                            'sm:absolute sm:top-0 sm:left-0 sm:w-80 sm:text-right smd:-ml-20 smd:mb-10 text-sm uppercase font-bold leading-none antialiased',
                                            {
                                                'smd:pt-2 sm:mt-2': index === 0,
                                            }
                                        )}
                                    >
                                        {index === 0
                                            ? 'Present'
                                            : companyStartDate}
                                    </div>
                                    <h3 className="text-md leading-none font-serif  antialiased md:text-lg mb-16">
                                        {companyUrl ? (
                                            <a
                                                href={companyUrl}
                                                className={linkClasses}
                                            >
                                                {company}
                                            </a>
                                        ) : (
                                            <>{company}</>
                                        )}
                                    </h3>
                                    {jobTitles.map(
                                        ({ startDate, jobTitle, endDate }) => (
                                            <div key={startDate}>
                                                <p>
                                                    <strong className="dark:text-blue-100">
                                                        {jobTitle}
                                                    </strong>
                                                    ,{' '}
                                                    <span className="text-sm">
                                                        {startDate} &mdash;{' '}
                                                        {endDate ?? 'Present'}
                                                    </span>
                                                </p>
                                            </div>
                                        )
                                    )}
                                    <div
                                        className="text mt-16"
                                        dangerouslySetInnerHTML={{
                                            __html: description,
                                        }}
                                    ></div>

                                    <div
                                        className={cx(
                                            'absolute h-full w-8 left-0 sm:left-100 top-0 -translate-x-1/2 bg-blue-600',
                                            {
                                                'rounded-b-full':
                                                    index ===
                                                    experience.length - 1,
                                            }
                                        )}
                                    ></div>

                                    <div
                                        className={cx(
                                            'absolute left-0 sm:left-100 -translate-x-1/2 rounded-full',
                                            {
                                                'bg-blue-600 border-blue-200 border-4 h-20 w-20 -top-px':
                                                    index === 0,
                                                'dark:bg-blue-100 bg-blue-200 h-16 w-16 top-0':
                                                    index > 0,
                                            }
                                        )}
                                    ></div>
                                </div>
                            )
                        )}
                    </div>

                    <div className="relative pb-48 mb-48">
                        <h2 className="text-lg leading-snug font-serif antialiased md:text-xl">
                            (Some of) My Capabilities
                        </h2>

                        <Divider />
                    </div>

                    <ul className="flex flex-wrap gap-20">
                        {capabilities.map(({ capability }) => (
                            <li
                                key={capability}
                                className="bg-blue-200 dark:text-blue-600 text-cream-100 p-20 rounded-full font-bold antialiased leading-none"
                            >
                                {capability}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}
