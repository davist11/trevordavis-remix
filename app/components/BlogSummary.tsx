import useBlogSummary from '~/hooks/use-blog-summary'

type BlogSummaryProps = {
    typeHandle: string
    body: string
}

const BlogSummary = ({ typeHandle, body }: BlogSummaryProps) => {
    return (
        <div className="text -long">
            {typeHandle === 'externalArticle' ? (
                <div dangerouslySetInnerHTML={{ __html: body }}></div>
            ) : (
                <div
                    dangerouslySetInnerHTML={{
                        __html: useBlogSummary(body),
                    }}
                ></div>
            )}
        </div>
    )
}

export default BlogSummary
