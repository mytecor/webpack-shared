import { useReducer } from 'react'
import { createRoot } from 'react-dom/client'

import Logo from './webpack_logo.svg'
import Button from 'components/Button'

import { $row, $logo } from './styles.css'

function App() {
	let [value, increment] = useReducer((acc) => acc + 1, 0)

	return (
		<>
			<h1 className={$row}>
				<Logo className={$logo} />
				Webpack Shared app example
			</h1>
			<div className={$row}>
				<Button onClick={increment}>Add</Button>
				Value: {value}
			</div>
		</>
	)
}

createRoot(document.getElementById('root')!).render(<App />)
