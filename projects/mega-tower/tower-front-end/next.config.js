const withPlugins = require('next-compose-plugins')
const withImages = require('next-images')
const isProd = process.env.NODE_ENV === 'production'

module.exports = withPlugins([[withImages]],
    {
        env: {
            customKey: 'my-value',
        },
    reactStrictMode: true,
    optimizeFonts: false,
    // images: {
    //   loader: 'imgix',
    //     path: 'http://localhost:3000',
    // },
    // assetPrefix: isProd ?'/towerWebsite':'',
    // publicRuntimeConfig: {
    //     backgroundBaseUrl:isProd ?'../public/':'/',
    // }
} )
