var webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-dev-server/client?http://localhost:3005',//开启websocket连接,需要url和端口号
        'webpack/hot/only-dev-server',//在浏览器里使用HMR
        './src/index.js'
    ],
    module: {
        loaders: [{
            test: /date-time\.js$/,
            loaders: ['muiLocal', 'babel']
        }, {
            test: /\.jsx?$/,
            loaders: ['react-hot', 'babel'],
            exclude: /node_modules/
        },{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }, {
            test: /\.less$/,
            loader: "style!css!less"
        }, {
            test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
            loader: 'file-loader'
        }, {
            test: /\.(jpg|png)$/,
            loader: 'file?name=[path][name].[hash].[ext]'
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js',
        libraryTarget: 'umd'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()//generate hot update chunks
    ]
};