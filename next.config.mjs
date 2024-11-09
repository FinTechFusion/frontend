import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default withNextIntl(nextConfig);