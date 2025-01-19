const { VueLoaderPlugin } = require('vue-loader');
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './client/src/main.js', // Punto di ingresso della tua applicazione
  output: {
    path: path.resolve(__dirname, 'client'), // Directory di output
    filename: 'bundle.js', // Nome del file bundle
  },
  optimization: {
    minimize: true,  // Minimizza il codice per la produzione
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
};
