const webpack = require ('webpack');
const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, options) => {
	const isProduction = options.mode === 'production';
	const config = {
    mode: isProduction ? 'production' : 'development',
	  devtool: isProduction ? false : 'source-map',
	  watch: !isProduction,
    entry: ['./src/index.js', './src/style.scss'],
	  output: {
	    filename: 'index.js',
	    path: path.join(__dirname, '/dist'),
      clean: true,
      assetModuleFilename: (pathData) => {
        const filepath = path
          .dirname(pathData.filename)
          .split('/')
          .slice(1)
          .join('/');
        return `${filepath}/[name].[ext]`;
      },
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new HtmlWebpackPlugin({
    		template: path.resolve(__dirname, 'index.html'),
        filename: 'index.html',
    	})
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            MiniCssExtractPlugin.loader,
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader",
          ],
        },
        {
          test: /\.html$/i,
          loader: "html-loader",
        },
        {
          test: /\.(ico|png|svg|jpe?g|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff(2)|svg|eot|ttf|otf)$/i,
          type: 'asset/inline',
        },
      ]
    }
	}
	return config;
}