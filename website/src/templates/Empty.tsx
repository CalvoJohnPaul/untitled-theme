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
			<div className="mt-10 lg:mt-12">
				<h3 className="text-center font-heading lg:text-lg">
					{props.title ?? 'No records found'}
				</h3>
				<p className="flex justify-center gap-1 text-olive-500 text-sm lg:text-base">
					<span>{props.description ?? 'No record matches your search.'}</span>
					<a
						href="https://github.com/CalvoJohnPaul/untitled-theme/issues/new"
						className="flex items-center gap-1 font-medium text-orange-600 text-sm underline underline-offset-2 dark:text-orange-400"
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
