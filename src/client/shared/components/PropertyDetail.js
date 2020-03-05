import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';

import Heading from './Heading';
import axios from 'axios';
import { formatter } from '../../utils';

class PropertyDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      property: null,
      brokers: null,
      favorites: null,
      isFavorite: false,
      selected: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios.get(`/property/${id}`)
      .then(res => this.setState({ property: res.data }))
    axios.get('/broker')
      .then(res => this.setState({ brokers: res.data }))
    axios.get('/favorite')
      .then(res => this.setState({ favorites: res.data }))
  }
  onFavAdd = () => {
    const { property, favorites } = this.state;
    axios.post("/favorite", { property__c: property.sfid })
      .then(res => {
        if (res.data) {
          alert("Property added to favorites")
        }
      })
      .catch(err => console.log(err))

  }
  onBrokerClick = (id) => {
    this.props.history.push(`/broker/${id}`)
  }
  changeSelected = () => {
    this.setState({ selected: true })
  }
  renderItem = () => {
    const { property, brokers, favorites, selected } = this.state;
    if (!property || !brokers || brokers.length === 0) {
      return null
    }
    let fav=null
    if(favorites&&favorites.length!==0){
      fav = favorites.find(item => item.sfid === property.sfid)
    }
    const {
      picture__c, beds__c, baths__c, price__c, title__c, city__c, state__c, broker__c
    } = property;
    const relatedBroker = brokers.find(item => item.sfid === broker__c);
    const sec2Data = [
      {
        icon: 'king_bed',
        text: 'Bedrooms',
        number: beds__c
      },
      {
        icon: 'bathtub',
        text: 'Bathrooms',
        number: baths__c
      },
      {
        icon: 'local_offer',
        text: 'Asking Price',
        number: formatter.format(price__c)
      }
    ];

    return (
      <div className="property__item">
        <img src={picture__c} />
        <div className="property__details">
          <div className="property__details-sec1">
            <div>
              <h2 className="title">{title__c}</h2>
              <p className="desc">
                {city__c}
                ,
          {state__c}
                -
          {formatter.format(price__c)}
              </p>
            </div>
            <div onClick={fav ? () => { } : this.onFavAdd}>
              <i className="material-icons">
                {fav ? "star" : <label title="Add to favorites" onClick={this.changeSelected}>{selected ? "star" : "star_border"}</label>}
              </i>
            </div>
          </div>
          <div className="property__details-sec2">
            {sec2Data.map((item, key) => (
              <div key={key} className="subSec">
                <div className="subSec__details">
                  <i className="material-icons">{item.icon}</i>
                  <span className="subSec__details-text">{item.text}</span>
                </div>
                <span className="subSec__number">{item.number}</span>
              </div>
            ))}
            <div className="broker" onClick={() => this.onBrokerClick(relatedBroker.sfid)}>
              <div className="broker__image">
                <img src={relatedBroker.picture__c} alt="brokerImg" />
              </div>
              <div className="broker__details">
                <h2>{relatedBroker.name}</h2>
                <p>{relatedBroker.title__c}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { property, brokers, prevPath } = this.state;
    const { location } = this.props
    if (!property || !brokers || brokers.length === 0) {
      return null;
    }
    return (
      <div className="property">
        <Heading
          title={property.title__c}
          linkTitle="Back"
          icon="keyboard_arrow_left"
          link={true}
        />
        {this.renderItem()}
      </div>
    );
  }
}

export default withRouter(PropertyDetail);
