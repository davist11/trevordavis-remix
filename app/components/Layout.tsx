export const MetaBase = () => {
    return (
        <>
            <meta charSet="utf-8" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
            />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge,chrome=1" />
            <meta name="theme-color" content="#ffffff" />
        </>
    )
}

export const SkipLink = () => {
    return (
        <a
            href="#content"
            className="sr-only focus:sr-undo-absolute bg-orange text-blue-400"
        >
            <div className="p-8">Skip to Content</div>
        </a>
    )
}
