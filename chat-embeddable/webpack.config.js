const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

module.exports = (env) => {
  let environment = 'local';

  if(env.prod) {
    environment = 'production';
  } else if (env.isAmplify) {
    environment = 'amplify';
  }

  return {
    entry: './app/index.tsx',
    mode: env.prod ? 'production' : 'development',
    devServer: env.prod ? {} : {
      static: {
        directory: path.join(__dirname, 'webpack'),
      },
      hot: true,
      port: 8080,
      open: true
    },
    output: {
      path: path.resolve(__dirname, './webpack'),
      filename: 'chatbot.bundle.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(?:js|mjs|cjs)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                ['@babel/preset-env']
              ]
            }
          }
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: 'asset',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@': path.resolve(__dirname, '.')
      },
    },
    plugins: [
      !env.prod && (!env.isAmplify) && new HtmlWebpackPlugin({
         template: './index.html',
      }),
      new webpack.DefinePlugin({
        'process.env.ENVIRONMENT': JSON.stringify(environment),
      }),
      new Dotenv({
        path: `./.env.${env.isAmplify ? 'production' : 'local'}`,
      }),
    ].filter(Boolean),
  };
}