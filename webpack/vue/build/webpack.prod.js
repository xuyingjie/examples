const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => {
    const mode = env.mode;

    const uglifyOptions = mode === 'preview' ? {} : {
        // parallel: true,
        uglifyOptions: {
            compress: {
                drop_console: true
            }
        }
    };

    return merge(common(mode), {
        mode: 'production',
        devtool: false,

        // https://webpack.js.org/configuration/optimization/#optimization-minimize
        optimization: {
            minimizer: [
                new UglifyJsPlugin(uglifyOptions),
                new OptimizeCSSAssetsPlugin({})
            ]
        },

        externals: {
            'vue': 'Vue',
            'echarts': 'echarts',
            'lottie-web': 'lottie',
            '@antv/f2': 'F2',
        },

        plugins: [

        ]
    });
};
