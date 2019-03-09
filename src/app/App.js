import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import '../public/ReactToastify.css';

// Style
import './App.sass';

//Components
import Login from './components/Login/Login';
import Signup from './components/Singup/Signup';
import NotFound from './components/NotFound/NotFound';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProduct from './components/CreateProduct/CreateProduct';
import EditProduct from './components/EditProduct/EditProduct';
import Header from './Components/Header/Header';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import LoginRoute from './components/LoginRoute/LoginRoute';

export default class App extends Component {

  logout = () => {
    localStorage.removeItem('currentUser');
  }

  render() {
    return (
      <Router>
        <div className="container">
          <Header logout={this.logout} />
          <Switch>
            <LoginRoute exact path='/' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <PrivateRoute exact path='/dashboard' component={Dashboard} />
            <PrivateRoute exact path='/create' component={CreateProduct} />
            <PrivateRoute exact path='/edit/:id' component={EditProduct} />
            <Route path='*' component={NotFound} />
          </Switch>
          <ToastContainer />
        </div>
      </Router>
    )
  }
}
