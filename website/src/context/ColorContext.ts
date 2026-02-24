'use client';

import type {ColorPalette} from '@/types';
import {createContext} from '@ark-ui/react';

export const [ColorProvider, useColorContext] = createContext<ColorPalette>();
