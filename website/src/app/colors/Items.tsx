'use client';

import type {ColorPalette} from '@/types';
import {useState} from 'react';
import {Empty} from '../Empty';
import {Searchbar} from '../Searchbar';
import {Item} from './Item';
import {ItemProvider} from './ItemContext';

export function Items({data}: {data: ColorPalette[]}) {
	const [search, setSearch] = useState('');

	const colors = data.filter((c) => {
		return c.parent
			.join('')
			.replace(/-/g, '')
			.toLowerCase()
			.includes(search.replace(/\s+/g, '').toLowerCase());
	});

	if (colors.length <= 0) return <Empty />;

	return (
		<>
			<Searchbar value={search} onChange={setSearch} className="mb-5 lg:mb-8" />
			<div className="flex flex-col gap-4 font-mono lg:gap-6">
				{colors.map((color, idx) => (
					<ItemProvider key={idx} value={color}>
						<Item />
					</ItemProvider>
				))}
			</div>
		</>
	);
}
