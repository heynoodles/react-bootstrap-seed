var webpack = require('webpack');
var path = require('path');
var extend = require('extend');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var f2eci = require('./f2eci.json');
//?presets[]=stage-0,presets[]=react,presets[]=es2015
var setExternals = function () {
    var cortexConfig = require('./cortex.json');
    var externals = {};
    var deps = cortexConfig.dependencies;


    for (var item in deps) {
        externals[item] = 'require("' + item + '")';
        console.dir(deps[item]);
    }

    return externals;
};
var webpackConfig = {
    entry: {
        app: path.join(__dirname, 'src/index.js')
        //vendor: ['moment', 'react', "react-bootstrap", 'redux', 'react-redux']
    },
    output: {
        //libraryTarget: 'umd',
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: f2eci.urlPrefix
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                exclude: /node_modules/
            }, {
                test: /\.(css|less)$/,
                loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
                //loader: "style-loader!css-loader!less-loader"
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
                loader: 'file?name=fonts/[name].[ext]'
            },
            {
                test: /\.(jpg|png)$/,
                loader: 'file?name=[path][name].[ext]'
            }
        ]
    },
    externals: setExternals(),
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin(path.join('page.css'))
        //new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js')
    ]
};


module.exports = webpackConfig;