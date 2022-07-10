import { plugin } from './plugin.js'

export const svgr = plugin<void>(() => {
	return {
		module: {
			rules: [
				{
					test: /\.svg$/i,
					issuer: /\.[jt]sx?$/,
					use: [
						{
							loader: '@svgr/webpack',
							options: {
								dimensions: false
							}
						}
					]
				}
			]
		}
	}
})
