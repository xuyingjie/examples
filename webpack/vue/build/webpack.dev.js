const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const mode = 'development';

module.exports = merge(common(mode), {
    devtool: 'cheap-module-eval-source-map',

    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        host: '0.0.0.0',
        // port: 8080,
        open: true, // autoOpenBrowser

        compress: true,
        hot: true,
        clientLogLevel: 'warning',

        contentBase: false, // since we use CopyWebpackPlugin.
        // publicPath: '/student/live-class/dist/production/',

        proxy: {

        },
    },

    plugins: [
        // https://webpack.js.org/guides/hot-module-replacement/
        new webpack.HotModuleReplacementPlugin(), // --hot
    ],
});
