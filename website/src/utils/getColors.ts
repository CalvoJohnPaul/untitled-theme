import colors from '@/content/colors.json';
import type {ColorPalette} from '@/types';
import {isPlainObject} from 'es-toolkit';
import {cacheLife, cacheTag} from 'next/cache';

export async function getColors(): Promise<ColorPalette[]> {
	'use cache';

	cacheLife('weeks');
	cacheTag('colors');

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
