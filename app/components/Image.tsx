import useImgix from '~/hooks/use-imgix'
import Loader from './Loader'

type ImageProps = {
    src: string
    alt?: string
    options?: Record<string, string | number>
    loading?: 'eager' | 'lazy' | undefined
}

const Image = ({ src, options, loading = 'lazy', alt = '' }: ImageProps) => {
    const imgixSrc = useImgix(src, options)

    return (
        <div className="relative">
            <Loader />

            {imgixSrc && (
                <img
                    src={imgixSrc}
                    alt=""
                    className="relative z-1"
                    loading={loading}
                    width={options?.w}
                    height={options?.h}
                />
            )}
        </div>
    )
}

export default Image
