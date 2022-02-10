import CssExtract from 'mini-css-extract-plugin'

export default function css() {
	return ({ PROD }) => ({
		module: {
			rules: [
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [PROD ? CssExtract.loader : 'style-loader', 'css-loader']
				}
			]
		},
		plugins: [PROD && new CssExtract()].filter(Boolean)
	})
}
