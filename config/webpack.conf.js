'use strict'
const _ = require('lodash')
const webpack = require('webpack')
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin')
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin')

const helpers = require('./helpers')

const commonConfig = require('./common.webpack.conf.js')

const METADATA = {
  title: 'postal.xframe',
  BASE_URL: '/',
  LOG_LEVEL: 'error'
}

module.exports = {
  metadata: METADATA,
  data: _.merge(commonConfig.data, {
    output: {
      library: 'postalXframe',
      libraryTarget: 'umd',
      filename: 'postal.xframe.js'
    },
    devtool: 'source-map',
    externals: [
      {
        postal: 'postal',
        lodash: {
          root: '_',
          commonjs: 'lodash',
          commonjs2: 'lodash',
          amd: 'lodash'
        }
      }
    ],
    entry: {
      'postal.xframe': './src/index.js'
    },
    plugins: [
      new ForkCheckerPlugin(),
      new ContextReplacementPlugin(
        // The (\\|\/) piece accounts for path separators in *nix and Windows
        /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
        helpers.root('src') // location of your src
      )
    ]
  })
}
