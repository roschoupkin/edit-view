'use strict';

const path = require('path');
const webpack = require('webpack');

const HTMLWebpackPlugin = require('html-webpack-plugin');
const InlineChunkHtmlPlugin = require('react-dev-utils/InlineChunkHtmlPlugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const safePostCssParser = require('postcss-safe-parser');
const TerserPlugin = require('terser-webpack-plugin');

const SRC_PATH = path.resolve(__dirname, 'src');
const BUILD_PATH = path.resolve(__dirname, 'dist');
const DEV_PATH = path.resolve(__dirname, 'template');

const getConfig = (mode, entry = [], rules = [], plugins = []) => {
  const IS_DEVELOPMENT = mode !== 'production';
  return {
    context: SRC_PATH,
    entry: {
      index: entry,
    },
    output: {
      path: BUILD_PATH,
      filename: IS_DEVELOPMENT ? 'js/[name].js' : '[name].[fullhash:8].js',
      chunkFilename: IS_DEVELOPMENT ? 'js/[name].chunk.js' : '[name].[fullhash:8].chunk.js',
      publicPath:  IS_DEVELOPMENT ? '/' : '/static/',
    },
    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
      alias: {
        lodash: 'lodash-es',
      },
    },
    module: {
      strictExportPresence: true,
      rules: [
        ...rules,
        {
          parser: {
            requireEnsure: false
          }
        },
        {
          test: /\.[t|j]sx?$/,
          include: [SRC_PATH, DEV_PATH],
          use: [
            {
              loader: 'ts-loader',
            },
          ],
        },
        {
          test: /\.css$/,
          include: [SRC_PATH, DEV_PATH],
          use: [MiniCSSExtractPlugin.loader, 'css-loader'],
        },
      ],
    },
    plugins: [
      ...plugins,
      new webpack.EnvironmentPlugin({
        APP_ENV: mode
      }),
      new MiniCSSExtractPlugin({
        filename: IS_DEVELOPMENT ? 'css/[name].css' : 'css/[name].[fullhash:8].css',
        chunkFilename: IS_DEVELOPMENT ? 'css/[name].chunk.css' : 'css/[name].[fullhash:8].chunk.css',
      }),
      new CaseSensitivePathsPlugin(),
    ],
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              beautify: false,
              comments: false,
            },
          },
          parallel: true,
          extractComments: true,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            parser: safePostCssParser,
            map: false,
          },
        }),
      ],
      splitChunks: {
        chunks: 'all',
      },
      runtimeChunk: {
        name: entrypoint => `runtime-${entrypoint.name}`,
      },
    },
    devtool: IS_DEVELOPMENT ? 'source-map' : false,
    stats: {
      children: false,
    },
  };
};

module.exports = (env = {}, argv = {}) => {
  const { mode } = argv;
  const IS_DEVELOPMENT = mode !== 'production';
  if (IS_DEVELOPMENT) {
    return {
      ...getConfig(mode, [path.join(DEV_PATH, 'index.tsx')], [], [
        new HTMLWebpackPlugin({
          inject: true,
          template: path.join(DEV_PATH, 'index.html'),
        filename: 'index.html',
        appEnv: mode,
        minify: {
          removeComments: false,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
        }),
        new InlineChunkHtmlPlugin(HTMLWebpackPlugin, [/runtime-.+[.]js/]),
      ]),
      devServer: {
        https: true,
        historyApiFallback: true,
        disableHostCheck: true,
      }
    };
  }
  return getConfig(mode, [path.join(SRC_PATH, `index.tsx`)]);
};
