import React, { Component } from 'react'
import { withRouter, Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import Heading from './Heading'

class BrokerDetail extends Component {
	constructor(props) {
		super(props)
		this.state = {
			brokerData: null,
			related: []
		}
	}

	componentDidMount() {
    const {properties} =this.props
		const { id } = this.props.match.params
		let related = []
		if (properties && properties.length !== 0) {
			related = properties.filter(item => item.broker__c === id)
		}
		axios
			.get(`/broker/${id}`)
			.then(res => this.setState({ brokerData: res.data, related }))
	}

	renderData = () => {
		const { brokerData } = this.state
		const { phone__c, email__c } = brokerData
		const data = [
			{
				icon: 'phone',
				text: 'Call Office',
				value: phone__c
			},
			{
				icon: 'phone',
				text: 'Call Mobile',
				value: phone__c
			},
			{
				icon: 'phone',
				text: 'Text',
				value: phone__c
			},
			{
				icon: 'mail',
				text: 'Email',
				value: email__c
			}
		]
		return data.map((item, key) => (
			<div className="item" key={key}>
				<i className="material-icons">{item.icon}</i>
				<div className="item__details">
					{item.text === 'Email' ? (
						<a href={`mailto:${item.value}?subject=Inquiring about properties`} target="_blank">
							<label>{item.text}</label>
							<p>{item.value}</p>
						</a>
					) : (
						<div>
							<label>{item.text}</label>
							<p>{item.value}</p>
						</div>
					)}
				</div>
			</div>
		))
	}

	render() {
    const { brokerData, related } = this.state
		if (!brokerData) {
			return null
		}
		const { picture__c, name, title__c } = brokerData
		return (
			<div className="brokerDetails">
				<Heading title="Broker" linkTitle="Back" icon="arrow_left" link />
				<div className="brokerDetails__info">
					<div className="brokerDetails__info-imageContainer">
						<img src={picture__c} />
						<h2>{name}</h2>
						<p>{title__c}</p>
					</div>
					<div className="brokerDetails__info-list"> {this.renderData()}</div>
				</div>
				<Link to={{ pathname: '/property', query: { related: related,page:"broker" } }} className="related">
					Related Properties
				</Link>
			</div>
		)
	}
}

export default withRouter(BrokerDetail)
