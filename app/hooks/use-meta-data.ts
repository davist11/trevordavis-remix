interface MetaType {
    title?: string
    description?: string
}

export default function useMetaData({
    title,
    description,
}: MetaType): MetaType {
    const titleSuffix = 'Trevor Davis | Senior Software Engineer @ Dutchie'
    const combinedTitle = title ? `${title} | ${titleSuffix}` : titleSuffix

    return {
        title: combinedTitle,
        description,
    }
}
