import {getColors} from '@/utils/getColors';
import type {Metadata} from 'next';
import {Suspense} from 'react';
import {Items} from './Items';

export const metadata: Metadata = {
	title: 'Colors',
	openGraph: {
		title: 'Untitled Theme Icons',
		description: "Browse all of Untitled UI's icons",
		images: '/icons-opengraph-banner.png',
	},
};

export default async function Page() {
	const colors = await getColors();

	return (
		<Suspense>
			<Items data={colors} />
		</Suspense>
	);
}
