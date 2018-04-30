var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: {
    'multianalytics': './src/index.js',
    'multianalytics.min': './src/index.js'
  },
  output: {
    path: "./dist",
    filename: "[name].js",
    libraryTarget: 'commonjs2'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      include: /\.min\.js$/,
      compress: {
        warnings: false
      }
    }),
  ],
  resolve: {
    extensions: [ '', '.js', '.json' ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [ 'env', 'stage-2' ]
        },
        plugins: ["transform-object-assign"],
        exclude: /node_modules/
      }
    ]
  }
}
