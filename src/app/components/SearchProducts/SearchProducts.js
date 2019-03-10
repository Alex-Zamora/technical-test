import React, { Component } from 'react';

//Style
import './SearchProducts.sass';
import '../../spinner.css';

// Component
import Product from '../Product/Product';
import SearchBar from '../SearchBar/SearchBar';

class SearchProducts extends Component {

  state = {
    term: '',
    products: [],
    page: 1,
    loading: false,
    error: '',
    searchHistory: JSON.parse(localStorage.getItem('searchHistory')) || []
  }

  searchProducts = async () => {
    const { term, page } = this.state;
    const urlApi = `https://www.liverpool.com.mx/tienda/page-${page}?s=
    ${term}&d3106047a194921c01969dfdec083925=json`;
    
    if (term) {
      await fetch(urlApi, {
        method: 'GET',
      })
      .then(res => {
        this.setState({
          loading: true
        });
        return res.json()
      }) 
      .then(data => {
        if (data.contents) {
          if (data.contents[0].mainContent[0]['@type'] === 'ContentSlotMain') {
            const records = data.contents[0].mainContent[1].contents[0].records;
            const totalRecords = data.contents[0].mainContent[1].contents[0].totalNumRecs;

            // History
            let currentSearchHistory = this.state.searchHistory.slice(0);
            console.log(currentSearchHistory);
            let newReadLaterState = [...currentSearchHistory, term];
            this.setState({
              searchHistory: newReadLaterState,
            });
            localStorage.setItem('searchHistory', JSON.stringify(newReadLaterState));
            // History

            setTimeout(() => {
              this.setState({
                error: '',
                redirect: '',
                totalRecords: totalRecords,
                products: records,
                loading: false,
              })
            }, 300)
          } else if (data.contents[0].mainContent[0]['@type'] === 'SearchAdjustments') {
            const records = data.contents[0].mainContent[3].contents[0].records;
            const totalRecords = data.contents[0].mainContent[3].contents[0].totalNumRecs;

            // History
            let currentSearchHistory = this.state.searchHistory.slice(0);
            console.log(currentSearchHistory);
            let newReadLaterState = [...currentSearchHistory, term];
            this.setState({
              searchHistory: newReadLaterState,
            });
            localStorage.setItem('searchHistory', JSON.stringify(newReadLaterState));
            // History

            if (records.length > 0) {
              setTimeout(() => {
                this.setState({
                  error: '',
                  redirect: '',
                  totalRecords: totalRecords,
                  products: records,
                  loading: false,
                })
              }, 300)
            } else {
              setTimeout(() => {
                this.setState({
                  loading: false,
                  products: [],
                  redirect: '',
                  error: 'Product not found'
                });
              }, 300)
            }
          }
        } else {
          // History
          let currentSearchHistory = this.state.searchHistory.slice(0);
          console.log(currentSearchHistory);
          let newReadLaterState = [...currentSearchHistory, term];
          this.setState({
            searchHistory: newReadLaterState,
          });
          localStorage.setItem('searchHistory', JSON.stringify(newReadLaterState));
          // History
          if(data['endeca:redirect']['@type'] === 'Redirect'){
            setTimeout(() => {
              this.setState({
                error: '',
                products: [],
                redirect: `https://www.liverpool.com.mx${data['endeca:redirect'].link.url}`,
                loading: false,
              });
            }, 300)
          }
        }
      })
      .catch(err => {
        console.log('Error');
        console.log(err);
        setTimeout(() => {
          this.setState({
            loading: false,
            products: [],
            error: 'Product not found'
          });
        }, 300)
      });
    } else {
      this.setState({
        redirect: '',
        products: [],
        error: 'Please enter a valid value',
        inputEmpty: 'Please enter a valid value'
      })
    }
  }

  nextPage = () => {
    console.log(this.numPages());
    let { page  } = this.state;
    if (page < this.numPages()) {
      page += 1;
      this.setState({
        page
      }, () => {
        this.searchProducts();
      });
    }
  }

  prevPage = () => {
    let { page } = this.state;
    if (page === 1) return null;
    page -= 1;
    this.setState({
      page
    }, () => {
      this.searchProducts();
    });
    
  }

  numPages = () => {
    const perPage = 60;
    return Math.ceil(this.state.totalRecords / perPage);
  }

  handleTermChange = (term) => {
    this.setState({
      term: term
    });
  }

  render() {
    const { products, loading, error, 
      inputEmpty, redirect, searchHistory } = this.state;
    
    let result;
    if (loading) {
      result = <div className="spinner">
                <div className="double-bounce1"></div>
                <div className="double-bounce2"></div>
              </div>
    } else {
      if (redirect) {
        result = <div className='redirect'>
                  <span>Visita:</span>
                  <a href={redirect} target='_blank'>
                    {redirect}
                  </a>
                </div>
      } else if (error) {
        result = <p className='error-not-found'>{error}</p>
      } else {
        result = (products.length > 0)
        ? ( products.map((product, key) => (
            <Product key={key} product={product} />
          )) )
        : null
      }
    }

    //Search History
    let searchResult;
    if (searchHistory.length > 0) {
      searchResult = ( searchHistory.map((term, key) => {
                      return (
                        <li key={key}>
                          <span>{term}</span>
                        </li>
                      )
                    }) )
    } else {
      searchResult = <span>Dont exist terms search</span>
    }

    return (
      <div className='wrapper-search-products'>
        <div className="sidebar">
          <div className="header">
            <h3>History</h3>
          </div>
          <div className="search-history">
            <ul>
              {
                searchResult
              }
            </ul>
          </div>
        </div>
        <div className="main">
          <SearchBar 
            onTermChange={this.handleTermChange}
            searchProducts={this.searchProducts}
            inputEmpty={inputEmpty}
          />

          {
            (products.length > 0) &&
              <div className="nav-page">
                <button className='btn prev' 
                  onClick={this.prevPage}>
                  Prev
                </button>
                <button className='btn next' 
                  onClick={this.nextPage}>
                    Next
                </button>
              </div>
          }
          <div className="wrapper-result">
            {
              result
            }
          </div>
        </div>
      </div>
    )
  }
}

export default SearchProducts;