import React, { Component } from 'react';
import {withRouter,Link} from 'react-router-dom';

import Heading from '../../shared/components/Heading'
import ListItem from '../../shared/components/ListItem'

import {formatter} from '../../constants'
import {normalizeProperty} from '../../utils'

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
  onItemSelect = (property) => {
    const { history } = this.props;
    history.push(`/property/${prop.sfid}`);
  };

  renderList = () =>{
      const {filteredProperties} = this.state
      if(!filteredProperties){
        return
    } 
      return filteredProperties.map((prop,key)=>
        <ListItem item={normalizeProperty(prop)} key={key} data={prop} onClick={this.onItemClick}/>
     )
  }
  

  render() {
      const {searchInput,properties}=this.state
    return <div className="properties">
    <Heading title="Properties" link={false}/>
    <input value={searchInput} placeholder="Type property title to search...." onChange={this.onFieldChange}/>
    <div className="properties__list">
    {this.renderList()}
        </div></div>;
  }
}

export default withRouter(Properties);
