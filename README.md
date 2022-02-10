# webpack-shared

Shared webpack config

## Install

```bash
yarn add --dev webpack-shared
```

## Usage

[ESModules only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c)

```js
import { join } from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'

import webpackShared, { css, react, typescript, devServer } from 'webpack-shared'
import wrapPlugin from 'webpack-shared/wrapPlugin.js'

// Custom part
function entry() {
	return { entry: './example/index.tsx' }
}

// Custom plugin
const html = wrapPlugin(({ template, root }) => {
	return {
		plugins: [
			new HtmlWebpackPlugin({
				template: join(root, template),
				inject: 'body'
			})
		]
	}
})

// Config
export default webpackShared(import.meta.url, [
	css(),
	devServer(),
	react(),
	typescript(),

	entry,
	html({ template: 'index.html' })
])
```

The config parts will be merged by `mergeAndConcat` from [merge-anything](https://github.com/mesqueeb/merge-anything) library.

See the [example](https://github.com/mytecor/webpack-shared/blob/main/example) app.
