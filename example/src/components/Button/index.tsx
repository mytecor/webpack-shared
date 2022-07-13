import { ComponentProps } from 'react'
import cnj from 'cnj'

import { $button } from './style.css'
export default function Button({
	className,
	...props
}: ComponentProps<'button'>) {
	return <button className={cnj($button, className)} {...props} />
}
