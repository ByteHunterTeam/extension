const path = require('path')
const fs = require('fs')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const Components = require('unplugin-vue-components/webpack')
const { ArcoResolver } = require('unplugin-vue-components/resolvers')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

// Generate pages object
const pages = {}

function getEntryFile (entryPath) {
  let files = fs.readdirSync(entryPath)
  return files
}

const chromeName = getEntryFile(path.resolve(`src/entry`))

function getFileExtension (filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}
chromeName.forEach((name) => {
  const fileExtension = getFileExtension(name)
  const fileName = name.replace('.' + fileExtension, '')
  pages[fileName] = {
    entry: `src/entry/${name}`,
    template: 'public/index.html',
    filename: `${fileName}.html`
  }
})

const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  pages,
  filenameHashing: false,
  chainWebpack: (config) => {
    config.plugin('copy').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: path.resolve(`src/manifest.${process.env.NODE_ENV}.json`),
            to: `${path.resolve('dist')}/manifest.json`
          },
          {
            from: path.resolve(`public/`),
            to: `${path.resolve('dist')}/`
          },
          {
            from: path.resolve(`src/assets`),
            to: `./src/assets`
          },
          {
            from: path.resolve(`src/index.css`),
            to: `./src/index.css`
          }
        ]
      }
    ])
  },
  configureWebpack: {
    output: {
      filename: `[name].js`,
      chunkFilename: `[name].js`
    },
    devtool: isDevMode ? 'inline-source-map' : false,
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "_locales/**/*",
            to: "./"
          },
          {
            from: "src/assets/**/*",
            to: "./"
          },
        ],
      }),new NodePolyfillPlugin(),
      Components({
        resolvers: [
          ArcoResolver()
        ]
      }),
    ],
  },
  css: {
    extract: false // Make sure the css is the same
  }
}
