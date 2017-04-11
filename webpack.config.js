module.exports = {
    entry: ['babel-polyfill', './app/index.js'],
    output: {
        path: "dist/assets",
        filename: "bundle.js",
        sourceMapFilename: 'bundle.map'
    },
    devtool: '#source-map',
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel'],
                query: {
                    presets: ['env', 'stage-0', 'react']
                }
            }
        ]
    }
}