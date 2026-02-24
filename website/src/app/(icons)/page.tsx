import {getIcons} from '@/utils/getIcons';
import type {Metadata} from 'next';
import {Suspense} from 'react';
import {Items} from './Items';

export const metadata: Metadata = {
	title: 'Icons',
	openGraph: {
		title: 'Untitled Theme Icons',
		description: "Browse all of Untitled UI's icons",
		images: '/icons-opengraph-banner.png',
	},
};

export default async function Page() {
	const data = await getIcons({limit: 240});

	return (
		<Suspense>
			<Items data={data} />
		</Suspense>
	);
}
