import React from 'react';
import { formatter } from '../../constants';

const ListItem = ({ item,onClick,data }) => {
 return <div className="listItem" onClick={()=>onClick(data)}>
    <div className="listItem__thumbnail">
      <img src={item.thumbnail} alt="thumbnail" />
    </div>
    <div className="listItem__details">
      <h2 className="listItem__details-title">{item.name}</h2>
      <p className="listItem__details-desc">
        {item.desc}
      </p>
    </div>
  </div>
}

export default ListItem;
