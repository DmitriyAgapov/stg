/** @type {import('next').NextConfig} */
const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const nextConfig = {

  images: {
    domains: ['localhost', '127.0.0.1'],
  },
  i18n: {
    locales: ['ru', 'en'],
    defaultLocale: 'ru',
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: '/catalog/series/:slug',
        destination: '/series/:slug', // The :path parameter is used here so will not be automatically passed in the query
      },
        {
        source: '/catalog/category/:slug',
        destination: '/category/:slug', // The :path parameter is used here so will not be automatically passed in the query
      },
          {
        source: '/:url',
        destination: '/page/:url', // The :path parameter is used here so will not be automatically passed in the query
      }


    ]
  },
  // webpack: (config) => {
  //   config.plugins.push(
  //       new CopyPlugin({
  //         patterns: [
  //           {
  //             from: 'node_modules/leaflet/dist/images',
  //             to: path.resolve(__dirname, 'public', 'leaflet', 'images')
  //           },
  //         ],
  //       }),
  //   )
  //   return config
  // }
}

module.exports = nextConfig
