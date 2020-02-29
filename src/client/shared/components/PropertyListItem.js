import React from 'react'
import {formatter} from '../../constants'

const PropertyListItem =({item})=>{
    return <div className="listItem">
    <div className="listItem__thumbnail">
        <img src={item.thumbnail__c} alt="thumbnail"/>
    </div>
    <div className="listItem__details">
    <h2 className="listItem__details-title">{item.title__c}</h2>
      <p className="listItem__details-desc">
          {item.city__c},{item.state__c}-{formatter.format(item.price__c)}
      </p>
    </div>
</div>
}

export default PropertyListItem