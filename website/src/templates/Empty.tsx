import {LinkExternal02Icon} from '@untitled-theme/icons-react';
import clsx from 'clsx';

export function Empty(props: {
	title?: string;
	description?: string;
	className?: string;
}) {
	return (
		<div
			role="alert"
			aria-live="polite"
			className={clsx(props.className, 'py-12 lg:py-16')}
		>
			<div className="pr-4 lg:pr-8">
				<div className="relative mx-auto size-32 rounded-full bg-olive-100 lg:size-48 dark:bg-olive-800">
					<div className="absolute top-1/2 left-1/2 size-26 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white lg:size-40 dark:bg-olive-900" />
					<div className="absolute right-0 bottom-0 h-8 w-3 -rotate-45 rounded-full bg-olive-100 lg:h-12 lg:w-4 dark:bg-olive-800" />
				</div>
			</div>

			<div className="mt-10 lg:mt-12">
				<h3 className="text-center font-bold lg:text-lg">
					{props.title ?? 'No records found'}
				</h3>
				<p className="flex justify-center gap-1 text-olive-500 text-sm lg:text-base">
					<span>{props.description ?? 'No record matches your search.'}</span>
					<a
						href="https://github.com/CalvoJohnPaul/untitled-theme/issues/new"
						className="flex items-center gap-1 font-medium text-indigo-600 underline underline-offset-2 dark:text-indigo-400"
						target="_blank"
						rel="noopener noreferrer"
					>
						Create an issue <LinkExternal02Icon className="size-4" />
					</a>
				</p>
			</div>
		</div>
	);
}
