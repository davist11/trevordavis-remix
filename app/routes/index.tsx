import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import cx from 'classnames'

import useGqlClient from '~/hooks/use-gql-client'
import useMetaData from '~/hooks/use-meta-data'

import { GET_HOMEPAGE } from '~/graphql/queries'

import WorkEntry from '~/components/WorkEntry'
import CurvedArrow from '~/images/icons/CurvedArrow'

export const meta = () => {
    return useMetaData({
        description: 'I’m a Senior Software Engineer at Dutchie.',
    })
}

export let loader = async () => {
    const { workEntries, homepageEntry } = await useGqlClient().request(
        GET_HOMEPAGE
    )

    return json({
        homepageEntry,
        workEntries,
    })
}

interface WorkEntryType {
    id: number
    title: string
    listingImage: any
    website?: string
}

export default function Index() {
    const data = useLoaderData()
    const homepageEntry = data.homepageEntry[0]
    const workEntries: WorkEntryType[] = data.workEntries

    return (
        <>
            <h1 className="sr-only">
                Trevor Davis, Senior Software Engineer @ Dutchie
            </h1>

            <div className="max-w-1440 mx-auto mb-32 px-20 lg:px-40 lg:text-center">
                <div
                    className="text text-lg md:text-xl font-serif"
                    dangerouslySetInnerHTML={{
                        __html: homepageEntry.description,
                    }}
                ></div>

                <div className="flex lg:justify-center">
                    <h2 className="mt-48 text-md md:text-lg lg:relative lg:px-48">
                        Check out a selection of my work
                        <div className="absolute left-full top-16 -ml-40 lgd:hidden">
                            <CurvedArrow className="rect-icon-lg transform -scale-x-100 rotate-200" />
                        </div>
                    </h2>
                </div>
            </div>

            <div className="max-w-1280 mx-auto space-y-40 flex flex-wrap justify-between px-20 lg:px-40">
                {workEntries.map(
                    ({ id, title, listingImage, website }, index) => {
                        const options =
                            index === 0
                                ? {
                                      w: 1200,
                                      h: 675,
                                  }
                                : {
                                      w: 680,
                                      h: 382,
                                  }

                        return (
                            <div
                                className={cx('text-center', {
                                    'w-full': index === 0,
                                    'w-full md:w-1/2-grid': index > 0,
                                })}
                                key={id}
                            >
                                <WorkEntry
                                    id={id}
                                    title={title}
                                    image={listingImage[0].url}
                                    options={options}
                                    website={website}
                                    lazy={index > 2}
                                />
                            </div>
                        )
                    }
                )}
            </div>
        </>
    )
}
