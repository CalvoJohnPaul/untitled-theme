import icons from '@/app/assets/icons.json';
import type {Metadata} from 'next';
import {Searchbar} from '../Searchbar';
import {IconsGallery} from './IconsGallery';
import type {Icon} from './types';

export const dynamic = 'force-static';

export const metadata: Metadata = {
	title: 'Icons',
	openGraph: {
		title: 'Untitled Theme Colors',
		description: "Browse all of Untitled UI's colors",
		images: '/colors-opengraph-banner.png',
	},
};

export default async function Page() {
	return (
		<>
			<Searchbar className="mb-5 lg:mb-8" />
			<IconsGallery icons={icons as unknown as Icon[]} />
		</>
	);
}
