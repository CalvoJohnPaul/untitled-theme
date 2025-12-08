import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
	output: 'export',
	images: {
		formats: ['image/avif', 'image/webp'],
		minimumCacheTTL: 31536000,
	},
};

export default nextConfig;
