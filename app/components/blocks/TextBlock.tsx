import InnerHTML from 'dangerously-set-html-content'

export type TextBlockType = {
    id: string
    typeHandle: 'text'
    text: string
}

type TextBlockProps = {
    block: TextBlockType
}

const TextBlock = ({ block }: TextBlockProps) => {
    return <InnerHTML html={block.text} className="text -long" />
}

export default TextBlock
