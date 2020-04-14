const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = process.env.NODE_ENV === 'production'

const optimization = () => {
    const config = {};

    if (isProd) {
        config.minimizer = [
            new OptimizeCssAssetsPlugin(), // for css
            new TerserPlugin() // for js
        ]
    }
    return config
}

const filename = ext => isDev ? '[name].'+ext : '[name].[hash].'+ext

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        main: './index.js',
        analytics: './components/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
    },
    resolve: {
        extensions: ['.js', '.json'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
        },
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
            // minify: {
            //     collapseWhitespace: isProd
            // }
        }),
        new MiniCssExtractPlugin({
            filename: filename('css')
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, 'src/favicon.png'),
            to: path.resolve(__dirname, 'dist'),
        }]),

    ],
    module: {
        rules: [{
                test: /\.css$/,
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        hmr: isDev,
                        reloadAll: true
                    }
                }, 'css-loader']
            }, {
                test: /\.(png|jpeg|svg)$/,
                use: ['file-loader']
            }, {
                test: /\.(ttf|woff|woff2|eot)$/,
                use: ['file-loader']
            }, {
                test: /\.xml$/,
                use: ['xml-loader']
            }

        ]
    }
}