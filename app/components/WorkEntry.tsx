import Image from './Image'

const WorkEntry = ({
    id,
    title,
    image,
    website,
    lazy,
    options,
}: {
    id: Number
    title: string
    image: string
    website?: string
    lazy: boolean
    options?: Record<string, string | number>
}) => {
    const loading = lazy ? 'lazy' : 'eager'

    return (
        <>
            {website ? (
                <a
                    href={website}
                    className="block overflow-hidden rounded-md bg-blue-600 group"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <div className="p-8 text-md font-medium antialiased">
                        {title}
                    </div>
                    <div className="relative">
                        <div
                            className="absolute z-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            opacity-0 group-hover:opacity-100 bg-blue-200 border-2 border-blue-200 text-blue-400 leading-none py-10 px-20 rounded-md antialiased font-medium transition-all duration-200 hover:bg-blue-400 hover:text-blue-100 hover:rounded-xl"
                        >
                            Visit Site
                        </div>

                        <div className="absolute bg-blue-600 inset-0 z-2 opacity-0 duration-200 transition-opacity group-hover:opacity-50"></div>

                        <div className="aspect-homepage relative z-1">
                            <Image
                                src={image}
                                loading={loading}
                                options={options}
                            />
                        </div>
                    </div>
                </a>
            ) : (
                <div className="overflow-hidden rounded-md bg-blue-600">
                    <div className="p-8 text-md font-medium antialiased">
                        {title}
                    </div>
                    <div className="relative">
                        <div className="aspect-homepage">
                            <Image
                                src={image}
                                loading={loading}
                                options={options}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default WorkEntry
