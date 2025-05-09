const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = (env) => {
  if(env.development){
    return {
      mode: "development",
      entry: path.join(__dirname, "src/index.tsx"),
      devtool: "eval-source-map",
      output: {
        path: path.join(__dirname, "docs"),
        filename: "main.[contenthash].js",
        publicPath: "/kospi200/",
      },
      resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          "@src": path.resolve(__dirname, "src/"),
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src/index.ejs"),
          favicon: "imspdr.png",
          filename: "index.html",
          inject: 'body',
        }),
      ],
      module: {
        rules: [
          {
            test: /\.(tsx|ts|jsx|js)?$/,
            exclude: /node_modules/,
            use: ["babel-loader", "ts-loader"],
          },
          {
            test: /\.(css)?$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(md|txt)$/,
            use: 'raw-loader',
          },
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
              {
                loader: "@svgr/webpack",
              },
              {
                loader: "file-loader",
              },
              {
                loader: "url-loader",
              },
            ],
          },
          {
            test: /\.(gif|png|jpe?g|ttf|mp3|ogg|wav|woff|otf|jpg|ico)$/,
            type: "asset/resource",
          },
        ],
      },
      devServer: {
        historyApiFallback: {
          index: "/kospi200/"
        },
        host: "localhost",
        port: 4545,
      },
    }
  } else {  
    return {
      mode: "production",
      entry: path.join(__dirname, "src/index.tsx"),
      devtool: false,
      output: {
        path: path.join(__dirname, "docs"),
        filename: "main.[contenthash].js",
        publicPath: "/kospi200/",
      },
      resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        alias: {
          "@src": path.resolve(__dirname, "src/"),
        },
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src/index.ejs"),
          favicon: "imspdr.png",
          filename: "index.html",
          inject: 'body',
        }),
        new HtmlWebpackPlugin({
          template: path.resolve(__dirname, "src/404.html"),
          filename: "404.html",
        }),
        new CopyWebpackPlugin({
          patterns: [
            {
              from: path.resolve(__dirname, 'public/kospi200'), 
              to: path.resolve(__dirname, 'docs/'), 
            },
          ],
        }),
      ],
      module: {
        rules: [
          {
            test: /\.(tsx|ts|jsx|js)?$/,
            exclude: /node_modules/,
            use: ["babel-loader", "ts-loader"],
          },
          {
            test: /\.(css)?$/,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.s[ac]ss$/i,
            use: ["style-loader", "css-loader"],
          },
          {
            test: /\.(md|txt)$/,
            use: 'raw-loader',
          },
          {
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: [
              {
                loader: "@svgr/webpack",
              },
              {
                loader: "file-loader",
              },
              {
                loader: "url-loader",
              },
            ],
          },
          {
            test: /\.(gif|png|jpe?g|ttf|mp3|ogg|wav|woff|otf|jpg|ico)$/,
            type: "asset/resource",
          }
        ],
      },
    };
  }
};
