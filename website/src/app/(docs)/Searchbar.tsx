'use client';

import {useSearchContext} from '@/context/SearchContext';
import {SearchLgIcon, XCloseIcon} from '@untitled-theme/icons-react';

export function Searchbar() {
	const [search, setSearch] = useSearchContext();

	return (
		<div className="relative mb-5 lg:mb-8">
			<SearchLgIcon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-olive-300 dark:text-olive-400" />

			<input
				value={search}
				onChange={(e) => {
					setSearch(e.target.value);
				}}
				placeholder="Search"
				className="h-12 w-full rounded border bg-transparent px-12 py-2 outline-none"
			/>

			{search.length > 0 && (
				<button
					type="button"
					className="absolute top-1/2 right-4 -translate-y-1/2"
					tabIndex={-1}
					onClick={() => {
						setSearch('');
					}}
				>
					<XCloseIcon className="size-4" />
				</button>
			)}
		</div>
	);
}
