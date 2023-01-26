import type { TextBlockType } from './blocks/TextBlock'
import type { CodeBlockType } from './blocks/CodeBlock'

import CodeBlock from './blocks/CodeBlock'
import TextBlock from './blocks/TextBlock'

type BodyBlock = TextBlockType | CodeBlockType

type BodyBlocksProps = {
    blocks: BodyBlock[]
}

const BodyBlocks = ({ blocks }: BodyBlocksProps) => {
    return (
        <>
            {blocks.map((block) =>
                block.typeHandle === 'code' ? (
                    <CodeBlock key={block.id} block={block} />
                ) : (
                    <TextBlock key={block.id} block={block} />
                )
            )}
        </>
    )
}

export default BodyBlocks
