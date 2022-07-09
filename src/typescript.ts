import { join } from 'path'
import { plugin } from './plugin.js'

import refresh from 'react-refresh-typescript'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const typescript = plugin<Options | void>(
	({ configFile = 'tsconfig.json', DEV, PROD, root }) => {
		configFile = join(root, configFile)

		const resolve = {
			extensions: ['.ts', '.tsx'],
			plugins: [
				new TsconfigPathsPlugin({
					configFile
				})
			]
		}

		const loader = {
			loader: 'ts-loader',
			options: {
				configFile,
				compilerOptions: {
					jsx: DEV ? 'react-jsxdev' : 'react-jsx'
				},
				transpileOnly: PROD,
				getCustomTransformers:
					DEV &&
					(() => ({
						before: [refresh()]
					}))
			}
		}

		const module = {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: [loader]
				}
			]
		}

		return {
			resolve,
			module
		}
	}
)

interface Options {
	configFile?: string
}
