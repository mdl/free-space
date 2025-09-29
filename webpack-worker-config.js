const path = require('path');
const { ProgressPlugin, NoEmitOnErrorsPlugin } = require('webpack');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['./node_modules'],
    plugins: [
      new TsconfigPathsPlugin({ configFile: path.resolve(__dirname, 'tsconfig.worker.json') })
    ]
  },
  entry: {
    './src/assets/workers/dbscan': ['./src/worker/dbscan.worker.ts'],
    './src/assets/workers/dbscan-core-finder': ['./src/worker/dbscan-core-finder.worker.ts']
  },
  output: {
    path: process.cwd(),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader',
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
            options: {
              configFile: path.resolve(__dirname, 'tsconfig.worker.json'),
              transpileOnly: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new ProgressPlugin()
  ]
};
