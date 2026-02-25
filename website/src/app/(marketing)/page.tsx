import {getColors, getColorsCount} from '@/utils/getColors';
import {getIcons, getIconsCount} from '@/utils/getIcons';
import type {Metadata} from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'Untitled Theme',
	openGraph: {
		title: 'Untitled Theme',
		description: 'Open-source icons and color tokens for modern interfaces.',
		images: '/icons-opengraph-banner.png',
	},
};

export default async function Page() {
	const [icons, colors, iconsCount, colorsCount] = await Promise.all([
		getIcons({limit: 24}),
		getColors({limit: 3}),
		getIconsCount(),
		getColorsCount(),
	]);

	return (
		<main className="mx-auto max-w-5xl p-4 md:p-8 lg:p-12">
			<div className="space-y-8 lg:space-y-10">
				<section className="rounded-lg border p-6 lg:p-8">
					<p className="font-mono text-olive-500 text-xs uppercase tracking-widest dark:text-olive-400">
						Untitled Theme
					</p>
					<h1 className="mt-3 max-w-2xl font-heading text-2xl text-olive-900 md:text-3xl dark:text-olive-100">
						Design tokens and icon packs in one place.
					</h1>
					<p className="mt-4 max-w-2xl text-olive-600 dark:text-olive-400">
						Browse the full icon library and explore color palettes used across
						the ecosystem.
					</p>

					<div className="mt-6 flex flex-wrap gap-3">
						<Link
							href="/icons"
							className="rounded-md border bg-olive-100 px-4 py-2 font-medium text-olive-900 text-sm hover:bg-olive-200 dark:bg-olive-800/40 dark:text-olive-100 dark:hover:bg-olive-800"
						>
							Browse Icons
						</Link>
						<Link
							href="/colors"
							className="rounded-md border px-4 py-2 font-medium text-olive-700 text-sm hover:bg-olive-50 dark:text-olive-300 dark:hover:bg-olive-800/40"
						>
							Explore Colors
						</Link>
					</div>
				</section>

				<section className="grid gap-3 md:grid-cols-2">
					<div className="rounded-lg border p-5">
						<p className="font-mono text-olive-500 text-xs uppercase tracking-wide dark:text-olive-400">
							Icons
						</p>
						<p className="mt-2 font-heading text-2xl text-olive-900 dark:text-olive-100">
							{iconsCount.toLocaleString()}
						</p>
						<p className="mt-1 text-sm">
							SVG icons with React, Svelte, and Solid snippets.
						</p>
						<div className="mt-4 grid grid-cols-6 gap-1 lg:grid-cols-8">
							{icons.map((icon) => (
								<div
									key={icon.name}
									className="flex aspect-square icon:size-6 items-center justify-center rounded border p-2 lg:icon:size-7"
								>
									<span
										dangerouslySetInnerHTML={{
											__html: icon.html,
										}}
									/>
								</div>
							))}
						</div>
					</div>

					<div className="rounded-lg border p-5">
						<p className="font-mono text-olive-500 text-xs uppercase tracking-wide dark:text-olive-400">
							Color Palettes
						</p>
						<p className="mt-2 font-heading text-2xl text-olive-900 dark:text-olive-100">
							{colorsCount.toLocaleString()}
						</p>
						<p className="mt-1 text-sm">
							Organized token groups ready to copy and reuse.
						</p>
						<div className="mt-4 grid grid-cols-6 gap-1 lg:grid-cols-8">
							{colors
								.flatMap(({children}) => Object.values(children).slice(4))
								.map((color) => {
									const cssVars: Record<string, string> = {
										'--bg': color,
									};

									return (
										<div
											key={color}
											className="aspect-square rounded border p-1.5"
											style={cssVars}
										>
											<div className="h-full rounded-xs bg-(--bg)"></div>
										</div>
									);
								})}
						</div>
					</div>
				</section>

				<section>
					<div className="rounded-lg border p-5">
						<p className="font-mono text-olive-500 text-xs uppercase tracking-wide dark:text-olive-400">
							Quick Install
						</p>
						<p className="mt-2 text-sm">
							Start with the packages you need, then browse full docs for each.
						</p>

						<div className="mt-4 space-y-2 font-mono text-sm">
							<div className="rounded border bg-olive-50 px-3 py-2 dark:bg-olive-800/25">
								npm install{' '}
								<span className="font-medium text-orange-600 dark:text-orange-400">
									@untitled-theme/icons-react
								</span>{' '}
								<span className="opacity-25">{'// svelte or solid'}</span>
							</div>
							<div className="rounded border bg-olive-50 px-3 py-2 dark:bg-olive-800/25">
								npm install{' '}
								<span className="font-medium text-orange-600 dark:text-orange-400">
									@untitled-theme/colors
								</span>
							</div>
						</div>
					</div>
				</section>
			</div>
		</main>
	);
}
