'use client';

import type {Icon} from '@/types';
import {useState} from 'react';
import {Empty} from '../Empty';
import {Searchbar} from '../Searchbar';
import {Item} from './Item';
import {ItemProvider} from './ItemContext';

export function Items({data}: {data: Icon[]}) {
	const [search, setSearch] = useState('');
	const icons = data.filter((icon) => {
		return icon.name
			.toLowerCase()
			.includes(search.replace(/\s+/g, '').toLowerCase());
	});

	if (icons.length <= 0) return <Empty />;

	return (
		<>
			<Searchbar value={search} onChange={setSearch} className="mb-5 lg:mb-8" />
			<div>
				<p className="mb-3 text-sm">{icons.length} icons found</p>
				<div className="grid grid-cols-6 gap-2 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12">
					{icons.map((icon, idx) => (
						<ItemProvider key={idx} value={icon}>
							<Item />
						</ItemProvider>
					))}
				</div>
			</div>
		</>
	);
}
