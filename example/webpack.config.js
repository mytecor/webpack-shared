import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import webpackShared, { css, react, typescript, devServer } from 'webpack-shared'
import wrapPlugin from 'webpack-shared/wrapPlugin.js'

// Custom part
function entry() {
	return { entry: './example/index.tsx' }
}

// Custom plugin
const html = wrapPlugin(({ template, root }) => {
	return {
		plugins: [
			new HtmlWebpackPlugin({
				template: join(root, template),
				inject: 'body'
			})
		]
	}
})

// Config
export default webpackShared(import.meta.url, [
	css(),
	devServer(),
	react(),
	typescript(),

	entry,
	html({ template: 'index.html' })
])
