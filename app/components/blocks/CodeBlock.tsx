import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'

import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import javascript from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript'
import css from 'react-syntax-highlighter/dist/cjs/languages/prism/css'
import php from 'react-syntax-highlighter/dist/cjs/languages/prism/php'
import nightOwl from 'react-syntax-highlighter/dist/cjs/styles/prism/night-owl'

SyntaxHighlighter.registerLanguage('css', css)
SyntaxHighlighter.registerLanguage('jsx', jsx)
SyntaxHighlighter.registerLanguage('javascript', javascript)
SyntaxHighlighter.registerLanguage('php', php)

const langLookup: Record<string, string> = {
    css: 'css',
    javascript: 'javascript',
    jsx: 'jsx',
    php: 'php',
}

export type CodeBlockType = {
    id: string
    typeHandle: 'code'
    code: string
    lang: string
}

type CodeBlockProps = {
    block: CodeBlockType
}

const CodeBlock = ({ block }: CodeBlockProps) => {
    return (
        <div className="my-40 code-block">
            <SyntaxHighlighter
                language={langLookup[block.lang] ?? 'text'}
                style={nightOwl}
            >
                {block.code}
            </SyntaxHighlighter>
        </div>
    )
}

export default CodeBlock
