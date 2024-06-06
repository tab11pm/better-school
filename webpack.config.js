const config = {
	mode: 'production',
	entry: {
		index: './src/js/index.js',
		form: './src/js/form.js',
		lesson: './src/js/lesson.js',
		univer: './src/js/univer.js',
		app: './src/js/app.js',
	},
	output: {
		filename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
		],
	},
};

module.exports = config;
