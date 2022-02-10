import wrapPlugin from './wrapPlugin.js'
import Refresh from '@pmmmwh/react-refresh-webpack-plugin'

export const react = wrapPlugin(({ DEV }) => {
	return {
		plugins: [DEV && new Refresh()]
	}
})
