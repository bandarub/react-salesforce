import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';

import Heading from '../../shared/components/Heading';
import ListItem from '../../shared/components/ListItem';
import { normalizeProperty } from '../../utils';

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorites: null
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/favorite')
      .then(response => response.json())
      .then(data => this.setState({ favorites: data }));
  }

	onItemSelect = (prop) => {
	  const { history } = this.props;
	  history.push(`/property/${prop.sfid}`);
	};

	renderList = () => {
	  const { favorites } = this.state;
	  return favorites.map((data, key) => (
  <ListItem item={normalizeProperty(data)} key={key} data={data} onClick={this.onItemSelect} />
	  ));
	};

	render() {
	  const { favorites } = this.state;
	  if (!favorites || favorites.length === 0) {
	    return null;
	  }
	  return (
  <div className="favorites">
    <Heading title="Favorites" />
    <div className="favorites__list">{this.renderList()}</div>
  </div>
	  );
	}
}

export default withRouter(Favorites);
