import colors from '@/assets/colors.json';
import type {PaginatedOptions} from '@/definitions';
import type {ColorPalette} from '@/types';
import {clamp, isPlainObject} from 'es-toolkit';
import {cacheLife, cacheTag} from 'next/cache';

export async function getColors(options?: PaginatedOptions) {
	'use cache';

	const array = _getColors();
	const offset = clamp(options?.offset ?? 0, 0, array.length);
	const limit = clamp(options?.limit ?? array.length, 1, array.length);

	cacheLife(`weeks`);
	cacheTag(`colors__${offset}:${limit}`);

	return array.slice(offset, offset + limit);
}

function _getColors() {
	const l: ColorPalette[] = [];

	function fn(o: Record<string, any>, p: string[] = []) {
		for (const k in o) {
			const v = o[k];

			if (isPlainObject(v)) {
				fn(v, [...p, k]);
			} else {
				const i =
					p.length <= 0
						? -1
						: l.findIndex((e) => e.parent?.join() === p.join());

				if (i >= 0) {
					l[i] = {
						...l[i],
						children: {
							...l[i].children,
							[k]: v,
						},
					};
				} else {
					l.push({
						parent: p,
						children: {[k]: v},
					});
				}
			}
		}
	}

	fn(colors);

	return l;
}
