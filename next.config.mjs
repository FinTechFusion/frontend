/** @type {import('next').NextConfig} */
const nextConfig = {
   productionBrowserSourceMaps: false,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'storage.fintechfusion.net',
            pathname: '/**', // Allows all paths
         },
      ],
   },
};

export default nextConfig;
