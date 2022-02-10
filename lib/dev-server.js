export default function devServer({ port } = {}) {
	return () => ({
		devServer: {
			hot: true,
			historyApiFallback: true,
			port: port ?? 80,
			client: {
				logging: 'warn',
				webSocketURL: 'auto://0.0.0.0/ws'
			},
			allowedHosts: 'all'
		},
		devtool: 'source-map'
	})
}
