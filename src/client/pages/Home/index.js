import React, { Component } from 'react'

import image1 from '../../assets/images/slide_properties.jpg'
import image2 from '../../assets/images/slide_brokers.jpg'
import image3 from '../../assets/images/slide_favorites.jpg'
import { Carousel } from 'react-responsive-carousel';
import { data } from '../../constants'
import Heading from '../../shared/components/Heading'

class Home extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}

	renderPage = () => {
		return <Carousel showThumbs={false}>
			{data.map((item, key) => {
				return <div key={key} className="item">
					<img src={item.image} />
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
				<Heading title="Welcome" />
				{this.renderPage()}
			</div>
		)
	}
}

export default Home
