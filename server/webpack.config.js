var path = require('path');

var webpack = require('webpack');

var entry_path = __dirname;

var definePlugin = new webpack.DefinePlugin({
    __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true'))
});

//var uglyPlugin = new webpack.optimize.UglifyJsPlugin({
//    compress: {
//        warnings: false
//    }
//})

module.exports = {
    //入口文件
    entry: [
        "babel-polyfill",
        entry_path + "/src/index.js"
        // entry_path + "/src/m.js"

    ],
    output: {
        path: entry_path + "/public/",
        //path: entry_path + '/myapp/public/build',
        filename: "bundle.js"
        // filename: "shape_editor.all.js"
    },
    // devtool: "source-map",
    node: {
        fs: "empty"
    },
    plugins: [definePlugin],
    resolve: {
        extensions: ['', '.webpack.js', '.web.js', '.js','.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx', '.js', '.jsx', '.json']
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    presets: ['env', 'react', 'antd']
                }
            },
            {
                test: /\.json$/,
                // We could restrict using json-loader only on .json files in the
                // node_modules/pixi.js directory, but the ability to load .json files
                // could be useful elsewhere in our app, so I usually don't.
                //include: path.resolve(__dirname, 'node_modules/pixi.js'),
                loader: 'json'
            },

//            { test: /\.less$/, loader: 'style-loader!css-loader!less-loader' }, // use ! to chain loaders
//            { test: /\.css$/, loader: 'style-loader!css-loader' },
            {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'} // inline base64 URLs for <=8k images, direct URLs for the rest
        ]
    }
};
