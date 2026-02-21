import type {Icon} from '@/types';
import {createContext} from '@ark-ui/react';

export const [ItemProvider, useItemContext] = createContext<Icon>();
