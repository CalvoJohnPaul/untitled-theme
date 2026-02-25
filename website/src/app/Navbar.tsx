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
	const pathname = usePathname();

	return (
		<div className="hidden items-center gap-3 lg:flex">
			<div className="flex gap-4">
				<Link
					href="/icons"
					className={linkCss}
					aria-current={pathname.startsWith('/icons') ? 'page' : undefined}
				>
					Icons
				</Link>
				<Link
					href="/colors"
					className={linkCss}
					aria-current={pathname.startsWith('/colors') ? 'page' : undefined}
				>
					Colors
				</Link>
				<a
					href="https://github.com/CalvoJohnPaul/untitled-theme"
					target="_blank"
					rel="noreferrer noopener"
					className={linkCss}
				>
					Github
				</a>
			</div>
			<ClientOnly>
				<div className="mx-2 h-4 border-l" />
				<ThemeToggle />
			</ClientOnly>
		</div>
	);
}

function MobileMenu() {
	const pathname = usePathname();

	return (
		<Menu.Root lazyMount>
			<Menu.Trigger className="flex size-9 items-center justify-center rounded border lg:hidden">
				<Menu04Icon />
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content className="z-dropdown w-48 ui-closed:animate-popover-out-bottom ui-open:animate-popover-in-bottom rounded-lg border bg-white dark:bg-olive-900">
						<Menu.ItemGroup className="space-y-1 px-4 py-3">
							<Menu.Item value="icons" asChild>
								<Link
									href="/icons"
									className={linkCss}
									aria-current={
										pathname.startsWith('/icons') ? 'page' : undefined
									}
								>
									Icons
								</Link>
							</Menu.Item>
							<Menu.Item value="colors" asChild>
								<Link
									href="/colors"
									className={linkCss}
									aria-current={
										pathname.startsWith('/colors') ? 'page' : undefined
									}
								>
									Colors
								</Link>
							</Menu.Item>
							<Menu.Item value="github" asChild>
								<a
									href="https://github.com/CalvoJohnPaul/untitled-theme"
									target="_blank"
									rel="noreferrer noopener"
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
