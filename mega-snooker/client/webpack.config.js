const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const InterpolateHtmlPlugin = require('interpolate-html-plugin');

module.exports = {
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
    },
    //This property defines starting point of application (main entry)
    entry: "./src/index.js",
    //This property defines the file path and the file name which will be used for deploying the final production bundle
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index_bundle.js",
        publicPath: '/'
    },
    //Setup loaders
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                use: ['source-map-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.css$/i,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ],
                exclude: /node_modules/
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack'],
            }
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.svg'],
        modules: ['node_modules']
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Custom template",
            // Load a custom template (lodash by default)
            template: "./public/index.html",
            meta: {
                viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
                // Will generate: <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                "theme-color": "#4285f4",
                // Will generate: <meta name="theme-color" content="#4285f4">
            },
        }),
        new InterpolateHtmlPlugin({
            PUBLIC_URL: 'static' // can modify `static` to another name or get it from `process`
        })
    ],
};