const { default: Refresh } = await import('@pmmmwh/react-refresh-webpack-plugin').catch((e) => {
	console.error('No "@pmmmwh/react-refresh-webpack-plugin" found')
	return { default: null }
})

export default function react() {
	return ({ DEV }) => ({
		plugins: DEV && Refresh ? [new Refresh()] : []
	})
}
