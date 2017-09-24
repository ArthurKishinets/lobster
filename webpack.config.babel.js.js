import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const defaultEnv = {
  dev: true,
  production: false,
};

export default (env = defaultEnv) => ({
  //console.log('env ', env);

    entry: './public/src/app.jsx',

    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, './public/dist'),
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
            fallbackLoader: 'style-loader',
            loader: 'css!sass?sourceMap'
          })
        },
  
      ],
    },
    watch: true,
    plugins: [
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
});