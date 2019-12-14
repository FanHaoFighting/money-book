import React from "react"
import 'bootstrap/dist/css/bootstrap.min.css'
import PropTypes from 'prop-types'


const PriceList = ({items, onModifyItem, onDeleteItem }) => {
  return (
    <ul className="list-group list-group-flush">
      {items.map(item => (
        <li
          className="list-group-item d-flex
          justify-content-between align-items-center
          "
          key={item.id}
        >
        <span>
          {item.title}
        </span>
        <span className="col-5">{item.title}</span>
            <span className="col-2 font-weight-bold">
              {(item.type === 'income') ? '+' : '-'}
              {item.price}元
            </span>
            <span className="col-2">{item.date}</span>
        </li>
      ))}
    </ul>
  );
};

// propTypes首字母为小写
PriceList.propTypes = {
  items: PropTypes.array.isRequired,
  onModifyItem: PropTypes.func.isRequired,
  onDeleteItem: PropTypes.func.isRequired,
}

export default PriceList;
