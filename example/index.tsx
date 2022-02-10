import { render } from 'react-dom'
import Test from './test'

import './styles.css'

function App() {
	return (
		<div>
			<Test />
		</div>
	)
}

render(<App />, document.getElementById('root'))
