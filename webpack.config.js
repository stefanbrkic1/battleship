const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: path.resolve(__dirname, './src/index.js'),
    battleship: path.resolve(__dirname, './src/battleship.js'),
  },
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    assetModuleFilename: (pathData) => {
      const isFont = /\.(woff|woff2|eot|ttf|otf)$/.test(pathData.filename)
      const isImage = /\.(png|svg|jpg|jpeg|gif)$/.test(pathData.filename)

      if (isFont) {
        return `assets/font/${pathData.filename}`
      }

      if (isImage) {
        return `assets/img/${pathData.filename}`
      }

      return `assets/${pathData.filename}`
    },
  },
  optimization: {
    runtimeChunk: 'single',
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'assets/audio/', // Specify the output path
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Battleship | The Classic Naval Combat Game',
      filename: 'index.html',
      template: './src/pages/index.ejs',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      title: 'Battleship | Gameboard',
      filename: 'battleship.html',
      template: './src/pages/battleship.ejs',
      chunks: ['battleship'],
    }),
  ],
}
