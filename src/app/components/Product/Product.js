import React, { Component } from 'react';

// Style
import './Product.sass';
import '../../snipper-product.css';

const _loaded = {};

class Product extends Component {

  state = {
    loaded: _loaded[this.props.product.thumbnailImage]
  }

  static defaultProps = {
    className: "",
    loadingClassName: "img-loading",
    loadedClassName: "img-loaded"
  };

  onLoad = () => {
    _loaded[this.props.product.thumbnailImage] = true;
    this.setState(() => ({ loaded: true }));
  };

  render() {
    let { className, loadedClassName, loadingClassName, ...props } = this.props;
    const { productDisplayName, thumbnailImage, listPrice } = this.props.product;

    let stars = [];
    for (let i=0; i<5; i++) {
      stars.push(<i key={i} className="far fa-star"></i>);
    }

    className = `${className} ${this.state.loaded
      ? loadedClassName
      : loadingClassName}`;

    return (
      <React.Fragment>
      <div className="product-card">
        {
          !this.state.loaded &&
          <div className="sk-fading-circle">
            <div className="sk-circle1 sk-circle"></div>
            <div className="sk-circle2 sk-circle"></div>
            <div className="sk-circle3 sk-circle"></div>
            <div className="sk-circle4 sk-circle"></div>
            <div className="sk-circle5 sk-circle"></div>
            <div className="sk-circle6 sk-circle"></div>
            <div className="sk-circle7 sk-circle"></div>
            <div className="sk-circle8 sk-circle"></div>
            <div className="sk-circle9 sk-circle"></div>
            <div className="sk-circle10 sk-circle"></div>
            <div className="sk-circle11 sk-circle"></div>
            <div className="sk-circle12 sk-circle"></div>
          </div>
        }
        <img 
          src={thumbnailImage[0]}
          className={className}
          onLoad={this.onLoad}
          alt={{productDisplayName}}
        />
        <div className="desc">
          <div className="star-content">
            { stars }
          </div>
          <h2>{productDisplayName}</h2>
          <span>$ {listPrice[0]}</span>
        </div>
      </div>
      </React.Fragment>
    )
  }
}

export default Product;