import type {NextConfig} from 'next';

export default {
	output: 'export',
	images: {
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 31536000,
	},
	reactCompiler: true,
} satisfies NextConfig;
