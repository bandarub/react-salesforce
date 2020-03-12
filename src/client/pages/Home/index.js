import React, { Component } from 'react'
import { Carousel } from 'react-responsive-carousel';

import Heading from '../../shared/components/Heading'
import { data } from '../../constants'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	renderPage = () => {
		return <Carousel showThumbs={false} autoPlay={true} emulateTouch={true} infiniteLoop={true}>
			{data.map((item, key) => {
				let divStyle = {
					backgroundImage:`url(${item.image})`,
					width:"100vw",
					height:"90vh",
					backgroundSize: "cover"
				}
				return <div key={key} className="item" style={divStyle}>
					<p className="item__note">{item.note}</p>
				</div>
			})}
		</Carousel>
	}

	onNumberClick = pageNum => {
		this.setState({
			selectedPage: pageNum
		})
	}

	render() {
		return (
			<div className="home">
				<Heading title="Welcome"/>
				{this.renderPage()}
			</div>
		)
	}
}

export default Home
