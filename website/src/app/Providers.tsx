'use client';

import {SearchProvider} from '@/context/SearchContext';
import {ThemeProvider} from 'next-themes';
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
		<ThemeProvider
			attribute="class"
			defaultTheme="system"
			enableSystem={false}
			enableColorScheme={false}
			disableTransitionOnChange
		>
			<SearchProvider value={[search, setSearch]}>{children}</SearchProvider>
		</ThemeProvider>
	);
}
