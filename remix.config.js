/**
 * @type {import('@remix-run/dev/config').AppConfig}
 */
module.exports = {
    appDirectory: 'app',
    assetsBuildDirectory: 'public/build',
    publicPath: '/build/',
    serverBuildDirectory: 'netlify/functions/server/build',
    devServerPort: 8002,
    ignoredRouteFiles: ['.*'],
    serverDependenciesToBundle: [
        /^@marsidev\/react-turnstile/,
        /^@marsidev\/react-turnstile\/.*/,
    ],
}
