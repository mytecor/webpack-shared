import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import webpackShared, { css, react, typescript, svgr, devServer } from 'webpack-shared'
import wrapPlugin from 'webpack-shared/wrapPlugin'

// Custom part
function custom({ root }) {
	return { entry: './example/index.tsx', output: { path: join(root, '../docs') } }
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
	svgr(),

	custom,
	html({ template: 'index.html' })
])
