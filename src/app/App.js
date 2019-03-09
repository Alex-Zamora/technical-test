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

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="container">
          <Header />
          <Switch>
            <Route exact path='/' component={Login} />
            <Route exact path='/signup' component={Signup} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/create' component={CreateProduct} />
            <Route exact path='/edit/:id' component={EditProduct} />
            <Route path='*' component={NotFound} />
          </Switch>
          <ToastContainer />
        </div>
      </Router>
    )
  }
}
