/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            { source: '/about', destination: '/pages/about' },
            { source: '/donate', destination: '/pages/donate' },
            { source: '/charities', destination: '/pages/charities' },
        ];
    },
};
export default nextConfig;


