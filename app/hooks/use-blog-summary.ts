export default function useBlogSummary(
    html: string,
    limit: number = 400
): string {
    const summary = html.replace(/(<([^>]+)>)/gi, '').trim()

    return summary.length > limit
        ? `${summary.substring(0, limit).trim()}…`
        : summary
}
