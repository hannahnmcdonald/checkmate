export default function normalizeArrayField(field: any): any[] {
    if (Array.isArray(field)) return field;
    if (field?.value) return field.value;
    return [];
}
