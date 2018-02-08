import React, { Component } from "react"
import { render } from "react-dom"
import {
  FeaturedPricingPlans, DetailedPricing,
} from "./index"

import Plan from "./utils/plan.class.js"

const standardPlan = new Plan("std1mo", "Standard", 99, null, null)
  .addFeaturedItems(
  { text: 'Only 1 User' },
  { text: 'Single "My Carrier" carrier' },
  { text: 'Five Calculations/Month' },
  { text: 'Access Only to Standard Tools' }
  )
  .addDetails(
  Plan.Features.territory('None'),
  Plan.Features.numUsers(1),
  Plan.Features.myCarriers(1),
  Plan.Features.calculations('5/month')
  )


const proPlan = new Plan("pro1mo", "Pro", 499, null, null, "popular")
  .addFeaturedItems(
  { text: 'Ten Users' },
  { text: 'Ten "My Carrier" Carriers' },
  { text: 'Unlimited Calculations/Month' },
  { text: 'Current and Future Tools' },
)
  .addDetails(
  Plan.Features.numUsers('10'),
  Plan.Features.calculations('Unlimited'),
  Plan.Features.tools('Current and Future'),
  Plan.Features.alexa('Yes'),
  Plan.Features.phoneSupport('Yes'),
  Plan.Features.expert('Hourly'),
)

const supremePlan = new Plan("spr1mo", "Supreme", 399, null, null)
  .addFeaturedItems(
  { text: 'Exclusivity For Your Territory' },
  { text: 'Unlimited Users' },
  { text: 'Unlimited "My Carrier" Carrier' },
  { text: 'Expert on Retainer' },
)
  .addDetails(
  Plan.Features.numUsers('10'),
  Plan.Features.calculations('Unlimited'),
  Plan.Features.tools('Current and Future'),
  Plan.Features.alexa('Yes'),
  Plan.Features.phoneSupport('Yes'),
  Plan.Features.expert('Unlimited'),
  Plan.Features.paymentPlan('Yes'),
  Plan.Features.customReports('Yes'),
  Plan.Features.humanCalculators('Yes'),
  Plan.Features.coBrandedReports('Yes'),
  Plan.Features.coBrandedAds('Yes')
  )

class AppDemo extends Component {
  render() {
    const plans = [standardPlan, proPlan, supremePlan];

    return (
      <section className="container">
        <FeaturedPricingPlans plans={plans} />
        <DetailedPricing features={Plan.Features} plans={plans} />
      </section>
    );
  }
}

render(<AppDemo />, document.getElementById("root"))
