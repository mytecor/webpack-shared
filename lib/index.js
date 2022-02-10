import { dirname, join } from 'path'
import { mergeAndConcat } from 'merge-anything'

export { css } from './css.js'
export { react } from './react.js'
export { typescript } from './typescript.js'
export { devServer } from './dev-server.js'

export default function webpackShared(path, handlers) {
	const root = dirname(new URL(path).pathname)

	return ({ WEBPACK_SERVE }) => {
		console.log('\nSome magic (ﾉ>ω<)ﾉ━━━★\x1b[34m･:*:☆ﾟ.*･｡ﾟ\x1b[0m')

		const DEV = WEBPACK_SERVE
		const PROD = !DEV

		const options = {
			root,
			DEV,
			PROD
		}

		let { plugins, ...config } = mergeAndConcat(
			{
				mode: DEV ? 'development' : 'production',
				output: {
					filename: DEV ? '[name].js' : '[name].[chunkhash].js',
					assetModuleFilename: (pathData) => {
						if (pathData.filename.match(/\.ts$/)) {
							return DEV ? '[name].js' : '[name].[chunkhash].js'
						} else {
							return DEV ? '[name][ext]' : '[chunkhash][ext][query]'
						}
					},
					path: join(root, 'dist'),
					hashDigestLength: 5,
					clean: PROD
				},
				resolve: {
					extensions: ['.js']
				},
				stats: 'errors-warnings',
				optimization: {
					splitChunks: PROD && {
						cacheGroups: {
							vendors: {
								test: /[\\/]node_modules[\\/]/,
								name(module) {
									return module.identifier().replace(/.*node_modules[^\/]*[\/](.+?)[\/].*/, '$1')
								},
								chunks: 'all'
							}
						}
					},
					minimize: PROD
				}
			},
			...handlers.map((handler) => handler(options))
		)

		return {
			plugins: plugins.filter(Boolean),
			...config
		}
	}
}
