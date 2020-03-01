import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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

	renderList = () => {
	  const { favorites } = this.state;
	  return favorites.map((data, key) => (
  <Link key={key} to={`/property/${data.sfid}`}>
    <ListItem item={normalizeProperty(data)} />
  </Link>
	  ));
	};

	render() {
	  const { favorites } = this.state;
	  if (!favorites || favorites.length === 0) {
	    return null;
	  }
	  return (
  <div className="favorites">
    <Heading title="Favorites"/>
    <div className="favorites__list">{this.renderList()}</div>
  </div>
	  );
	}
}

export default Favorites;
