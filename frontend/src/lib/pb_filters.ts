export function filterIn(field: string, values: string[]): string {
	return filterConcat('||', values.map(v => `${field}="${v}"`));
}

export function filterConcat(sep: string, filters: string[]): string {
	return filters.map(f => `(${f})`).join(` ${sep} `);
}
