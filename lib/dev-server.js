import wrapPlugin from './wrapPlugin.js'

export const devServer = wrapPlugin(({ port = 80 }) => {
	return {
		devServer: {
			hot: true,
			historyApiFallback: true,
			port,
			client: {
				logging: 'warn',
				webSocketURL: 'auto://0.0.0.0/ws'
			},
			allowedHosts: 'all'
		},
		devtool: 'source-map'
	}
})
