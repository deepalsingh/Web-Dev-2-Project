/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            { source: '/about', destination: '/pages/about' },
            { source: '/mydonations', destination: '/pages/mydonations' },
            { source: '/charities', destination: '/pages/charities' },
        ];
    },
};
export default nextConfig;


