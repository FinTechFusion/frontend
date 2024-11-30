import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

export default withNextIntl({
   reactStrictMode: false,
   productionBrowserSourceMaps: false,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'storage.fintechfusion.net',
            pathname: '/**',
         },
      ],
   },
   async rewrites() {
      return [
         {
            source: '/api/:path*',
            destination: 'http://api:8000/:path*', // Proxy to backend
         },
      ];
   },
});
