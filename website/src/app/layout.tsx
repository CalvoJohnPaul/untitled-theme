import {Analytics} from '@vercel/analytics/next';
import clsx from 'clsx';
import type {Metadata} from 'next';
import {ThemeProvider} from 'next-themes';
import {Geist, Geist_Mono, Rammetto_One} from 'next/font/google';
import './globals.css';
import {Navbar} from './Navbar';

const body = Geist({
	weight: ['400', '500', '600', '700'],
	style: 'normal',
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-sans',
	preload: true,
	adjustFontFallback: true,
});

const heading = Rammetto_One({
	weight: '400',
	style: 'normal',
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-heading',
	preload: true,
	adjustFontFallback: true,
});

const mono = Geist_Mono({
	weight: ['400', '500', '600', '700'],
	style: 'normal',
	display: 'swap',
	subsets: ['latin'],
	variable: '--font-mono',
	preload: true,
	adjustFontFallback: true,
});

export const metadata: Metadata = {
	title: {
		default: 'Untitled Theme',
		template: '%s | Untitled Theme',
	},
	metadataBase: new URL('https://untitledui-icons.vercel.app'),
};

export default function RootLayout({children}: {children: React.ReactNode}) {
	return (
		<html
			lang="en"
			className={clsx(
				body.variable,
				heading.variable,
				mono.variable,
				'scroll-smooth',
				'scheme-light',
				'dark:scheme-dark',
			)}
			suppressHydrationWarning
		>
			<body className="min-h-dvh font-sans text-olive-700 dark:text-olive-300">
				<ThemeProvider
					attribute="class"
					defaultTheme="dark"
					enableSystem={false}
					enableColorScheme={false}
					disableTransitionOnChange={false}
				>
					<Navbar />
					{children}
				</ThemeProvider>
				<Analytics />
			</body>
		</html>
	);
}
