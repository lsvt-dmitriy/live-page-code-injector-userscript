const path = require('path');
module.exports = {
	mode: 'development',
	entry: {
		worker: './src/worker.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist'),
	},
	node: {
	    child_process: 'empty',
	    fs: 'empty',
	    crypto: 'empty',
	    net: 'empty',
	    tls: 'empty'
	},
};