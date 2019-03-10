import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styles
import './CreateProduct.sass';

export default class CreateProduct extends Component {

  state = {
    name: '',
    price: '',
    image: '',
    errors: {
      name: null,
      price: null,
      image: null
    }
  }

  handleCreate = (e) => {
    e.preventDefault();
    const target = e.currentTarget;
    this.setState({submitted: true});
    const { name, price, image } = this.state;

    const formData = new FormData();
    formData.append('image', image);
    formData.append('name', name);
    formData.append('price', price);

    const user =  JSON.parse(localStorage.getItem('currentUser'));
    if (user.success && user.token) {
      fetch('api/products', {
        method: 'POST',
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
              name: null,
              price: null,
              image: null
            },
            submitted: false
          });
          toast.success('Product created');
          // Reset form
          target.reset();
          // Redirect dashboard
          this.props.history.push('/dashboard');
        } else {
          console.log(data);
          this.setState({
            errors: data.errors
          });
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
    this.setState({image: e.target.files[0]});
  }

  render() {
    const { submitted, errors, name, price, image } = this.state;
    return (
      <div>
        <div className="sub-header">
          <div className="create">
            <Link to='/dashboard' className='btn'>
              <i className="fas fa-chevron-left"></i>
              Product List
            </Link>
          </div>
          <h1>Create Product</h1>
        </div>

        <div className="wrapper-create">
          <form 
            className="create"
            onSubmit={this.handleCreate}>
            <input 
              type="text"
              placeholder='Name'
              onChange={this.handleChange('name')}
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
              Create Product
            </button>
          </form>
        </div>
      </div>
    )
  }
}
