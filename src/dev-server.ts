import { plugin } from './plugin.js'

export const devServer = plugin<Options | void>(({ port = 80 }) => {
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

interface Options {
	port?: number
}
