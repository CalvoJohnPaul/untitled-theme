'use client';

import {IconProvider, useIconContext} from '@/context/IconContext';
import {useSearchContext} from '@/context/SearchContext';
import {Empty} from '@/templates/Empty';
import type {Icon} from '@/types';
import {Clipboard, Dialog, Portal, Tabs} from '@ark-ui/react';
import {CheckIcon, Copy01Icon, XCloseIcon} from '@untitled-theme/icons-react';
import clsx from 'clsx';
import {useEffect, useState} from 'react';

export function Items(props: {data: Icon[]}) {
	const [search] = useSearchContext();
	const [data, setData] = useState(props.data);

	useEffect(() => {
		if (process.env.NODE_ENV === 'development') return;

		const controller = new AbortController();

		fetch(`/api/icons?offset=${props.data.length}`, {
			signal: controller.signal,
		})
			.then((res) => res.json())
			.then((next) => setData((prev) => [...prev, ...next]))
			.catch(() => []);

		return () => {
			controller.abort();
		};
	}, [props.data.length]);

	useEffect(() => {
		return () => {
			setData(props.data);
		};
	}, [props.data]);

	const result = data.filter((icon) => {
		return icon.name
			.toLowerCase()
			.includes(search.replace(/\s+/g, '').toLowerCase());
	});

	if (result.length <= 0) return <Empty />;

	return (
		<>
			<p className="mb-3 text-sm">{data.length} icons found</p>
			<div className="grid grid-cols-6 gap-2 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 xl:grid-cols-14">
				{result.map((icon, idx) => (
					<IconProvider key={idx} value={icon}>
						<Item />
					</IconProvider>
				))}
			</div>
		</>
	);
}

function Item() {
	const icon = useIconContext();
	const tabs = [
		{
			label: 'Html',
			value: 'Html',
			content: icon.snippets.html,
		},
		{
			label: 'React',
			value: 'React',
			content: icon.snippets.react,
		},
		{
			label: 'Svelte',
			value: 'Svelte',
			content: icon.snippets.svelte,
		},
		{
			label: 'Solid',
			value: 'Solid',
			content: icon.snippets.solid,
		},
	];

	return (
		<Dialog.Root lazyMount unmountOnExit>
			<Dialog.Trigger className="flex aspect-square icon:size-8 cursor-pointer items-center justify-center rounded border icon:stroke-[1.66667] p-2 hover:bg-olive-50 dark:hover:bg-olive-800/10">
				<span
					dangerouslySetInnerHTML={{
						__html: icon.html,
					}}
				/>
			</Dialog.Trigger>
			<Portal>
				<Dialog.Backdrop className="fixed inset-0 z-overlay ui-closed:animate-fade-out ui-open:animate-fade-in bg-olive-900/50 backdrop-blur-sm dark:bg-olive-900/50" />
				<Dialog.Positioner>
					<Dialog.Content className="fixed right-0 bottom-0 z-modal w-full ui-closed:animate-slide-down ui-open:animate-slide-up border-t bg-white p-4 md:p-6 lg:p-8 dark:bg-olive-900">
						<Dialog.CloseTrigger className="absolute top-3 right-3 cursor-pointer p-1">
							<XCloseIcon />
						</Dialog.CloseTrigger>

						<div className="w-full max-w-full lg:w-160 lg:max-w-160 [&_.shiki]:max-h-[50vh]">
							<div>
								<div
									className="w-fit rounded border p-3"
									dangerouslySetInnerHTML={{__html: icon.html}}
								/>

								<div className="mt-5 flex max-h-dvh w-fit items-center gap-5 overflow-y-auto rounded bg-olive-100 px-3 py-2 dark:bg-olive-800/25">
									<code className="font-mono">&lt;{icon.name}&nbsp;/&gt;</code>
									<Clipboard.Root className="flex" value={`<${icon.name} />`}>
										<Clipboard.Trigger className="p-1">
											<Clipboard.Indicator
												copied={
													<CheckIcon className="size-5 text-emerald-500 dark:text-emerald-400" />
												}
											>
												<Copy01Icon className="size-5" />
											</Clipboard.Indicator>
										</Clipboard.Trigger>
									</Clipboard.Root>
								</div>

								<Tabs.Root className="mt-5" defaultValue={tabs[0].value}>
									<Tabs.List className="flex gap-4">
										{tabs.map((tab) => (
											<Tabs.Trigger
												key={tab.value}
												value={tab.value}
												className="ui-selected:text-indigo-600 dark:ui-selected:text-indigo-400"
											>
												{tab.label}
											</Tabs.Trigger>
										))}
									</Tabs.List>

									{tabs.map((tab) => (
										<Tabs.Content
											key={tab.value}
											value={tab.value}
											className="relative mt-5 text-sm"
										>
											<Clipboard.Root
												value={tab.content?.raw ?? ''}
												className="absolute top-4 right-4 flex items-center justify-center rounded-lg p-0.5"
											>
												<Clipboard.Trigger className="p-0.5">
													<Clipboard.Indicator
														copied={
															<CheckIcon className="size-5 text-emerald-500 dark:text-emerald-400" />
														}
													>
														<Copy01Icon className="size-5" />
													</Clipboard.Indicator>
												</Clipboard.Trigger>
											</Clipboard.Root>

											<div
												className={clsx(
													'[&_.shiki]:p-4',
													'[&_.shiki]:h-full',
													'[&_.shiki]:rounded',
													'[&_.shiki]:overflow-auto',
													'[&_.shiki]:border',
													'[&_.shiki]:',
													'[&_.shiki]:',
													'[&_.shiki]:font-mono',
													'[&_.shiki]:bg-(--shiki-light-bg)',
													'[&_.shiki]:text-(--shiki-light)',
													'[&_.shiki]:dark:bg-(--shiki-dark-bg)',
													'[&_.shiki]:dark:text-(--shiki-dark)',
													'[&_.shiki_span]:bg-(--shiki-light-bg)',
													'[&_.shiki_span]:text-(--shiki-light)',
													'[&_.shiki_span]:dark:bg-(--shiki-dark-bg)',
													'[&_.shiki_span]:dark:text-(--shiki-dark)',
												)}
												dangerouslySetInnerHTML={{
													__html: tab.content?.html ?? '',
												}}
											/>
										</Tabs.Content>
									))}
								</Tabs.Root>
							</div>
						</div>
					</Dialog.Content>
				</Dialog.Positioner>
			</Portal>
		</Dialog.Root>
	);
}
