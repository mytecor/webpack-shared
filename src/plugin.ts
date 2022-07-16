import { Compiler, Configuration, WebpackPluginInstance } from 'webpack'

export interface Env {
	DEV: boolean
	PROD: boolean
	root: string
}

export type ConfigPart = Omit<Configuration, 'plugins'> & {
	plugins?: (
		| ((this: Compiler, compiler: Compiler) => void)
		| WebpackPluginInstance
		| boolean
	)[]
}

export interface Plugin<Options extends Env = Env> {
	(config: Options): ConfigPart | Promise<ConfigPart>
}

export function plugin<Options>(handler: Plugin<Exclude<Options, void> & Env>) {
	return (options: Options): Plugin<Env> => {
		return (env) => {
			return handler({ ...env, ...(options as any) })
		}
	}
}
