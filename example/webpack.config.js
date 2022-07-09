import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {
	shared,
	base,
	css,
	react,
	typescript,
	svgr,
	devServer,
	plugin
} from 'webpack-shared'

// Custom part
function custom({ root }) {
	return {
		entry: './example/index.tsx',
		output: { path: join(root, './dist') }
	}
}

// Custom plugin
const html = plugin(({ template, root }) => {
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
export default shared(import.meta.url, [
	base(),

	css(),
	devServer(),
	react(),
	typescript(),
	svgr(),

	custom,
	html({ template: 'index.html' })
])
