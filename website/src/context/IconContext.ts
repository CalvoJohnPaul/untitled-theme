'use client';

import type {Icon} from '@/types';
import {createContext} from '@ark-ui/react';

export const [IconProvider, useIconContext] = createContext<Icon>();
