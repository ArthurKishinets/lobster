import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
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
        
      ],
    }
};