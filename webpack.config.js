const webpack = require("webpack");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require("autoprefixer");

const nodeEnv = process.env.NODE_ENV || "development";
const isProduction = nodeEnv === "production";

const sourcePath = path.join(__dirname, "./src");
const buildPath = path.join(__dirname, "./build");
const imgPaths = [path.join(__dirname, "./public/img")];

const plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    minChunks: Infinity,
    filename: "vendor-[hash].js"
  }),
  new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify(nodeEnv)
    },
    __DEV__: nodeEnv === "development"
  }),
  new webpack.NamedModulesPlugin(),
  new HtmlWebpackPlugin({
    template: "index.template.ejs",
    path: buildPath,
    filename: "index.html"
  }),
  new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [
        autoprefixer({
          browsers: ["last 2 versions", "> 5%", "Explorer >= 10", "Safari >= 7"]
        })
      ],
      context: sourcePath
    }
  })
];

// Common rules
const rules = [
  {
    test: /\.(js|jsx)$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
      presets: [
        "es2015",
        "stage-0",
        "react",
        [
          "env",
          {
            targets: {
              browsers: [
                "last 2 versions",
                "> 5%",
                "Explorer >= 10",
                "safari >= 7"
              ]
            }
          }
        ]
      ],
      plugins: [
        "transform-decorators-legacy",
        "transform-class-properties",
        "react-hot-loader/babel"
      ]
    }
  },
  {
    test: /\.(png|gif|jpg)$/,
    include: imgPaths,
    use: "url-loader?limit=20480&name=assets/[name]-[hash].[ext]"
  }
];

if (isProduction) {
  // Production plugins
  plugins.push(
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true
      },
      output: {
        comments: false
      }
    }),
    new ExtractTextPlugin("style-[hash].css")
  );

  // Production rules
  rules.push(
    {
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: [
          "css-loader?modules&importLoaders=1&localIdentName=[name]_[hash:base64:5]",
          "postcss-loader"
        ]
      })
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: "file-loader?name=public/styles/fonts/[name].[ext]"
    }
  );
} else {
  // Development plugins
  plugins.push(new webpack.HotModuleReplacementPlugin());

  // Development rules
  rules.push(
    {
      test: /\.css$/,
      use: [
        "style-loader",
        "css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]",
        "postcss-loader"
      ]
    },
    {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      use: "file-loader?name=public/styles/fonts/[name].[ext]"
    }
  );
}
module.exports = {
  devtool: isProduction ? "eval" : "source-map",
  context: sourcePath,
  entry: {
    js: ["react-hot-loader/patch", "./index.js"],
    vendor: ["babel-polyfill", "react-dom", "react"]
  },
  output: {
    path: buildPath,
    publicPath: "/",
    filename: "app-[hash].js",
    chunkFilename: "[name].bundle.js"
  },
  module: {
    rules
  },
  resolve: {
    extensions: [
      ".webpack-loader.js",
      ".web-loader.js",
      ".loader.js",
      ".js",
      ".jsx"
    ],
    modules: [path.resolve(__dirname, "./node_modules"), sourcePath],
    alias: {}
  },
  plugins,
  devServer: {
    historyApiFallback: true,
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    host: "localhost",
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: "\u001b[32m"
      }
    }
  }
};
