import icons from '@/assets/icons.json';
import type {PaginatedOptions} from '@/definitions';
import type {Icon} from '@/types';
import {clamp} from 'es-toolkit';
import {cacheLife, cacheTag} from 'next/cache';

export async function getIcons(options?: PaginatedOptions) {
	'use cache';

	const array = _getIcons();
	const offset = clamp(options?.offset ?? 0, 0, array.length);
	const limit = clamp(options?.limit ?? array.length, 1, array.length);

	cacheLife(`weeks`);
	cacheTag(`icons__${offset}:${limit}`);

	return array.slice(offset, offset + limit);
}

const _getIcons = () => icons as unknown as Icon[];
