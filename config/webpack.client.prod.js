const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const merge = require('webpack-merge');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const defaults = require('./webpack.defaults');

module.exports = merge.smart({
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        MiniCSSExtractPlugin.loader,
      ],
    }],
  },
}, defaults, {
  mode: 'production',
  output: {
    filename: '[hash].js',
  },
  plugins: [
    new ManifestPlugin({ fileName: 'manifest.json' }),
    new ManifestPlugin({ fileName: `manifest.${Date.now()}.json` }),
    new ExtractTextPlugin('[md5:contenthash:hex:20].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"',
    }),
    new ProgressBarPlugin(),
    new MiniCSSExtractPlugin({
      filename: '[contenthash].css',
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
});
