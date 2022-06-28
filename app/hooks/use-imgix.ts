import ImgixClient from '@imgix/js-core'

const defaultOptions = {
    auto: 'format',
    fit: 'crop',
}

export default function useImgix(
    src: string,
    options: Record<string, string | number> | undefined
): string | null {
    if (!src) {
        return null
    }

    const imagePath = new URL(`https:${src}`).pathname.replace(
        '/uploads/images',
        ''
    )

    // TODO figure out secure token?
    // secureURLToken: process.env.IMGIX_TOKEN,
    const imgixClient = new ImgixClient({
        domain: `trevor-davis.imgix.net`,
    })

    return imgixClient.buildURL(imagePath, {
        ...defaultOptions,
        ...options,
    })
}
