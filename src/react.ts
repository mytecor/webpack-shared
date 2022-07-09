import { plugin } from './plugin.js'
import Refresh from '@pmmmwh/react-refresh-webpack-plugin'

export const react = plugin(({ DEV }) => {
	return {
		plugins: [DEV && new Refresh()]
	}
})
