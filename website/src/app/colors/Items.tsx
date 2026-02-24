'use client';

import {ColorProvider, useColorContext} from '@/context/ColorContext';
import {useSearchContext} from '@/context/SearchContext';
import type {ColorPalette} from '@/types';
import {Clipboard} from '@ark-ui/react';
import {CheckIcon, Copy01Icon} from '@untitled-theme/icons-react';
import {useEffect, useState} from 'react';
import {Empty} from '../Empty';

export function Items(props: {data: ColorPalette[]}) {
	const [search] = useSearchContext();
	const [data, setData] = useState(props.data);

	useEffect(() => {
		const controller = new AbortController();

		fetch(`/api/colors?offset=${props.data.length}`, {
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

	const result = data.filter((c) => {
		return c.parent
			.join('')
			.replace(/-/g, '')
			.toLowerCase()
			.includes(search.replace(/\s+/g, '').toLowerCase());
	});

	if (result.length <= 0) return <Empty />;

	return (
		<div className="flex flex-col gap-4 font-mono lg:gap-6">
			{result.map((color, idx) => (
				<ColorProvider key={idx} value={color}>
					<Item />
				</ColorProvider>
			))}
		</div>
	);
}

function Item() {
	const {parent, children} = useColorContext();
	const name = parent.join('.');
	const pairs = Object.entries(children);

	return (
		<div className="group flex flex-col gap-2">
			{parent.length > 0 && (
				<div className="flex items-center gap-2">
					<div className="font-medium">{name}</div>

					<Clipboard.Root
						value={JSON.stringify({[name]: children}, null, 2)}
						className="flex transition-transform duration-150 focus-within:scale-100 group-hover:scale-100 lg:scale-0"
					>
						<Clipboard.Trigger className="cursor-pointer">
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
			)}

			<div className="grid grid-cols-6 gap-1 md:grid-cols-12 lg:gap-2">
				{pairs.map(([k, v], idx_1) => (
					<div key={idx_1}>
						<div
							className="aspect-square bg-(--bg)"
							style={{
								['--bg' as string]: v,
							}}
						/>
						<div className="mt-2 hidden text-sm lg:block">{k}</div>
						<div className="hidden text-neutral-700 text-xs leading-none lg:block dark:text-neutral-500">
							{v}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
