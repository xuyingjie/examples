/**
 * https://webpack.js.org/concepts/
 * https://vue-loader.vuejs.org/zh/
 * https://vue-loader.vuejs.org/zh/guide/pre-processors.html#typescript
 * 
 * https://github.com/michael-ciniawsky/postcss-load-config
 * 
 * (env, argv) => argv.mode
 */

const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
const merge = require('webpack-merge'); //merge webpack config

const VueLoaderPlugin = require('vue-loader/lib/plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, argv) => {
    const mode = argv.mode;
    const devMode = mode === 'development';

    // 获取项目路径
    const projectDir = argv.define;
    const projectPath = path.join(__dirname, projectDir);

    const entries = require(`${projectPath}/entries.config.js`);

    const styleLoaders = [
        devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
        'css-loader',
        'postcss-loader'
    ];

    const common = {
        entry: multiEntry(entries, projectDir),

        output: {
            path: path.join(__dirname, 'dist', projectDir),
            filename: 'js/[name].bundle.js',
            chunkFilename: 'js/[name].[chunkhash].bundle.js',
        },

        resolve: {
            extensions: ['.js', '.vue', '.json'],
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve(projectPath, 'src'),
                '@common': path.resolve('common'),
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

            // copy custom static assets
            // new CopyWebpackPlugin([
            //     {
            //         from: path.resolve(projectPath, './static'),
            //         to: '',
            //         ignore: ['.*']
            //     }
            // ]),

            // 生成 multi html
            ...multiHtml(entries, projectDir).map(config => new HtmlWebpackPlugin(config)),

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

    const dev = {
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
    };

    const build = {
        devtool: false,

        // https://webpack.js.org/configuration/optimization/#optimization-minimize
        optimization: {
            minimizer: [
                new UglifyJsPlugin({
                    uglifyOptions: {
                        compress: {
                            drop_console: true
                        }
                    }
                }),
                new OptimizeCSSAssetsPlugin({})
            ]
        },

        externals: {
            'vue': 'Vue',
            'axios': 'axios',
            'echarts': 'echarts',
            'lottie-web': 'lottie',
            '@antv/f2': 'F2',
        },

        plugins: [
            // 删除输出文件夹
            new CleanWebpackPlugin([projectDir], {
                root: path.join(__dirname, 'dist'),
            }),

            // new BundleAnalyzerPlugin(),
        ]
    };

    return merge(common, devMode ? dev : build);
};


// multi entry
function multiEntry(entries, projectDir) {
    const config = {
        // vendor: ['vue']
    };

    return entries.reduce((accumulator, currentValue) => {
        const entry = currentValue.entry.map(item => './' + path.join(projectDir, item));
        accumulator[currentValue.name] = entry;
        return accumulator;
    }, config);
}

// 生成 html-webpack-plugin 的配置数组
function multiHtml(entries, projectDir) {
    return entries.map(item => ({
        title: item.title,
        filename: `${item.name}.html`,
        template: path.join(projectDir, item.template),
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
