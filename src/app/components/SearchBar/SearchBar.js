import React, { Component } from 'react';

// Style
import './SearchBar.sass';

export default class SearchBar extends Component {

  state = {
    term: ''
  }

  onInputChange = (term) => {
    this.setState({term});
    this.props.onTermChange(term);
  }

  render() {
    return (
      <div className="seach-bar">
        <div className="input-group">
          <input 
            type="text" 
            placeholder='Search Products...'
            onChange={event => this.onInputChange(event.target.value)}
            onKeyPress={event => {
              if (event.key === 'Enter') {
                this.props.searchProducts()
              }
            }}
            className={`form-control
              ${this.props.inputEmpty && !this.state.term
                  ? 'is-invalid'
                  : ''
              }
            `}
          />
          {
            this.props.inputEmpty && !this.state.term &&
            <div className="is-required">
              { this.props.inputEmpty }
            </div>
          }
        </div>
        <div className="btn-search" onClick={this.props.searchProducts}>
          <i className="fas fa-search"></i>
        </div>
      </div>
    )
  }
}
