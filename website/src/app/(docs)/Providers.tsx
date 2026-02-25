'use client';

import {SearchProvider} from '@/context/SearchContext';
import {usePathname} from 'next/navigation';
import {useEffect, useState, type ReactNode} from 'react';

export function Providers({children}: {children: ReactNode}) {
	const [search, setSearch] = useState('');
	const pathname = usePathname();

	useEffect(() => {
		pathname;
		return () => setSearch('');
	}, [pathname]);

	return (
		<SearchProvider value={[search, setSearch]}>{children}</SearchProvider>
	);
}
