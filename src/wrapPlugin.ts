import { Compiler, Configuration, WebpackPluginInstance } from 'webpack'

export interface IConfig {
	DEV: boolean
	PROD: boolean
	root: string
}

export interface IPlugin<Options = Record<string, any>> {
	(config: IConfig & Options): Omit<Configuration, 'plugins'> & {
		plugins?: (((this: Compiler, compiler: Compiler) => void) | WebpackPluginInstance | boolean)[]
	}
}

export default function wrapPlugin<Options extends Record<string, any>>(plugin: IPlugin<Options>) {
	return (options = {} as Options) => (config: IConfig) => plugin({ ...options, ...config })
}
