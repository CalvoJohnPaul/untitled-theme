import {getIcons} from '@/utils/getIcons';
import type {Metadata} from 'next';
import {Suspense} from 'react';
import {Items} from './Items';

export const metadata: Metadata = {
	title: 'Icons',
	openGraph: {
		title: 'Untitled Theme Colors',
		description: "Browse all of Untitled UI's colors",
		images: '/colors-opengraph-banner.png',
	},
};

export default async function Page() {
	const icons = await getIcons();

	return (
		<Suspense>
			<Items data={icons} />
		</Suspense>
	);
}
