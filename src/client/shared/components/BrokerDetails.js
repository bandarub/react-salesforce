import React, { Component } from 'react';
import { withRouter, Link, useHistory } from 'react-router-dom';
import Heading from './Heading';

class BrokerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brokerData: null
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    console.log(id);
    fetch(`http://localhost:8080/broker/${id}`)
      .then(response => response.json())
      .then(data => this.setState({ brokerData: data }));
  }

	renderData = () => {
	  const { brokerData } = this.state;
	  const { phone__c, email__c } = brokerData;
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
	  ];
	  return data.map((item, key) => (
  <div className="brokerDetails__info-details" key={key}>
    <i className="material-icons">{item.icon}</i>
    <h2>{item.text}</h2>
    <p>{item.value}</p>
  </div>
	  ));
	};

	render() {
	  const { brokerData } = this.state;
	  if (!brokerData) {
	    return null;
	  }
	  const { picture__c, name, title__c } = brokerData;
	  return (
  <div className="brokerDetails">
    <Heading title="Broker" linkTitle="Back" icon="arrow_left" link />
    <div className="brokerDetails__info">
      <div className="brokerDetails__info-imageContainer">
        <img src={picture__c} />
        <h2>{name}</h2>
        <p>{title__c}</p>
      </div>
      {this.renderData()}
    </div>
  </div>
	  );
	}
}

export default withRouter(BrokerDetail);
