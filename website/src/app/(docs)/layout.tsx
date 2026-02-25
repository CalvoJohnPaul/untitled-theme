import {Providers} from './Providers';
import {Searchbar} from './Searchbar';

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<Providers>
			<main className="mx-auto max-w-5xl p-4 md:p-8 lg:p-12">
				<Searchbar />
				{children}
			</main>
		</Providers>
	);
}
