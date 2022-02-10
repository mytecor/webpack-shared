import { join } from 'path'
import wrapPlugin from './wrapPlugin.js'

import refresh from 'react-refresh-typescript'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

export const typescript = wrapPlugin(({ configFile = 'tsconfig.json', DEV, PROD, root }) => {
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
})
