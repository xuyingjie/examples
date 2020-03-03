const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (env = {}) => ({
    mode: env.prod ? 'production' : 'development',
    devtool: env.prod ? '' : 'cheap-module-eval-source-map',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/'
    },
    resolve: {
        alias: {
            // this isn't technically needed, since the default `vue` entry for bundlers
            // is a simple `export * from '@vue/runtime-dom`. However having this
            // extra re-export somehow causes webpack to always invalidate the module
            // on the first HMR update and causes the page to reload.
            'vue': '@vue/runtime-dom',
            '@': path.resolve(__dirname, './src'),
        }
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: 'vue-loader'
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { hmr: !env.prod }
                    },
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ],
    devServer: {
        inline: true,
        hot: true,
        stats: 'minimal',
        contentBase: __dirname,
        overlay: true,
        port: 3000,
        // proxy: {
        //     '/api': {
        //         target: 'https://',
        //         pathRewrite: { '^/api': '' },
        //         changeOrigin: true,
        //         secure: false,
        //         headers: {
        //             referer: 'http://'
        //         }
        //     }
        // }
    }
})