import { join } from 'node:path'
import { Module } from 'webpack'
import { plugin, ConfigPart } from './plugin.js'

export const base = plugin<void>(({ root, DEV, PROD }) => {
	return {
		mode: DEV ? 'development' : ('production' as ConfigPart['mode']),
		output: {
			filename: DEV ? '[name].js' : '[name].[chunkhash].js',
			assetModuleFilename: (pathData) => {
				if (pathData.filename?.match(/\.ts$/)) {
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
				minSize: 0,
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name(module: Module) {
							return module.context?.match(/node_modules[\\/]([^\/]*)/)?.[1]
						},
						chunks: 'all'
					}
				}
			},
			minimize: PROD
		}
	}
})
