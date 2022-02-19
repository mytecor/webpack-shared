import { Compiler, Configuration, WebpackPluginInstance } from 'webpack'

export interface IConfig {
	DEV: boolean
	PROD: boolean
	root: string
}

export type ConfigPart = Omit<Configuration, 'plugins'> & {
	plugins?: (((this: Compiler, compiler: Compiler) => void) | WebpackPluginInstance | boolean)[]
}

export interface IPlugin<Options = IOptions & Record<string, any>> {
	(config: IConfig & Options): ConfigPart
}

export default function wrapPlugin<Options extends IOptions & Record<string, any>>(
	plugin: IPlugin<Options>
) {
	return (options = {} as Options) => (config: IConfig) => plugin({ ...options, ...config })
}

export interface IOptions {
	root: string
	DEV: boolean
	PROD: boolean
}
