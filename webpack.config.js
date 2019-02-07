const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_SHELL_ENV
 === 'production';
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const devtool = isProd ? "" : "cheap-module-eval-source-map";
const mode = isProd ? "production" : "development";

const entry = {
  index: './core/index.js',
};

const output = {
  path: path.resolve('./bundle/'),
  filename: `[name].js`,
  library: 'skeletonpwa',
  libraryTarget: 'umd',
  umdNamedDefine: true
};

const modules = {
  rules: [{
      test: /\.html$/,
      loader: 'html-loader'
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: [path.resolve(__dirname, 'node_modules')],
      query: {
        plugins: ['babel-plugin-transform-object-rest-spread'],
        presets: ['env']
      }
    }
  ]
};

const plugins = [
  new webpack.optimize.ModuleConcatenationPlugin()
];

const devServer = {
  historyApiFallback: {
    index: './index.html',
  },
  stats: 'minimal',
  disableHostCheck: true
};


// Production configs and setup
if (isProd) {
  plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_SHELL_ENV: JSON.stringify('production')
      }
    }) 
  );
}

module.exports = {
  devtool,
  mode,
  entry,
  optimization: {
    minimize: true,
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        screw_ie8: true,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
      }
    })],
    usedExports: true,
    sideEffects: true
  },
  output,
  module: modules,
  plugins
};
