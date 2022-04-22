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
                    <div className="p-8 text-sm">{title}</div>
                    <div className="relative">
                        <div
                            className="bg-indigo text-white-default
                            p-16 rounded-full
                            absolute z-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                            opacity-0 duration-200 transition-opacity group-hover:opacity-100"
                        >
                            Visit Site
                        </div>

                        <div className="absolute bg-blue-600 inset-0 z-1 opacity-0 duration-200 transition-opacity group-hover:opacity-50"></div>

                        <div className="aspect-homepage">
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
                    <div className="p-8 text-sm">{title}</div>
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
