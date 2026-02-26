'use client';

import {ClientOnly, Menu, Portal, Switch} from '@ark-ui/react';
import {
	CloudMoonIcon,
	CloudSun01Icon,
	Menu04Icon,
} from '@untitled-theme/icons-react';
import clsx from 'clsx';
import {useTheme} from 'next-themes';
import Link from 'next/link';
import {usePathname} from 'next/navigation';

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

function ThemeToggle() {
	const {theme: theme_, setTheme} = useTheme();
	const theme = theme_ ?? 'dark';

	return (
		<Switch.Root
			checked={theme === 'dark'}
			onCheckedChange={() => {
				setTheme(theme === 'dark' ? 'light' : 'dark');
			}}
			className="shrink-0"
		>
			<Switch.Control className="block h-8 w-14 cursor-pointer rounded-full bg-olive-200 p-1 dark:bg-olive-800/50">
				<Switch.Thumb className="flex size-6 ui-checked:translate-x-6 items-center justify-center rounded-full bg-orange-500 text-orange-50 shadow-sm transition-transform duration-200">
					<Switch.Context>
						{(api) =>
							api.checked ? (
								<CloudMoonIcon className="size-3.5" />
							) : (
								<CloudSun01Icon className="size-3.5" />
							)
						}
					</Switch.Context>
				</Switch.Thumb>
			</Switch.Control>
			<Switch.HiddenInput />
		</Switch.Root>
	);
}
