const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')

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

const babelOptions = (preset) => {
    const opts = {
        presets: [
            '@babel/preset-env',
        ]
    }

    if (preset) {
        opts.presets.push(preset)
    }

    return opts
}

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions()
    }];

    // if (isDev) {
    //     loaders.push('eslint-loader')
    // }

    return loaders
}

const plugins = () => {
    const base = [
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
        }])
    ]

    if (isProd) {
        base.push(new BundleAnalyzerPlugin())
    }

    return base
}

const filename = ext => isDev ? '[name].' + ext : '[name].[hash].' + ext

module.exports = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        // main: ['@babel/polyfill', './index.js'],
        main: ['@babel/polyfill', './index.jsx'],
        analytics: './components/analytics.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: filename('js'),
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.json'],
        alias: {
            '@components': path.resolve(__dirname, 'src/components'),
        },
    },
    optimization: optimization(),
    devServer: {
        port: 4200,
        hot: isDev
    },
    devtool: isDev ? 'source-map' : '',
    plugins: plugins(),
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
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders()

            },
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-typescript')
                }

            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                loader: {
                    loader: 'babel-loader',
                    options: babelOptions('@babel/preset-react')
                }

            },

        ]
    }
}