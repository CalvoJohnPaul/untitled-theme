import {getColors} from '@/utils/getColors';
import type {Metadata} from 'next';
import {Suspense} from 'react';
import {Items} from './Items';

export const metadata: Metadata = {
	title: 'Colors',
	description: "Browse all of Untitled UI's color tokens.",
	alternates: {
		canonical: '/colors',
	},
	openGraph: {
		title: 'Untitled Theme Colors',
		description: "Browse all of Untitled UI's color tokens",
		images: '/icons-opengraph-banner.png',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'Untitled Theme Colors',
		description: "Browse all of Untitled UI's color tokens.",
		images: ['/icons-opengraph-banner.png'],
	},
};

export default async function Page() {
	const colors = await getColors({limit: 12});

	return (
		<Suspense>
			<Items data={colors} />
		</Suspense>
	);
}
