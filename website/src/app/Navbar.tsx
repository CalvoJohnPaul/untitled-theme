'use client';

import {ClientOnly, Menu, Portal} from '@ark-ui/react';
import {Menu04Icon} from '@untitled-theme/icons-react';
import clsx from 'clsx';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {ThemeToggle} from './ThemeToggle';

const linkCss = clsx(
	'block',
	'lg:text-sm',
	'font-mono',
	'font-medium',
	'aria-page:text-orange-500',
	'aria-page:dark:text-orange-400',
);

export function Navbar() {
	return (
		<header className="flex h-16 items-center gap-1 border-b px-4 lg:px-6">
			<Link href="/">
				<h1 className="font-heading text-gray-800 lg:text-xl dark:text-gray-50">
					UT
				</h1>
			</Link>
			<div className="grow"></div>
			<DesktopMenu />
			<ClientOnly>
				<MobileMenu />
			</ClientOnly>
		</header>
	);
}

function DesktopMenu() {
	const links = useLinks();

	return (
		<div className="hidden items-center gap-5 lg:flex">
			{links.map((link) => (
				<Link
					key={link.path}
					href={link.path}
					className={linkCss}
					aria-current={link.active ? 'page' : undefined}
					{...(link.external && {
						prefetch: false,
						target: '_blank',
						rel: 'noreferrer noopener',
					})}
				>
					{link.label}
				</Link>
			))}

			<ClientOnly>
				<div className="mx-2 h-4 border-l" />
				<ThemeToggle />
			</ClientOnly>
		</div>
	);
}

function MobileMenu() {
	const links = useLinks();

	return (
		<Menu.Root lazyMount>
			<Menu.Trigger className="flex size-9 items-center justify-center rounded border lg:hidden">
				<Menu04Icon />
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content className="z-dropdown w-48 ui-closed:animate-popover-out-bottom ui-open:animate-popover-in-bottom rounded-lg border bg-white dark:bg-olive-900">
						<Menu.ItemGroup className="space-y-1 px-4 py-3">
							{links.map((link) => (
								<Menu.Item key={link.path} value={link.path} asChild>
									<Link
										href={link.path}
										className={linkCss}
										aria-current={link.active ? 'page' : undefined}
										{...(link.external && {
											prefetch: false,
											target: '_blank',
											rel: 'noreferrer noopener',
										})}
									>
										{link.label}
									</Link>
								</Menu.Item>
							))}

							<Menu.Item value="github" asChild>
								<a
									href="https://github.com/CalvoJohnPaul/untitled-theme"
									className={linkCss}
								>
									Github
								</a>
							</Menu.Item>
						</Menu.ItemGroup>
						<ClientOnly>
							<Menu.Separator className="w-full border-t" />
							<Menu.ItemGroup className="px-4 py-3">
								<ThemeToggle />
							</Menu.ItemGroup>
						</ClientOnly>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
}

function useLinks() {
	const path = usePathname();
	const links: {
		path: string;
		label: string;
		active?: boolean;
		hidden?: boolean;
		external?: boolean;
	}[] = [
		{
			path: '/icons',
			label: 'Icons',
			active: path.startsWith('/icons'),
		},
		{
			path: '/colors',
			label: 'Colors',
			active: path.startsWith('/colors'),
		},
		{
			path: '/examples',
			label: 'Examples',
			active: path.startsWith('/examples'),
			hidden: process.env.NODE_ENV === 'production',
		},
		{
			path: 'https://github.com/CalvoJohnPaul/untitled-theme',
			label: 'Github',
			external: true,
		},
	];

	return links.filter((link) => !link.hidden);
}
