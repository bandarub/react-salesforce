import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import axios from 'axios'

import Heading from '../../shared/components/Heading'
import ListItem from '../../shared/components/ListItem'
import Loading from '../../shared/components/Loading'

import { normalizeProperty } from '../../utils'

class Favorites extends Component {
	constructor(props) {
		super(props)
		this.state = {
			favorites: null
		}
	}

	componentDidMount() {
		const { favorites } = this.props
		this.setState({ favorites })
	}

	onItemSelect = prop => {
		const { history } = this.props
		history.push(`/property/${prop.sfid}`)
	}

	renderList = () => {
		const { favorites } = this.state
		return favorites.map((data, key) => (
			<ListItem
				item={normalizeProperty(data)}
				key={key}
				data={data}
				onClick={this.onItemSelect}
				deletable={false}
				onClickDelete={this.onFavDelete}
			/>
		))
	}
	render() {
		const { favorites } = this.state
		const { loading } = this.props
		return (
			<div className="favorites">
				<Heading title="Favorites" />
				{loading && <Loading />}
				<div className="favorites__list">
					{!favorites || favorites.length === 0 ? (
						<p className="statement">Favorite list is empty</p>
					) : (
						this.renderList()
					)}
				</div>
			</div>
		)
	}
}

export default withRouter(Favorites)
