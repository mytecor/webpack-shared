import wrapPlugin from './wrapPlugin.js'

export const svgr = wrapPlugin(() => {
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
