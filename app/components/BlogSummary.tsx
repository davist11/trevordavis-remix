import useBlogSummary from '~/hooks/use-blog-summary'

type BlogSummaryProps = {
    typeHandle: string
    body: string
}

const BlogSummary = ({ typeHandle, body }: BlogSummaryProps) => {
    const summary =
        typeHandle === 'externalArticle' ? body : useBlogSummary(body)

    return (
        <div className="text -long">
            <div dangerouslySetInnerHTML={{ __html: summary }}></div>
        </div>
    )
}

export default BlogSummary
