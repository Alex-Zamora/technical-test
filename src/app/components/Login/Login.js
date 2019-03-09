import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

// Styles
import './Login.sass';

class Login extends Component {

  state = {
    email: '',
    password: '',
    errors: {}
  }

  handleLogin = (e) => {
    e.preventDefault();
    const target = e.currentTarget;

    this.setState({ submitted: true });
    const { email, password } = this.state;

    // stop here if form is invalid
    if (!(email && password)) {
      return;
    }

    // Obj user
    const user = {
      email,
      password
    }

    fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => res.json())
    .then(data => {
      // Login successful
      if (data.success) {
        localStorage.setItem('currentUser', JSON.stringify(data));
        this.setState({
          email: '',
          password: '',
          errors: {
            email: '',
            password: ''
          },
          submitted: false
        });
        toast.success('Successful Login');
        // Reset form
        target.reset();
        // Redirect dashboard
        this.props.history.push('/dashboard');
      } else {
        this.setState({
          errors: data.errors
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

  render() {
    const { email, password, submitted, errors } = this.state;
    return (
      <div className='wrapper-login'>
        <form className="login" onSubmit={this.handleLogin}>
          <div className="title">
            <h3>Login</h3>
            <p>Welcome to the Restaurant App.</p>
          </div>
          <input
            className={`form-control
              ${(submitted && !email) || errors.email
                ? ' is-invalid' 
                : ''}`}
            type='text'
            placeholder='Email'
            onChange={this.handleChange('email')}
          />
          {
            submitted && !email &&
            <div className="is-required">Email is required</div>
          }
          {
            errors.email && email &&
              <div className="is-required">
                { errors.email }
              </div>
          }
          <input
            className={`form-control
              ${(submitted && !password) || errors.password
                ? ' is-invalid' 
                : ''}`}
            type='password' 
            placeholder='Password'
            onChange={this.handleChange('password')}
          />
          {
            submitted && !password &&
            <div className="is-required">Password is required</div>
          }
          {
            errors.password && password &&
              <div className="is-required">
              { errors.password }
              </div>
          }
          <button className='btn btn-login' type='submit'>Login</button>
        </form>
        <Link to='/signup' className='link'>
          Dont have an account? - Sign UP
        </Link>
        {/* {
          error &&
          <div className="alert" role="alert">
            {this.state.error}
          </div>
        } */}
      </div>
    )
  }
}

export default Login;