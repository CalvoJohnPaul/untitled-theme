export const searchParamsToObject = (subject: URLSearchParams) =>
	subject.entries().reduce<Record<string, string>>((o, [k, value]) => {
		o[k] = value;
		return o;
	}, {});
