'use client';

import {createContext} from '@ark-ui/react';
import type {Dispatch, SetStateAction} from 'react';

export const [SearchProvider, useSearchContext] =
	createContext<[string, Dispatch<SetStateAction<string>>]>();
