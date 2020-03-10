import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import ReactList from 'react-list';
import InfiniteScroll from "react-infinite-scroll-component";


import Heading from '../../shared/components/Heading'
import ListItem from '../../shared/components/ListItem'
import axios from 'axios';

import { normalizeProperty } from '../../utils'

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: null,
      searchInput: "",
      filteredProperties: [],
      isFavorite: false,
      items: Array.from({ length: 20 })
    };
  }

  componentDidMount() {
    const { properties } = this.props
    if(properties&&properties.length!==0){
      this.setState({ filteredProperties: properties })
    }
  }
  fetchMoreData = () => {
    // a fake async api call like which sends
    // 100 more records in 1 secs
    setInterval(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 20 }))
      });
    }, 1500);
  };
  onFieldChange = (e) => {
    const { value } = e.target
    const { properties } = this.state
    if (!properties) {
      return
    }
    const filteredProperties = properties.filter(item => item.title__c.toLowerCase().includes(value.toLowerCase()))
    this.setState({
      searchInput: value,
      filteredProperties
    })
  }
  onItemSelect = (prop) => {
    const { history } = this.props;
    history.push(`/property/${prop.sfid}`);
  };

  renderItem = (index) => {
    let { filteredProperties } = this.state
    const {favorites} =this.props
    let found
    if(index<filteredProperties.length){
      found = favorites.find(item=>item.sfid===filteredProperties[index].sfid)
    } 
    if (index >= filteredProperties.length) {
      return
    }
    return <ListItem item={normalizeProperty(filteredProperties[index])} from="property" key={index} data={filteredProperties[index]} onClick={this.onItemSelect} isFavorite={found} />
  }


  render() {
    const { searchInput,filteredProperties } = this.state
    return <div className="properties">
      <Heading title="Properties" link={false} />
      <input value={searchInput} placeholder="Type property title to search...." onChange={this.onFieldChange} />

      {filteredProperties && filteredProperties.length === 0 ? <div className="statement">No search results found</div> : <div>
        <div style={{ overflow: 'auto', maxHeight: "75vh" }}>
          <InfiniteScroll
            dataLength={this.state.items.length}
            next={this.fetchMoreData}
            hasMore={true}
            loader={<h4>Loading...</h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {this.state.items.map((i, index) => (
              this.renderItem(index)
            ))}
          </InfiniteScroll>
        </div>
      </div>}
    </div>;
  }
}

export default withRouter(Properties);
