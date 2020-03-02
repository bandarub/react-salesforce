import React, { Component } from 'react';
import { withRouter,Link } from 'react-router-dom';
import axios from 'axios';

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
    axios.get('/favorite')
      .then(res => this.setState({ favorites: res.data }))
  }

	onItemSelect = (prop) => {
	  const { history } = this.props;
	  history.push(`/property/${prop.sfid}`);
	};

	renderList = () => {
	  const { favorites } = this.state;
	  return favorites.map((data, key) => (
  <ListItem item={normalizeProperty(data)} key={key} data={data} onClick={this.onItemSelect} deletable={false} onClickDelete={this.onFavDelete}/>
	  ));
	};
  onFavDelete=(item)=>{
    axios.delete(`/favorite/${item.sfid}`).then(res=>console.log(res))
  }
	render() {
	  const { favorites } = this.state;
	  return (
  <div className="favorites">
    <Heading title="Favorites" />
	{(!favorites || favorites.length === 0) ? null:<div className="favorites__list">{this.renderList()}</div>}
    
  </div>
	  );
	}
}

export default withRouter(Favorites);
