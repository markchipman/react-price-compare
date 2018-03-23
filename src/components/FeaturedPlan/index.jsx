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
    buttonText: PropTypes.node,
    units: PropTypes.string,
    colSize: PropTypes.number,
    image: PropTypes.shape({
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    }),
    plan: PropTypes.shape({
      color: PropTypes.string,
      name: PropTypes.node.isRequired,
      price: PropTypes.node,
      id: PropTypes.string.isRequired,
      className: PropTypes.string,
      customBtnText: PropTypes.string,
      payCycleLabel: PropTypes.string,
      trials: PropTypes.shape({
        top: PropTypes.object,
        bottom: PropTypes.object,
      }),
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
      payCycleLabel: '',
    },
    trials: {},
  }

  render() {

    const {
      onSelection,
      buttonText,
      units,
      colSize,
      image,
      plan: {
        payCycleLabel,
        id: planId,
        price,
        featuredItems,
        color,
        name: planName,
        available,
        className,
        customBtnText,
        trials,
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

    const priceLabel = `price ${typeof price !== 'number' ? 'label' : ''}`

    const showBottomTrial = trials && trials.bottom && trials.bottom.content
    const showTopTrial = trials && trials.top && trials.top.content

    return <div className={innerClassName}>

      <section className={priceLabel}>
        {units && <sup>{units}</sup>}{price}
        <small>{payCycleLabel}</small>
        { showTopTrial && (
          <div className="trial trial-top">
          <button 
            onClick={() => onSelection(trials.top.planId || planId)}
            className='btn trial-btn'
          >
            { trials.top.content }
          </button>
          </div>
        )}
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

      { showBottomTrial && (
        <div className="trial trial-bottom">
            <button 
              onClick={() => onSelection(trials.bottom.planId || planId)}
              className='btn trial-btn'
            >
              { trials.bottom.content }
            </button>
        </div>
      )}
    </div>
  }
}

export default FeaturedPlan
