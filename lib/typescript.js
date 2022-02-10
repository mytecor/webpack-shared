import { join } from 'path'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'

const { default: refresh } = await import('react-refresh-typescript').catch((e) => ({
	default: null
}))

export default function typescript({ configFile = 'tsconfig.json' } = {}) {
	return ({ DEV, PROD, root }) => {
		configFile = join(root, configFile)

		return {
			resolve: {
				extensions: ['.ts', '.tsx'],
				plugins: [
					new TsconfigPathsPlugin({
						configFile
					})
				]
			},
			module: {
				rules: [
					{
						test: /\.tsx?$/,
						exclude: /node_modules/,
						use: [
							{
								loader: 'ts-loader',
								options: {
									configFile,
									compilerOptions: {
										jsx: DEV ? 'react-jsxdev' : 'react-jsx'
									},
									transpileOnly: PROD,
									getCustomTransformers:
										DEV &&
										refresh &&
										(() => ({
											before: [refresh()]
										}))
								}
							}
						]
					}
				]
			}
		}
	}
}
