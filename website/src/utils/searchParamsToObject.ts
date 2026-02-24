export function searchParamsToObject(subject: URLSearchParams) {
	const result: Record<string, string> = {};

	for (const [key, value] of subject.entries()) {
		result[key] = value;
	}

	return result;
}
