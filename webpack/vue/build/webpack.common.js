/**
 * https://webpack.js.org/concepts/
 * https://vue-loader.vuejs.org/zh/
 * https://vue-loader.vuejs.org/zh/guide/pre-processors.html#typescript
 * 
 * (env, argv) => argv.mode
 */

const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const entries = require('./entries.config.js');
const rootPath = path.join(__dirname, '../');

module.exports = (mode) => {

    const outputPath = `./dist/${mode}`;
    const devMode = mode === 'development';

    const styleLoaders = [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
    ];

    return {
        mode,

        entry: multiEntry(entries),

        output: {
            path: path.resolve(rootPath, outputPath),
            filename: 'js/[name].bundle.js',
            chunkFilename: 'js/[name].[chunkhash].bundle.js',
        },

        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
            }
        },

        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.css$/,
                    use: styleLoaders
                },
                {
                    test: /\.scss$/,
                    use: [
                        ...styleLoaders,
                        'sass-loader' // compiles Sass to CSS
                    ]
                },
                {
                    test: /\.sass$/,
                    use: [
                        ...styleLoaders,
                        {
                            loader: 'sass-loader',
                            options: {
                                indentedSyntax: true
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'img/[name].[hash:7].[ext]'
                    }
                },
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'media/[name].[hash:7].[ext]'
                    }
                },
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        name: 'fonts/[name].[hash:7].[ext]'
                    }
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify(mode)
                }
            }),

            // 把 css scss 等规则用于 .vue style
            new VueLoaderPlugin(),

            // 删除输出文件夹
            new CleanWebpackPlugin(),

            // copy custom static assets
            new CopyWebpackPlugin([
                {
                    from: path.resolve(rootPath, './static'),
                    to: '',
                    ignore: ['.*']
                }
            ]),

            // 生成 multi html
            ...multiHtml(entries).map(config => new HtmlWebpackPlugin(config)),

            // 生成 css 文件
            new MiniCssExtractPlugin({
                // Options similar to the same options in webpackOptions.output
                // both options are optional
                filename: 'css/[name].css',
                chunkFilename: 'css/[name].[chunkhash].css'
            }),
        ],

        optimization: {
            // https://webpack.js.org/plugins/split-chunks-plugin/
            // https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli-service/lib/config/app.js
            splitChunks: {
                chunks: 'all',
                name: 'chunk-common',
                minChunks: 2,
                // cacheGroups: {
                //     common: {
                //         name: 'chunk-common',
                //         minChunks: 2,
                //         priority: -10,
                //         chunks: 'initial',
                //         reuseExistingChunk: true
                //     }
                // }
            },
        }
    };
};


// multi entry
function multiEntry(entries) {
    const config = {
        // vendor: ['vue']
    };

    return entries.reduce((accumulator, currentValue) => {
        accumulator[currentValue.name] = currentValue.entry;
        return accumulator;
    }, config);
}

// 生成 html-webpack-plugin 的配置数组
function multiHtml(entries) {
    return entries.map(item => ({
        title: item.title,
        filename: `${item.name}.html`,
        template: item.template,
        inject: true,
        // favicon: './src/assets/favicon.png',
        description: item.description,

        minify: {
            'removeComments': true,
            'collapseWhitespace': true,
            'removeAttributeQuotes': true
        },
        hash: true,
        chunks: ['chunk-common', item.name],
        chunksSortMode: 'dependency',
    }));
}
