module.exports = {
	entry:  __dirname + "/app/Main.js",
	output: {
		path: __dirname + "/public",
		filename: "bundle.js"
	},
	module: {
		loaders: [{
			test: /\.jsx?$/,
			loader: 'babel',
			query:{
				cacheDirectory: true,
				presets: ['react','es2015']
			}
		}]
	}
};