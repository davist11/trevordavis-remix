import ImgixClient from '@imgix/js-core'
import Loader from './Loader'

const defaultOptions = {
    auto: 'format',
    fit: 'crop',
}

type ImageProps = {
    src: string
    options?: Record<string, string | number>
    loading?: 'eager' | 'lazy' | undefined
}

const Image = ({ src, options, loading = 'lazy' }: ImageProps) => {
    const imagePath = new URL(`https:${src}`).pathname.replace(
        '/uploads/images',
        ''
    )

    // TODO figure out secure token?
    // secureURLToken: process.env.IMGIX_TOKEN,
    const imgixClient = new ImgixClient({
        domain: `trevor-davis.imgix.net`,
    })

    const imgixSrc = imgixClient.buildURL(imagePath, {
        ...defaultOptions,
        ...options,
    })

    return (
        <div className="relative">
            <Loader />

            <img
                src={imgixSrc}
                alt=""
                className="relative z-1"
                loading={loading}
                width={options?.w}
                height={options?.h}
            />
        </div>
    )
}

export default Image
