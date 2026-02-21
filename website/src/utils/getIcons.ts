import icons from '@/content/icons.json';
import type {Icon} from '@/types';
import {cacheLife, cacheTag} from 'next/cache';

export async function getIcons(): Promise<Icon[]> {
	'use cache';

	cacheLife('weeks');
	cacheTag('icons');

	return icons as unknown as Icon[];
}
