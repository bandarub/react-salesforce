import React, { Component } from 'react';
import {withRouter,Link} from 'react-router-dom';
import ReactList from 'react-list';

import Heading from '../../shared/components/Heading'
import ListItem from '../../shared/components/ListItem'
import axios from 'axios';

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
    axios.get('/property')
      .then(res => this.setState({ properties: res.data,filteredProperties:res.data }))
      .catch(err=>console.log("error:",err))
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
  onItemSelect = (prop) => {
    const { history } = this.props;
    history.push(`/property/${prop.sfid}`);
  };

  renderList = () =>{
      const {filteredProperties} = this.state
      if(filteredProperties&&filteredProperties.length===0){
        return<div className="statement">No search results found</div>
      } 
      return filteredProperties.map((prop,key)=>
        <ListItem item={normalizeProperty(prop)} key={key} data={prop} onClick={this.onItemSelect}/>
     )
  }
  renderItem=(index,key)=>{
    const {filteredProperties} = this.state

    return <ListItem item={normalizeProperty(filteredProperties[index])} key={key} data={filteredProperties[index]} onClick={this.onItemSelect}/>
  }
  

  render() {
      const {searchInput,properties,filteredProperties}=this.state
    return <div className="properties">
    <Heading title="Properties" link={false}/>
    <input value={searchInput} placeholder="Type property title to search...." onChange={this.onFieldChange}/>
    <div style={{overflow: 'auto', maxHeight: "75vh"}}>
          <ReactList
            itemRenderer={this.renderItem}
            length={filteredProperties.length}
            type='uniform'
          />
        </div></div>;
  }
}

export default withRouter(Properties);
