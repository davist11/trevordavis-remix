export type TextBlockType = {
    id: string
    typeHandle: 'text'
    text: string
}

type TextBlockProps = {
    block: TextBlockType
}

const TextBlock = ({ block }: TextBlockProps) => {
    return (
        <div
            className="text -long"
            dangerouslySetInnerHTML={{ __html: block.text }}
        ></div>
    )
}

export default TextBlock
