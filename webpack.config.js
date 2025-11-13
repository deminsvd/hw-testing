//import { merge } from 'webpack-merge';
//import commonConfig from './webpack.common.config.js';
//import productionConfig from './webpack.production.config.js';
//import developmentConfig from './webpack.development.config.js';

//export default (env, args) => {
//  switch (args.mode) {
//    case 'development':
//      return merge(commonConfig, developmentConfig);
//    case 'production':
//      return merge(commonConfig, productionConfig);
//    default:
//      throw new Error('No matching configuration was found!');
//  }
//};

import ESLintPlugin from 'eslint-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';

export default {
  mode: 'development',
  devServer: {
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          MiniCSSExtractPlugin.loader,
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new MiniCSSExtractPlugin(),
    new ESLintPlugin({
      extensions: ['js'],
      exclude: 'node_modules',
    }),
  ],
};