var HtmlWebpackPlugin = require('html-webpack-plugin');
const MediaQueryPlugin = require('media-query-plugin');


module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    module: {
        rules: [{
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    MediaQueryPlugin.loader
                ]
            },
            {
                test: /\.(gif|svg|jpeg|png)$/,
                loader: "file-loader",
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'http://localhost:8081'
        })
    },
    resolve: {
        extensions: ['*', '.js', '.jsx', '.json', '.gif', '.png', '.jpeg', '.jpg'],
    },
}