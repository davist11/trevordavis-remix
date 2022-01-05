interface MetaType {
    title?: string | null
    description?: string | null
}

export const getMeta = ({ title = null, description = null }: MetaType): MetaType => {
    const titleSuffix = 'Trevor Davis | Front-End Development Technical Director @ Viget'
    const combinedTitle = title ? `${title} | ${titleSuffix}` : titleSuffix

    return {
        title: combinedTitle,
        description
    }
}
