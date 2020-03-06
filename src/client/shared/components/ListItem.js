import React from 'react';
import { formatter } from '../../constants';

const ListItem = ({ item, onClick, data, deletable, onClickDelete }) => {
  return <div className="listItem" >
    <div className="listItem__thumbnail" onClick={() => onClick(data)}>
      <img src={item.thumbnail} alt="thumbnail" />
    </div>
    <>
      <div className="listItem__details" onClick={() => onClick(data)}>
        <h2 className="listItem__details-title">{item.name}</h2>
        <p className="listItem__details-desc">
          {item.desc}
        </p>
        {item.address && <p className="listItem__details-desc">
          {item.address}
        </p>}
      </div>
      {deletable && <div onClick={() => onClickDelete(data)}>
        <i className="material-icons">
          delete
</i></div>}
    </>
  </div>
}

export default ListItem;
