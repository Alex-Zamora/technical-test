import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styles
import './ListProducts.sass';

export default class ListProducts extends Component {

  state = {
    products: []
  }

  componentDidMount() {
    this.getAllProducts();
  }

  getAllProducts = () => {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    if (user.success && user.token) {
      fetch('/api/products', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })
      .then(res => res.json())
      .then(data => {
        this.setState({
          products: data.products
        })
      })
      .catch(err => console.log(`Error ${err}`));
    } else {
      return toast.error('Token not valid or don´t exists');
    }
  }

  deleteProduct = (id) => {
    let user = JSON.parse(localStorage.getItem('currentUser'));

    if (window.confirm("Are you sure you want deleted it?")) {
      fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': user.token
        }
      })
      .then(res => res.json())
      .then(data => {
        toast.success('Restaurant deleted with success')
        this.getAllProducts();
      })
      .catch(err => console.log(`Error ${err}`))
    }
  }

  render() {
    return (
      <React.Fragment>
      <div className="products-list">
        <table className="table">
          <thead className='thead'>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Image</th>
              <th scope="col">Name</th>
              <th scope="col">Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.products.map((product, key) => {
                return (
                <tr key={key}>
                  <th scope="row">{key + 1}</th>
                  <td>
                    <img src={product.image} alt={product.name}/>
                  </td>
                  <td>{product.name}</td>
                  <td>$ {product.price}</td>
                  <td className='actions'>
                    <Link 
                      to={`/edit/${product._id}`} 
                      className='btn btn-info'>
                      Edit
                    </Link>
                    <button
                      className='btn btn-danger'
                      onClick={() => this.deleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </React.Fragment>
    )
  }
}
