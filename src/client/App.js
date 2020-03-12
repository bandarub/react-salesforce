import React, { Component } from 'react'
import { HashRouter, Route, Link, Switch, withRouter } from 'react-router-dom'
import axios from 'axios'

//Components
import Home from './pages/Home'
import Properties from './pages/Properties'
import Brokers from './pages/Brokers'
import Favorites from './pages/Favorites'
import CoreLayout from './shared/layouts/CoreLayout'
import PropertyDetail from './shared/components/PropertyDetail'
import BrokerDetails from './shared/components/BrokerDetails'
//Contants
import { routerPath, pageTitle } from './constants'

class App extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: null,
			properties: [],
			favorites: [],
			brokers: [],
			propLoading: true,
			brokLoading: true,
			favLoading: true,
			error: null
		}
	}
	componentDidMount() {
		axios
			.get('/property')
			.then(res =>
				this.setState({
					properties: res.data,
					filteredProperties: res.data,
					propLoading: false
				})
			)
			.catch(err => {
				this.setState({ propLoading: false })
				console.log('error:', err)
			})
		axios
			.get('/favorite')
			.then(res => this.setState({ favorites: res.data, favLoading: false }))
			.catch(err => {
				this.setState({ favLoading: false })
				console.log('error:', err)
			})
		axios
			.get('/broker')
			.then(res => this.setState({ brokers: res.data, brokLoading: false }))
			.catch(err => {
				this.setState({ brokLoading: false })
				console.log('error:', err)
			})
	}
	render() {
		const { properties, brokers, favorites, propLoading,brokLoading,favLoading, error } = this.state
		return (
			<div>
				<HashRouter>
					<CoreLayout>
						<Switch>
							<Route
								exact
								component={() => <Home title={pageTitle.home} />}
								path="/"
							/>
							<Route
								exact
								component={() => <Home title={pageTitle.home} />}
								path="/home"
							/>
							<Route
								exact
								component={() => (
									<Properties
										title={pageTitle.properties}
										properties={properties}
										favorites={favorites}
										loading={propLoading}
									/>
								)}
								path={routerPath.properties}
							/>
							<Route
								exact
								component={() => (
									<Brokers
										title={pageTitle.brokers}
										brokers={brokers}
										loading={brokLoading}
									/>
								)}
								path={routerPath.brokers}
							/>
							<Route
								exact
								component={() => (
									<Favorites
										title={pageTitle.favorites}
										favorites={favorites}
										loading={favLoading}
									/>
								)}
								path={routerPath.favorites}
							/>
							<Route
								exact
								component={() => (
									<PropertyDetail brokers={brokers} favorites={favorites} />
								)}
								path={routerPath.property}
							/>
							<Route
								exact
								component={() => <BrokerDetails properties={properties} />}
								path={routerPath.broker}
							/>
						</Switch>
					</CoreLayout>
				</HashRouter>
			</div>
		)
	}
}

export default App
