const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  entry: './frontend/src/main.js', // Punto di ingresso della tua applicazione
  output: {
    path: path.resolve(__dirname, 'frontend'), // Directory di output
    filename: 'bundle.js', // Nome del file bundle
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader'],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-bundler.js',
    },
    extensions: ['.js', '.vue', '.json'],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  mode: 'development',
};
