import React, { Component } from 'react';

import image1 from '../../assets/images/slide_properties.jpg';
import image2 from '../../assets/images/slide_brokers.jpg';
import image3 from '../../assets/images/slide_favorites.jpg';

import {data} from '../../constants'
import Heading from '../../shared/components/Heading'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPage: 1
    };
  }

	renderPage = () => {
	  const { selectedPage } = this.state;
	  return data.map(
	    (item, key) => selectedPage === item.id && (
					<div key={key} className="item">
  <img src={item.image} />
  <div className="item__note">{item.note}</div>
					</div>
	      )
	  );
	};

	onNumberClick = (pageNum) => {
	  this.setState({
	    selectedPage: pageNum
	  });
	};

	render() {
	  const pageNumbers = [1, 2, 3];
	  const { selectedPage } = this.state;
	  return (
  <div className="home">
  <Heading title="Welcome"/>
    {this.renderPage()}
    <div className="pageNumbers">
      {pageNumbers.map((item,key) => (
        <div
          className={selectedPage === item ? 'page activePage' : 'page'}
		  onClick={() => this.onNumberClick(item)}
		  key={key}
        >
          {item}
        </div>
      ))}
    </div>
  </div>
	  );
	}
}

export default Home;
