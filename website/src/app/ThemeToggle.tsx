'use client';

import {Switch} from '@ark-ui/react';
import {CloudMoonIcon, CloudSun01Icon} from '@untitled-theme/icons-react';
import {useTheme} from 'next-themes';

export function ThemeToggle() {
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
