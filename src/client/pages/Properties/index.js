import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import Heading from '../../shared/components/Heading'
import PropertyListItem from '../../shared/components/PropertyListItem'

import {formatter} from '../../constants'

class Properties extends Component {
  constructor(props) {
    super(props);
    this.state = {
      properties: null,
      searchInput:"",
      filteredProperties:[]
    };
  }

 componentDidMount() {
    fetch('http://localhost:8080/property')
      .then(response => response.json())
      .then(data => this.setState({ properties: data,filteredProperties:data }));
  }

  onFieldChange=(e)=>{
      const {value}=e.target
      const {properties}=this.state
      if(!properties){
        return
    }
      const filteredProperties = properties.filter(item=>item.title__c.toLowerCase().includes(value.toLowerCase()))
      this.setState({
        searchInput:value,
        filteredProperties
      }) 
  }

  renderList = () =>{
      const {filteredProperties} = this.state
      if(!filteredProperties){
        return
    }
      return filteredProperties.map((item,key)=><Link key={key} to={`/property/${item.sfid}`}>
        <PropertyListItem item={item} />
      </Link>)
  }

  render() {
      const {searchInput,properties}=this.state
      console.log(properties)
    return <div className="properties">
    <Heading title="Properties"/>
    <input value={searchInput} placeholder="Type property title to search...." onChange={this.onFieldChange}/>
    <div className="properties__list">
    {this.renderList()}
        </div></div>;
  }
}

export default Properties;
