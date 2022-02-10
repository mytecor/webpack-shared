import { useState } from 'react'

export default function Test() {
	let [state, setState] = useState(1)

	return (
		<div>
			test: {state}{' '}
			<button
				onClick={() => {
					setState(state + 1)
				}}
			>
				+
			</button>
		</div>
	)
}
