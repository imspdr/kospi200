/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const Dotenv = require('dotenv-webpack');
const deps = require('./package.json').dependencies;

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production' || process.env.NODE_ENV === 'production';
  const isWidgetTest = env && env.widgetTest === 'true';

  return {
    entry: isWidgetTest ? path.resolve(__dirname, 'src/test-widgets.tsx') : path.resolve(__dirname, 'src/index.tsx'),
    mode: isProduction ? 'production' : 'development',
    output: {
      path: path.resolve(__dirname, 'docs'),
      filename: 'bundle.js',
      publicPath: 'auto',
      clean: true,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              configFile: path.resolve(__dirname, 'babel.config.js'),
            },
          },
        },
      ],
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'kospi200',
        filename: 'remoteEntry.js',
        exposes: {
          './Top10Section': './src/exports/Top10Section',
          './TopGainerSection': './src/exports/TopGainerSection',
        },
        shared: {
          react: { singleton: true, requiredVersion: deps.react },
          'react-dom': { singleton: true, requiredVersion: deps['react-dom'] },
          '@emotion/react': { singleton: true, requiredVersion: deps['@emotion/react'] },
          '@emotion/styled': { singleton: true, requiredVersion: deps['@emotion/styled'] },
          '@tanstack/react-query': { singleton: true, requiredVersion: deps['@tanstack/react-query'] },
        },
      }),
      new HtmlWebpackPlugin({
        template: './public/index.html',
        favicon: path.resolve(__dirname, 'imspdr.png'),
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "public/404.html"),
        filename: "404.html",
      }),
      new CleanWebpackPlugin(),
      new Dotenv({ silent: true }),
    ],
    devServer: {
      port: 3200,
      hot: true,
      historyApiFallback: true,
      static: {
        directory: path.join(__dirname, 'public'),
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
  };
};
