import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import './styles.css'


const ListItem = ({ id, icon, text, className = '' }) => {
  return <li key={`${id}.${icon}.${text}`.replace(/\s/g, '-')} className={className}>
    {icon && <i className={`glyphicon glyphicon-${icon}`}> </i>}
    {text}
  </li>
}


class FeaturedPlan extends Component {

  static propTypes = {
    onSelection: PropTypes.func,
    buttonText: PropTypes.string,
    units: PropTypes.string,
    colSize: PropTypes.number,
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
    plan: PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.string.isRequired,
      price: PropTypes.number,
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      customBtnText: PropTypes.string,
      featuredItems: PropTypes.arrayOf(
        PropTypes.shape({
          text: PropTypes.string.isRequired,
          icon: PropTypes.string,
        })
      ),
      available: PropTypes.bool,
    }).isRequired,
  }

  static defaultProps = {
    colSize: 4,
    units: '$',
    buttonText: 'ORDER NOW',
    plan: {
      className: '',
      color: 'one',
      price: '--',
      available: true,
    },
  }

  render() {

    const {
      onSelection,
      buttonText,
      units,
      colSize,
      image,
      plan: {
        id: planId,
        price,
        featuredItems,
        color,
        name: planName,
        available,
        className,
        customBtnText,
      },
    } = this.props

    // innerClassName :: String
    // (Gives color and style to wrapper)
    const innerClassName = `inner plan-bg-${color} ${className}`

    // optionAvailable :: Boolean
    // (Disables the button if plan is unavailable or no onSelection function)
    const optionNotAvailable = !(available && typeof onSelection === 'function')

    // showImage :: Boolean
    // (Render image if image object passed into props)
    const showImage = Boolean(image && typeof image === 'object')

    const payCycleLabel = typeof price === 'number' ? 'per month' : 'negotiatable'
    const priceLabel = `price ${typeof price !== 'number' ? 'label' : ''}`

    return <div className={innerClassName}>

      <section className={priceLabel}>
        {units && <sup>{units}</sup>}{price}
        <small>{payCycleLabel}</small>
      </section>

      <section className="type-wrapper">
        <div className="type">
          {planName}
        </div>
      </section>

      <section className="featured">
        {featuredItems && <ul>{featuredItems.map(ListItem)}</ul>}
        {showImage && <div className="img img-responsive"><img src={image.src} alt={Image.alt} /></div>}
      </section>

      <div className="purchase-plan">
        <button
          onClick={() => onSelection(planId)}
          disabled={optionNotAvailable}
          className="btn-lg purchase-btn"
        >
          {customBtnText || buttonText}
        </button>
      </div>
    </div>
  }
}

export default FeaturedPlan
