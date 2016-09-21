let path = require("path");

module.exports = {
   context: __dirname,
   entry: "./entry.jsx",
   output: {
     path: path.join(__dirname),
     filename: "bundle.js"
   },
     resolve: {
     extensions: ["", ".js"]
   },
   module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      },
      {
        test: /\.node$/,
        loader: "node-loader"
      }
    ]
  },
  devtool: 'source-maps'
};
