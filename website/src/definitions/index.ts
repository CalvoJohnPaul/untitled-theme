import * as z from 'zod';

export const PaginatedOptionsDefinition = z.object({
	offset: z.union([z.number(), z.coerce.number()]).optional().nullable(),
	limit: z.union([z.number(), z.coerce.number()]).optional().nullable(),
});

export type PaginatedOptions = z.infer<typeof PaginatedOptionsDefinition>;
