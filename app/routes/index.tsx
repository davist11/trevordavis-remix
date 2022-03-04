import { useLoaderData, json } from 'remix'
import { gql } from 'graphql-request'
import cx from 'classnames'
import WorkEntry from '~/components/WorkEntry'
import { getMeta } from '~/helpers/get-meta'
import CurvedArrow from '~/images/icons/CurvedArrow'
import { gqlClient } from '~/helpers/graphql.server'

export const meta = () => {
    return getMeta({
        description: 'I’m a Senior Software Engineer at Dutchie.',
    })
}

const HomepageDataQuery = gql`
    {
        workEntries: entries(section: "work", orderBy: "lft DESC") {
            id
            title
            ... on work_work_Entry {
                website
                listingImage {
                    urlLarge: url
                        @transform(width: 1200, height: 675, immediately: true)
                    urlSmall: url
                        @transform(width: 680, height: 382, immediately: true)
                }
            }
        }

        homepageEntry: entries(section: "homepage", limit: 1) {
            id
            ... on homepage_homepage_Entry {
                id
                description
            }
        }
    }
`

export let loader = async () => {
    const { workEntries, homepageEntry } = await gqlClient().request(
        HomepageDataQuery
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
            <div className="max-w-1440 mx-auto mb-32 px-20 lg:px-40 lg:text-center">
                <div
                    className="text text-lg md:text-xl"
                    dangerouslySetInnerHTML={{
                        __html: homepageEntry.description,
                    }}
                ></div>

                <div className="flex lg:justify-center">
                    <h2 className="mt-48 text-lg md:text-xl lg:relative lg:px-48">
                        Check out a selection of my work
                        <div className="absolute left-full top-16 -ml-40 lgd:hidden">
                            <CurvedArrow className="rect-icon-lg transform -scale-x-100 rotate-200" />
                        </div>
                    </h2>
                </div>
            </div>

            <div className="max-w-1280 mx-auto space-y-40 flex flex-wrap justify-between px-20 lg:px-40">
                {workEntries.map(
                    ({ id, title, listingImage, website }, index) => (
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
                                image={
                                    index === 0 && listingImage
                                        ? listingImage[0]?.urlLarge
                                        : listingImage[0]?.urlSmall
                                }
                                website={website}
                                lazy={index > 2}
                            />
                        </div>
                    )
                )}
            </div>
        </>
    )
}
