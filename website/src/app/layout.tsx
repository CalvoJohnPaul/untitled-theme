import {Analytics} from '@vercel/analytics/next';
import clsx from 'clsx';
import type {Metadata} from 'next';
import {ThemeProvider} from 'next-themes';
import {Geist, Geist_Mono, Rammetto_One} from 'next/font/google';
import type {WebSite, WithContext} from 'schema-dts';
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

const siteName = 'Untitled Theme';
const siteDescription =
	'Open-source Untitled UI icons and color tokens for modern product interfaces.';
const siteUrl = 'https://untitled-theme.xyz';
const ogImage = '/icons-opengraph-banner.png';

export const metadata: Metadata = {
	title: {
		default: siteName,
		template: `%s | ${siteName}`,
	},
	description: siteDescription,
	applicationName: siteName,
	metadataBase: new URL(siteUrl),
	alternates: {
		canonical: '/',
	},
	openGraph: {
		title: siteName,
		description: siteDescription,
		url: '/',
		siteName,
		type: 'website',
		locale: 'en_US',
		images: [
			{
				url: ogImage,
				alt: `${siteName} preview image`,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: siteName,
		description: siteDescription,
		images: [ogImage],
	},
	keywords: [
		'Untitled UI icons',
		'icon library',
		'design tokens',
		'color palette',
		'react icons',
		'svelte icons',
		'solid icons',
	],
	verification: {
		google: 'YBU87GjlKIWAHyFNy6ZXE802gBNhU2acCfQ-8s1tlQ0',
	},
};

const jsonLd: WithContext<WebSite> = {
	'@context': 'https://schema.org',
	'@type': 'WebSite',
	name: siteName,
	description: siteDescription,
	url: siteUrl,
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
				<script
					type="application/ld+json"
					dangerouslySetInnerHTML={{
						__html: JSON.stringify(jsonLd).replace(/</g, '\\u003c'),
					}}
				/>
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
