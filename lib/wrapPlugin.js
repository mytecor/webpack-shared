export default function wrapPlugin(plugin) {
	return (options = {}) => (config) => plugin({ ...options, ...config })
}
