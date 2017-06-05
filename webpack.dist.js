var fs = require('fs')
var path = require('path')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin"); // 单独打包CSS
var _filename = 'tntui';
if(process.argv[4] && process.argv[4] == "-p"){
    _filename = 'tntui-min'
}
module.exports = {
    entry: {
        'main': [path.join(__dirname, 'lib/index.js')]
    },
    externals: {'react': 'React', 'react-dom': 'ReactDOM'},
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: 'dist/',
        library: 'tntui',
        libraryTarget: 'umd',
        filename: `${_filename}.js`
    },
    module: {
        loaders: [{
            test: /\.js[x]?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel'
        },
        { 
            test: /\.css$/, 
            loader: ExtractTextPlugin.extract("style-loader", "css-loader!postcss-loader")
        },
        { 
            test: /\.less$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader?strictMath&noIeCompat!postcss-loader') 
        },
        { 
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader!postcss-loader') 
        },
         /*,{
            test: /\.scss$/,
            loader: 'style!css!sass!postcss'
        }, {
            test: /\.less$/,
            loader: 'style!css!less?strictMath&noIeCompat!postcss'
        }, {
            test: /\.css$/, // Only .css files
            loader: 'style!css!postcss' // Run both loaders
        }, */
        {
            test: /\.(jp[e]?g|png|gif|svg)$/,
            loader: 'url-loader?limit=8192'
        }]
    },
    postcss:[require('autoprefixer')],
    resolve: {
        extensions: ['', '.js', '.jsx', '.json', '.less','.css','.scss']
    },
    babel: {
        presets: ['es2015', 'stage-0','react'],
        plugins: ['transform-runtime']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            //压缩打包的文件
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin(`${_filename}.css`, {allChunks: true}), // 单独打包CSS
    ]
};
