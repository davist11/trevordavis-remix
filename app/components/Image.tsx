import ImgixClient from '@imgix/js-core'

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

    return <img src={imgixSrc} alt="" loading={loading} />
}

export default Image
