const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');
const isProd = process.env.NODE_SHELL_ENV === 'production';

const devtool = isProd ?
  'source-map' :
  'cheap-module-eval-source-map';

const entry = {
  skeleton: './skeleton/index.js',
  editor: './modules/editor.js',
  'common-dependencies': [
      'mithril',
      // 'skeletonpwa',
      /* Just one version of react, too. react-router is fine to have multiple versions of,
       * though, so no need to put it in common dependencies
       */
      'react',
      'react-dom',
    ],
};

const output = {
  path: path.resolve('./bundle/public'),
  filename: `[name].js`,
  publicPath: '/'
};

const modules = {
  loaders: [{
      test: /\.(jpg|png|gif)$/,
      loader: 'url-loader?limit=10000'
    },
    {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader']
    },
    {
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.js$/,
      loader: 'babel-loader',
      query: {
        plugins: ['babel-plugin-transform-object-rest-spread'],
        presets: ['env', 'react']
      }
    }
  ]
};

const plugins = [
  new CopyPlugin([{
      from: path.resolve(__dirname, './skeleton/manifest.json'),
      to: '.'
    },
    {
      from: path.resolve(__dirname, './skeleton/sw.js'),
      to: '.'
    },
    {
      from: path.resolve(__dirname, './skeleton/assets'),
      to: '.'
    }
  ]),
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
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common-dependencies',
    }),
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
        join_vars: true,
      },
      output: {
        comments: false,
      },
    })
  );
}

module.exports = {
  devtool,
  entry,
  output,
  module: modules,
  plugins
};
