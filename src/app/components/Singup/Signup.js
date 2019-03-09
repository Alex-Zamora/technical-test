import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styles
import './Signup.sass';

export default class Register extends Component {
  _isMounted = false;

  state = {
    name: '',
    paternalSurname: '',
    email: '',
    password: '',
    errors: {
      name: '',
      paternalSurname: '',
      email: '',
      password: ''
    }
  }

  handleRegister = e => {
    this._isMounted = true;

    e.preventDefault();
    const target = e.currentTarget;

    this.setState({ submited: true });

    const { name, paternalSurname,
      email, password } = this.state;

    if ( !(name && paternalSurname && email && password ) ){
      return;
    }

    const user = {
      name,
      paternalSurname,
      email,
      password,
    }

    fetch('/api/users/register', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'Application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        if (this._isMounted) {
          // Reset state
          this.setState({
            name: '',
            paternalSurname: '',
            email: '',
            password: '',
            errors: {
              name: '',
              email: '',
              paternalSurname: '',
              password: ''
            },
            submited: false
          });
        }
        toast.success('User registered with success!');
        // Reset form
        target.reset();
        // Redirect Login
        this.props.history.push('/');
      } else {
        this.setState({
          errors: {
            name: data.errors.name,
            email: data.errors.email,
            password: data.errors.password
          }
        });
      }
    })
    .catch(err => console.log(`Error ${err}`));
  }

  handleChange = input => event => {
    this.setState({
      [input]: event.target.value
    })
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { name, paternalSurname, email, 
      password, errors, submited } = this.state;
    return (
      <div className='wrapper-register'>
        <form className="register" onSubmit={this.handleRegister}>
          <div className="title">
            <h3>Sign Up</h3>
            <p>Welcome to the Restaurant App.</p>
          </div>
          <input
            className={`form-control
              ${(submited && !name) || errors.name
                ? ' is-invalid' 
                : ''
            }`}
            type='text'
            placeholder='Name'
            onChange={this.handleChange('name')}
          />
          {
            submited && !name &&
            <div className="is-required">Name is required</div>
          }
          {
            errors.name && name &&
              <div className="is-required">
                { errors.name }
              </div>
          }
          <input
            className={`form-control  
              ${(submited && !paternalSurname) || errors.paternalSurname 
                ? ' is-invalid' 
                : ''
            }`}
            type='text'
            placeholder='Paternal Surname'
            onChange={this.handleChange('paternalSurname')}
          />
          {
            submited && !paternalSurname &&
            <div className="is-required">Paternal Surname is required</div>
          }
          
          <input
            className={`form-control  
              ${(submited && !email) || errors.email
                ? ' is-invalid' 
                : ''
            }`}
            type='text'
            placeholder='Email'
            onChange={this.handleChange('email')}
          />
          {
            submited && !email &&
            <div className="is-required">Maternal Surname is required</div>
          }
          {
            errors.email && email &&
              <div className="is-required">
                { errors.email }
              </div>
          }

          <input
            className={`form-control  
              ${(submited && !password) || errors.password
                ? ' is-invalid' 
                : ''
            }`}
            type='password' 
            placeholder='Password'
            onChange={this.handleChange('password')}
          />
          {
            submited && !password &&
            <div className="is-required">Password is required</div>
          }
          {
            errors.password && password &&
              <div className="is-required">
                { errors.password }
              </div>
          }

          <button className='btn btn-login' type='submit'>
            Sign Up
          </button>
        </form>
        <Link to='/' className='link'>
          Already have an account? Log In
        </Link>
      </div>
    )
  }
}