'use client';

import {useControllableState} from '@radix-ui/react-use-controllable-state';
import {SearchLgIcon, XCloseIcon} from '@untitled-theme/icons-react';
import clsx from 'clsx';

export interface SearchbarProps {
	value?: string;
	defaultValue?: string;
	onChange?: (value: string) => void;
	className?: string;
}

export function Searchbar(props: SearchbarProps) {
	const [value, setValue] = useControllableState({
		prop: props.value,
		defaultProp: props.defaultValue ?? '',
		onChange: props.onChange,
	});

	return (
		<div className={clsx(props.className, 'relative')}>
			<SearchLgIcon className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-300 dark:text-neutral-400" />

			<input
				type="search"
				value={value}
				onChange={(e) => {
					setValue(e.target.value);
				}}
				placeholder="Search"
				className="h-12 w-full appearance-none rounded border border-neutral-300 bg-transparent px-12 py-2 outline-none dark:border-neutral-800"
			/>

			{value.length > 0 && (
				<button
					type="button"
					className="absolute top-1/2 right-4 -translate-y-1/2"
					tabIndex={-1}
					onClick={() => {
						setValue('');
					}}
				>
					<XCloseIcon className="size-4" />
				</button>
			)}
		</div>
	);
}
