import React from 'react';
import { Link } from 'react-router-dom';
import './Header.sass';

const Header = (props) => {
  const user = localStorage.getItem('currentUser');
  return (
    <header>
      <h1>Liverpool App</h1>
      <div className="buttons">
        {
          user
          ? (
            <Link className="search" to='/dashboard'>
              {/* <i className="fas fa-table"></i> */}
              Dashboard
            </Link>
          )
          : ''
        }
        {
          user
          ? (
            <Link className="search" to='/search'>
              {/* <i className="fas fa-search"></i> */}
              Search
            </Link>
          )
          : ''
        }
        {
          user
          ? (
            <Link className="logout" onClick={props.logout} to='/'>
              <i className="fas fa-lock"></i>
              Logout
            </Link>
          )
          : ''
        }
      </div>
    </header>
  )
}

export default Header
