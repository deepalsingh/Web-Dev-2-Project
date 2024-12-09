/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
        return [
            { source: '/about', destination: '/pages/about' },
            { source: '/campaigns', destination: '/pages/campaigns' },
            { source: '/charities', destination: '/pages/charities' },
            { source: '/myfreeloop', destination: '/pages/myfreeloop' },
            { source: '/charities', destination: '/pages/charities' },
            // { source: '/', destination: '/' },

            // { source: '/pages/api/donations', destination: '/api/donations' },
            
        ];
    },
};
export default nextConfig;


