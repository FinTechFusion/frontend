import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const isProduction = process.env.NODE_ENV === 'production';

export default withNextIntl({
   reactStrictMode: false,
   productionBrowserSourceMaps: false,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: "ff-storage-2.s3.amazonaws.com",
            pathname: '/**',
         },
      ],
   },
   async rewrites() {
      const apiUrl = isProduction
         ? process.env.NEXT_PUBLIC_API_URL_PROD
         : process.env.NEXT_PUBLIC_API_URL_DEV;
      return [
         {
            source: '/api/:path*',
            destination: `${apiUrl}/:path*`, // Proxy to backend
         },
      ];
   },
});