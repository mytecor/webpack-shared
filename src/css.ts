import { plugin } from './plugin.js'
import CssExtract from 'mini-css-extract-plugin'

export const css = plugin<void>(({ PROD }) => {
	return {
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						PROD ? CssExtract.loader : 'style-loader',
						{
							loader: 'css-loader',
							options: {
								modules: {
									mode: (path: string) => {
										const [match, type] =
											path.match(
												/node_modules[\/\\].*?(\.modules?|\.icss)?\.css$/
											) ?? []

										if (match) {
											if (type === '.icss') {
												return 'icss'
											}

											if (type === '.module' || type === '.modules') {
												return 'local'
											}

											return 'global'
										}

										return 'local'
									},
									localIdentName: '[local]-[hash:base64:3]',
									namedExport: true,
									exportLocalsConvention: (name: string) =>
										'$' + name.replace(/-/g, '_')
								}
							}
						}
					]
				}
			]
		},
		plugins: [
			PROD &&
				new CssExtract({
					filename: '[name].[contenthash].css'
				})
		]
	}
})
