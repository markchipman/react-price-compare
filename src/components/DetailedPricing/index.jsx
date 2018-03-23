import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import './styles.css'


class DetailedPricing extends Component {

  static propTypes = {
    inverse: PropTypes.bool,
    features: PropTypes.shape({}).isRequired,
    plans: PropTypes.arrayOf(
      PropTypes.shape({
        color: PropTypes.string,
        className: PropTypes.string,
        id: PropTypes.string.isRequired,
        name: PropTypes.node.isRequired,
        price: PropTypes.node,
        featuredItems: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.node.isRequired,
            icon: PropTypes.string,
          })
        ),
        details: PropTypes.arrayOf(
          PropTypes.shape({
            text: PropTypes.string.isRequired,
            icon: PropTypes.string,
          })
        ),
        available: PropTypes.bool,
      })
    ).isRequired,
  }

  static defaultProps = {
    details: {},
    inverse: true,
  }

  static renderHead = plan => {
    return (
      <th
        key={plan.id}
        className={`plan-name ${plan.className || ''}`}
      >
        {plan.name}
      </th>
    )
  }

  static renderRowItem = ({ planFeature, planId, columnClass }) => {
    const displayValue = planFeature.value || planFeature.defaultValue
    const className = `${columnClass} ${displayValue ? 'plan-value' : 'empty'}`

    return (
      <td
        className={`${ className } text-center`}
        key={planId}
      >
        <span className={columnClass || 'text-muted'}>
          {displayValue || '--'}
        </span>
      </td>
    )
  }

  static renderFeatureRow = plans => feature => {
    const planFeatures = plans.map(plan => {
      const planFeature = plan.details.find(
        feat => feat.name === feature.name
      )
      return {
        planId: plan.id,
        planFeature: planFeature || feature,
        columnClass: plan.className || '',
      }
    })

    return (
      <tr
        key={feature.name}
      >
        <td key='first-td' className='feature-name'>
          <strong>{feature.name}</strong>
        </td>
        {planFeatures && planFeatures.map(
          DetailedPricing.renderRowItem
        )}
      </tr>
    )
  }

  constructor(props) {
    super(props)
    this.state = { ...props }
    this.state.features = Reflect.ownKeys(props.features || {})
      .map(key => props.features[key]())
      .sort((a, b) => a.rank <= b.rank ? -1 : 1)
  }

  render() {
    const { plans, features, inverse } = this.state
    const { renderHead, renderFeatureRow } = DetailedPricing

    return (
      <div className="plans-comparison">
        <table className={`table table-sm ${inverse ? 'inverse' : ''}`}>
          <thead>
            <tr>
              <th key='details-heading' className='features-column'>
                <span>Features</span>
              </th>
              {plans && plans.map(renderHead)}
            </tr>
          </thead>
          <tbody>
            {features && features.map(renderFeatureRow(plans))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default DetailedPricing
