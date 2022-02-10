import HtmlWebpackPlugin from 'html-webpack-plugin'

import webpackShared, { css, react, typescript, devServer } from 'webpack-shared'

export default webpackShared(import.meta.url, [
	css(),
	devServer(),
	react(),
	typescript(),

	// Custom config
	() => {
		return {
			entry: './example/index.tsx',
			plugins: [
				new HtmlWebpackPlugin({
					template: './example/index.html',
					inject: 'body'
				})
			]
		}
	}
])
