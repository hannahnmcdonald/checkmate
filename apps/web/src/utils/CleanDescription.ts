export default function cleanDescription(description: string) {
    return description.replace(/&#10;/g, '\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&mdash;/g, '—');;
}