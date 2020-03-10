import React, { Component } from 'react';
import { HashRouter, Route, Link, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import Home from './pages/Home';
import Properties from './pages/Properties';
import Brokers from './pages/Brokers';
import Favorites from './pages/Favorites';

import CoreLayout from './shared/layouts/CoreLayout';
import PropertyDetail from './shared/components/PropertyDetail';
import BrokerDetails from './shared/components/BrokerDetails';

import { routerPath, pageTitle } from './constants';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null,
			properties: [],
			favorites: [],
			brokers: []
		};
	}
	componentDidMount() {
		axios.get('/property')
			.then(res => this.setState({ properties: res.data, filteredProperties: res.data }))
			.catch(err => console.log("error:", err))
		axios.get('/favorite')
			.then(res => this.setState({ favorites: res.data }))
			.catch(err => console.log("error:", err))
		axios.get('/broker')
			.then(res => this.setState({ brokers: res.data }))
			.catch(err => console.log("error:", err))
	}
	render() {
		const { properties, brokers, favorites } = this.state
		return (
			<div>
				<HashRouter>
					<CoreLayout>
						<Switch>
							<Route exact component={() => <Home title={pageTitle.home} />} path="/" />
							<Route exact component={() => <Home title={pageTitle.home} />} path="/home" />
							<Route
								exact
								component={() => <Properties title={pageTitle.properties} properties={properties} favorites={favorites}/>}
								path={routerPath.properties}
							/>
							<Route
								exact
								component={() => <Brokers title={pageTitle.brokers} brokers={brokers}/>}
								path={routerPath.brokers}
							/>
							<Route
								exact
								component={() => <Favorites title={pageTitle.favorites} favorites={favorites}/>}
								path={routerPath.favorites}
							/>
							<Route
								exact
								component={() => <PropertyDetail brokers={brokers} favorites={favorites}/>}
								path={routerPath.property}
							/>
							<Route
								exact
								component={() => <BrokerDetails properties={properties}/>}
								path={routerPath.broker}
							/>
						</Switch>
					</CoreLayout>
				</HashRouter>
			</div>
		);
	}
}

export default App;
