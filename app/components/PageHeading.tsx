type PageHeadingProps = {
    children: React.ReactNode
}

const PageHeading = ({ children }: PageHeadingProps) => {
    return (
        <h1 className="text-xl leading-snug font-serif antialiased md:text-jb">
            {children}
        </h1>
    )
}

export default PageHeading
