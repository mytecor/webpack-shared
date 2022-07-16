import process from 'process'
import webpack from 'webpack'
import { join } from 'path'
import Serve from 'webpack-dev-server'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import {
	shared,
	base,
	css,
	react,
	typescript,
	svgr,
	devServer,
	plugin,
	Env
} from '../src/index.js'

// Custom part
function custom({ root }: Env) {
	return {
		entry: join(root, 'src/index.tsx'),
		output: { path: join(root, './dist') }
	}
}

// Custom plugin
const html = plugin<{ template: string }>(({ template, root }) => {
	return {
		plugins: [
			new HtmlWebpackPlugin({
				template: join(root, template),
				inject: 'body'
			})
		]
	}
})

const config = shared(import.meta.url, [
	base(),

	css(),
	devServer(),
	react(),
	typescript({ configFile: 'src/tsconfig.json' }),
	svgr(),

	custom,
	html({ template: 'src/index.html' })
])

const serve = process.argv.includes('-s')
const env = {
	WEBPACK_SERVE: serve
}

const compiler = webpack(await config(env))

if (serve) {
	new Serve(compiler.options.devServer, compiler).start()
} else {
	await new Promise((resolve) => compiler.run(resolve))
}
