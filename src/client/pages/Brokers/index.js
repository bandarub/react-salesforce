import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import Heading from '../../shared/components/Heading';
import ListItem from '../../shared/components/ListItem';
import { normalizeBrokerData } from '../../utils';

class Brokers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brokers: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/broker')
      .then(response => response.json())
      .then(data => this.setState({ brokers: data }));
  }

	onItemSelect = (broker) => {
	  const { history } = this.props;
	  history.push(`/broker/${broker.sfid}`);
	};

	renderList = () => {
	  const { brokers } = this.state;
	  return brokers.map((broker, key) => (
  <ListItem key={key} item={normalizeBrokerData(broker)} onClick={this.onItemSelect} data={broker} />
	  ));
	};

	render() {
	  const { brokers } = this.state;
	  if (!brokers || brokers.length === 0) {
	    return null;
	  }
	  return (
  <div className="brokers">
    <Heading title="Brokers" />
    <div className="brokers__list">{this.renderList()}</div>
  </div>
	  );
	}
}

export default withRouter(Brokers);
