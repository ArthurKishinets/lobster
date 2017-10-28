import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import { HotModuleReplacementPlugin } from 'webpack';

const defaultEnv = {
  dev: true,
  production: false,
};

export default (env = defaultEnv) => {
  console.log('env.dev', env);

  return {
    entry: {
      "one": path.join(__dirname, '/public/src/app.jsx'),
      "two": path.join(__dirname, '/public/src/vendor.jsx'),
    },

    output: {
      filename: '[name].js',
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
    devtool: env.dev ? 'eval-source-map' : false,
    plugins: [
      ...env.dev ? 
      [
        new HotModuleReplacementPlugin({
        multiStep: false
      }),

      ] : [
        new ExtractTextPlugin('[name].css'),
      ],
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, './public/src/index.html'),
      }),
    ],
    resolveLoader: {
      moduleExtensions: ['-loader']
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devServer: {
      hot: env.dev,
      host: 'localhost',
      port: 8081,
      publicPath: "/",
      contentBase: path.join(__dirname, "./public"),
      historyApiFallback: true,
      
      proxy: {
        "/api": {
          target: "http://localhost:3000",
          pathRewrite: { "^/api": "" }
        }
      }
    },  

  };

};