import wrapPlugin from './wrapPlugin.js'
import CssExtract from 'mini-css-extract-plugin'

export const css = wrapPlugin(({ PROD }) => {
	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					exclude: /node_modules/,
					use: [
						PROD ? CssExtract.loader : 'style-loader',
						{
							loader: 'css-loader',
							options: {
								importLoaders: 1,
								modules: {
									localIdentName: '[local]-[hash:base64:3]',
									namedExport: true,
									exportLocalsConvention: (name: string) => '$' + name.replace(/-/g, '_')
								}
							}
						}
					]
				}
			]
		},
		plugins: [PROD && new CssExtract()]
	}
})