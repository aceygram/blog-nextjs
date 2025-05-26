// next.config.js

const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  transpilePackages: [
    'sanity',
    '@sanity/client',
    '@sanity/icons',
    'framer-motion',
  ],

  // ✅ Simplified image config to fix "Invalid src prop" error
  images: {
    domains: ['cdn.sanity.io'],
  },

  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        {
          key: 'Content-Security-Policy',
          value: `img-src 'self' cdn.sanity.io data:`,
        },
      ],
    },
  ],

  webpack: (config) => {
    config.resolve.alias['styled-components'] = require.resolve('styled-components');
    return config;
  },

  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
