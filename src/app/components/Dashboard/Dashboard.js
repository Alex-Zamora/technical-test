import React, { Component } from "react";
import { Link } from 'react-router-dom';

// Style
import './Dashboard.sass';

// Components
import ListProduct from '../ListProducts/ListProducts';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <div className="sub-header">
          <div className="create">
            <Link to='/create' className='btn btn-success' >
              <i className="fas fa-plus"></i>
              Create Product
            </Link>
          </div>
          <h1>Product List</h1>
        </div>
        <ListProduct />
      </div>
    );
  }
}
