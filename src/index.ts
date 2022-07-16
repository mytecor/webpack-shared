import { dirname } from 'path'
import { mergeAndConcat } from 'merge-anything'
import { Configuration } from 'webpack'

import { ConfigPart, Plugin } from './plugin.js'

export * from './plugin.js'
export * from './base.js'
export * from './css.js'
export * from './svgr.js'
export * from './react.js'
export * from './typescript.js'
export * from './dev-server.js'

export function shared(path: string, handlers: [Plugin, ...Plugin[]]) {
	const root = dirname(new URL(path).pathname)

	return async ({ WEBPACK_SERVE }: { WEBPACK_SERVE: boolean }) => {
		const PROD = !WEBPACK_SERVE
		const DEV = !PROD

		const options = {
			root,
			DEV,
			PROD
		}

		const parts: ConfigPart[] = []

		for (const handler of handlers) {
			parts.push(await handler(options))
		}

		let { plugins = [], ...config } = mergeAndConcat(
			...(parts as [ConfigPart, ...ConfigPart[]])
		)

		return {
			plugins: plugins.filter(Boolean),
			...config
		} as Configuration
	}
}

export default shared
