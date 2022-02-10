import wrapPlugin from './wrapPlugin.js'

const { default: Refresh } = await import('@pmmmwh/react-refresh-webpack-plugin').catch((e) => {
	console.error('No "@pmmmwh/react-refresh-webpack-plugin" found')
	return { default: null }
})

export const react = wrapPlugin(({ DEV }) => {
	return {
		plugins: DEV && Refresh ? [new Refresh()] : []
	}
})
