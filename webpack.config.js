const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const rootDir = process.cwd();
const srcDir = './src';
const publicDir = './public';
const outputDir = './build';

const isDev = process.env.NODE_ENV === 'development';

const getFileName = (ext) => `bundle.[fullhash].${ext}`;

module.exports = {
  context: path.resolve(rootDir, srcDir),
  entry: './index.tsx',
  output: {
    path: path.resolve(rootDir, outputDir),
    filename: getFileName('js'),
  },
  resolve: {
    modules: [path.join(__dirname, '/src'), 'node_modules'],
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      template: path.resolve(rootDir, publicDir, 'index.html'),
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
  ],
  devServer: {
    port: 3000,
    static: {
      directory: path.resolve(rootDir, publicDir),
    },
    historyApiFallback: true,
  },
  devtool: isDev ? 'source-map' : false,
};
