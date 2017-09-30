let path = require('path');
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HotModuleReplacementPlugin = require('webpack').HotModuleReplacementPlugin;
let webpack = require('webpack');

const env = {
  dev: true,
  production: false,
};

module.exports = {
  entry: path.join(__dirname, '/public/src/app.jsx'),

  output: {
    filename: 'app.js',
    path: path.join(__dirname, './public/dist'),
    publicPath: '/',
  },

  module: {
    rules: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        include: path.join(__dirname, './public/src'),
        use: {
          loader: 'babel-loader',
          options: {
            babelrc: false,
            presets: [
              ['es2015', { modules: false }],
              'react',
            ],
          }
        }
      },
      {
        test: /\.(css|scss|sass)$/,
        loader: env.dev ? 'style!css!sass' : ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },

    ],
  },

  watch: env.dev,
  devtool: env.dev ? 'cheap-module-eval-source-map' : false,
  plugins: [
    ...env.dev ?
      [
        new HotModuleReplacementPlugin({
          multiStep: true
        }),
        // new HtmlWebpackPlugin({
        //   filename: 'index.html',
        //   template: path.join(__dirname, './public/src/index.html'),
        // }),
      ] : [
        new ExtractTextPlugin('[name].css'),
      ],
      new webpack.HotModuleReplacementPlugin(),
  ],
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },

};
