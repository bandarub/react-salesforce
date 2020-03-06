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
      items: Array.from({ length: 100 })
    };
  }

  componentDidMount() {
    axios.get('/property')
      .then(res => this.setState({ properties: res.data, filteredProperties: res.data }))
      .catch(err => console.log("error:", err))
  }
  fetchMoreData = () => {
    // a fake async api call like which sends
    // 20 more records in 1.5 secs
    setTimeout(() => {
      this.setState({
        items: this.state.items.concat(Array.from({ length: 100 }))
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

  renderList = () => {
    const { filteredProperties } = this.state
    if (filteredProperties && filteredProperties.length === 0) {
      return <div className="statement">No search results found</div>
    }
    return filteredProperties.map((prop, key) =>
      <ListItem item={normalizeProperty(prop)} key={key} data={prop} onClick={this.onItemSelect} />
    )
  }
  renderItem = (index) => {
    let { filteredProperties } = this.state
    console.log(filteredProperties.length)
    if(index>=filteredProperties.length){
      return
    }
    return <ListItem item={normalizeProperty(filteredProperties[index])} key={index} data={filteredProperties[index]} onClick={this.onItemSelect} />
  }


  render() {
    const { searchInput, properties, filteredProperties } = this.state
    return <div className="properties">
      <Heading title="Properties" link={false} />
      <input value={searchInput} placeholder="Type property title to search...." onChange={this.onFieldChange} />

      {filteredProperties&&filteredProperties.length===0? <div className="statement">No search results found</div> : <div>
      <div style={{ overflow: 'auto', maxHeight: "75vh" }}>
        <InfiniteScroll
          dataLength={this.state.items.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{textAlign: 'center'}}>
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
