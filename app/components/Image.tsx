import ImgixClient from '@imgix/js-core'
import Loader from './Loader'

const defaultOptions = {
    auto: 'compress,format',
    fit: 'crop',
}

type ImageProps = {
    src: string
    alt?: string
    options?: Record<string, string | number>
    loading?: 'eager' | 'lazy' | undefined
}

const Image = ({ src, options, loading = 'lazy', alt = '' }: ImageProps) => {
    const imagePath = new URL(`https:${src}`).pathname.replace(
        '/uploads/images',
        ''
    )

    // TODO figure out secure token?
    // secureURLToken: process.env.IMGIX_TOKEN,
    const imgixClient = new ImgixClient({
        // domain: `trevor-davis.imgix.net`,
        // domain: `images-trevor-davis.imgix.net`,
        domain: `assets-trevor-davis.imgix.net`,
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
                alt={alt}
                className="relative z-1"
                loading={loading}
                width={options?.w}
                height={options?.h}
            />
        </div>
    )
}

export default Image
