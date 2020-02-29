import React from 'react'
import {Link} from 'react-router-dom'

const Heading = ({
    title,
    isBack
}) => {
	const headingClassName = ['heading']
	return (
		<div
			className={headingClassName.join(' ')}
		>
            {isBack && <Link to="/properties">Back</Link>}
			<h2 className="heading__text">
				{title}
			</h2>
		</div>
	)
}
export default Heading
