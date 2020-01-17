const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    noInfo: true,
    open: true,
    stats: 'minimal',
  },
  devtool: 'cheap-eval-source-map',
  entry: './src/index.ts',
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|fbx|gltf)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        exclude: /node_modules/,
        test: /\.ts?$/,
        use: { loader: 'ts-loader', options: { transpileOnly: true } },
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new CopyPlugin([
      {
        from: path.join(__dirname, 'src', 'cybertruckPublicAssets'),
        to: path.join(__dirname, 'dist'),
      },
    ]),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
