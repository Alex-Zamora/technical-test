import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styles
import './EditProduct.sass';

export default class EditProduct extends Component {

  state = {
    name: '',
    price: '',
    image: '',
    newImage: '',
    errors: {
      name: null,
      price: null,
      image: null
    }
  }

  componentDidMount() {
    this.getProduct();
  }

  getProduct = () => {
    const { id } = this.props.match.params;
    const user =  JSON.parse(localStorage.getItem('currentUser'));

    fetch(`/api/products/${id}`, { 
      method: 'GET',
      headers: {
        'Authorization': user.token
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        this.setState({
          name: data.product.name,
          price: data.product.price,
          image: data.product.image
        });
      } else {
        res.status(402).json('Error at charge the product')
      }
    })
    .catch(err => console.log(err));
  }

  updateProduct = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    this.setState({submitted: true})
    const { name, price, image, newImage } = this.state;

    const currentImage = newImage ? newImage : image;
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('price', price);
    formData.append('image', currentImage);

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user.success && user.token) {
      const { id } = this.props.match.params;

      fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: formData,
        headers: {
          'Authorization': user.token
        }
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          this.setState({
            name: '',
            price: '',
            image: '',
            errors: {
              name: '',
              price: '',
              image: ''
            },
            submitted: false
          })
          toast.success('Updated Product');
          // Reset
          target.reset();
          // Redirect dashboard
          this.props.history.push('/dashboard');
        } else {
          this.setState({
            errors: data.errors
          })
        }
      })
      .catch(err => console.log(err));
    }
  }

  handleChange = input => event => {
    this.setState({
      [input]: event.target.value
    })
  }

  handleFileChange = (e) => {
    this.setState({newImage: e.target.files[0]})
  }

  render() {
    const { submitted, errors, name, price, image } = this.state;
    return (
      <div>
        <div className="sub-header">
          <div className="create">
            <Link to='/dashboard' className='btn btn-secondary'>
              <i className="fas fa-chevron-left"></i>
              Product List
            </Link>
          </div>
          <h1>Edit Product</h1>
        </div>

        <div className="wrapper-create">
          <form 
            className="create"
            onSubmit={this.updateProduct}>

            <img src={image} alt=""/>

            <input 
              type="text"
              placeholder='Name'
              onChange={this.handleChange('name')}
              defaultValue={name}
              className={`form-control 
                ${!name && submitted
                  ? 'is-invalid'
                  : ''
                }
              `}
            />
            {
              submitted && !name &&
                <div className="is-required">{errors.name}</div>
            }

            <input 
              type="text"
              placeholder='price'
              onChange={this.handleChange('price')}
              defaultValue={price}
              className={`form-control
                ${!price && submitted
                  ? 'is-invalid'
                  : ''
                }
              `}
            />
            {
              submitted && !price &&
                <div className="is-required">{errors.price}</div>
            }

            <p className='current-image'><span>Currently:</span>{ image }</p>

            <div className="image">
              <span>Change: </span>
              <input 
                type="file"
                // accept="image/*"
                onInput={(event)=> { 
                  this.handleFileChange(event) 
                }}
                className={`form-control-file
                  ${(!image && submitted) || errors.image
                    ? 'is-invalid-file'
                    : ''
                  }
                `}
              />
            </div>
            {
              submitted && !image &&
                <div className="is-required">{errors.image}</div>
            }
            {
              errors.image && image &&
                <div className="is-required">
                  { errors.image }
                </div>
            }

            <button className='btn btn-create'>
              Save
            </button>
          </form>
        </div>
      </div>
    )
  }
}
