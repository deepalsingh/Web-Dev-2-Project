/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            { source: '/about', destination: '/pages/about' },
            { source: '/mydonations', destination: '/pages/mydonations' },
            { source: '/charities', destination: '/pages/charities' },
            { source: '/donations/:id', destination: '/api/donations/:id' },
        ];
    },
};
export default nextConfig;


