import React from 'react'
import { observer } from 'mobx-react';
import { slugify } from '../util/url'
import uuid from 'uuid/v4'
import StripeCheckout from "react-stripe-checkout"
import Select from '../components/Select.js'
import State from './state'
import data from '../data.json'
import './Checkout.css'

import {PUBLIC_KEY} from '../PUBLIC_KEY.js'

const formfields = ['Name','Street Address','City', 'State/Province','ZIP code / Postal Code', 'Country']

const encodeData=token=>{
  const relevantFieldsFromItem = ['title','quantity','price','options']
  const purchaseInfo    = '\npurchases: ' + State.cart.map((item,i)=>`\n\n#${i+1} :` + relevantFieldsFromItem.map(field=>`\n${field}:${item[field]}`))
  const userDataStrings = Object.keys(State.fields).map(name=>`${name} : ${State.fields[name]}`)
  const cartInfo = `
subtotal : ${State.getTotal()}
total with shipping : ${State.getTotalWithShipping()}
total with tax : ${State.getTotalWithShipping() * 1.16}
date : ${Date()}
  `
  const userData = userDataStrings.join('\n')
  const tokenString = JSON.stringify(token||'',null,3).replace(/[^\w\s:_@.-]/g,'')
  return`
${userData}
${purchaseInfo}
${cartInfo}

stripe payment meta-data:
${tokenString}`
}

const onToken = token => {
  const data = {
    token:token,
    amount : 111,
    idempotency_key:uuid(),
  }
  fetch("/.netlify/functions/purchase", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(response => {
    response.json().then(data => {
      if(data.status=='succeeded'){
        console.log(`payment was successful`);
        // call stock function
        // this is now broken from the overhail
        fetch("/.netlify/functions/stock", {
          method: "POST",
          body: JSON.stringify(State.getCart())
        })
        // console.log(State.getCart())
        // submit(encodeData(token))
      }
    });
  });
}
const encode = (data) => {
  return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
}
const submit = (data) => {
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": "purchase", "data":data })
  })
    .then(() => alert("Success!"))
    .catch(error => alert(error));
};

const getRegions = () =>{
  var regions = new Set()
  State.getCart().forEach(item=>{
    const shippingClass = data.shipping.filter(c=>c.title==item.class)[0]
    shippingClass && shippingClass.carriers.forEach(carrier=>{
      carrier.regions.forEach(region=>{
        regions.add(region.title)
      })
    })
  })
  return Array.from(regions)
}

const getCarriers = region => {
  // console.log('region: ' + region)
  var carriers = {}
  State.getCart().forEach(item=>{
    const shippingClass = data.shipping.filter(c=>c.title==item.class)[0]
    shippingClass && shippingClass.carriers.forEach(carrier=>{
      if(carrier.regions.filter(r=>r.title==State.getRegion()).length>0){
        carriers[carrier.title] = carrier.regions.filter(r=>r.title==State.getRegion())[0].cost
      }
    })
  })
  return Object.keys(carriers)
}

const getHighestShippingCost = () =>{
  var highestShippingCost = 0
  if(State.getCart().length<1   ){return 0}
  if(State.getCarrier() == ' ' ) {return 0}
  if(State.getRegion()   == ' ' ){return 0}
  State.getCart().forEach(item=>{
    const shippingClass = data.shipping.filter(c=>c.title==item.class)[0]
    const carrier = shippingClass.carriers.filter(c=>c.title==State.getCarrier())[0]
    const region = carrier.regions.filter(r=>r.title==State.getRegion())[0]
    const cost = region ? region.cost : 0
    if(cost>highestShippingCost){
      highestShippingCost=parseFloat(cost)
    }
  })
  return highestShippingCost
}

const getSubtotal=()=>{
  var cartTotal = 0
  State.getCart().forEach(item=>{
    var price = parseFloat(item.price)
    // ** now doing this in the product page **
    // if(item.selected!=''){
    //   const opt = item.options.filter(o=>o.title==item.selected)[0]
    //   if(opt.cost){
    //     price += parseFloat(opt.cost)
    //   }
    // }
    cartTotal += (price * parseFloat(item.quantity))
  })
  return cartTotal
}

const validateFields=()=> 
  State.getCarrier()!=' ' && 
  formfields.every(f=> State.getField(slugify(f)) != false)

const Checkout = () => {
  return(
  <div className='checkout-container'>
    <p>Please enter your shipping info:</p>
    <form name='purchase'>
      <div className='Checkout-Region-Dropdown'>
        <Select
          ref={i=>this.regionDropdown=i}
          title={State.getRegion()==' ' ? 'Please Select Region :' : State.getRegion()}
          options={getRegions().map(r=>({label:r,value:r}))}
          onChange={(e)=>{
            this.shippingDropdown.reset()
            State.setRegion(e.label);
            State.setCarriers(getCarriers(e.label))
            State.setCarrier(' ')
            // encodeData()
            console.log('from region change=>')
            console.log(State.getCarrier())
          }}
        />
      </div>
      {formfields.map((field,index)=>{
        const slug = slugify(field)
        return(
          <div>
            <input
              key={index}
              placeholder={field}
              name={slug} 
              value={State.getField(slug) || ''} 
              onChange={(e)=>State.setField(e.target.name,e.target.value)}
            />
          </div>
      )})}
      <div className='Checkout-Shipping-Dropdown'>
        <Select 
          ref={i=>this.shippingDropdown=i}
          title={State.getCarrier()==' ' ? 'Please Select Shipping :' : State.getCarrier()}
          options={State.getCarriers().map(c=>({label:c,value:c}))}
          onChange={(e)=>{
            if(e!=null){
              State.setCarrier(e.label);
              encodeData()
              console.log('from carrier change=>')
              console.log(State.getCarrier())
            }
            console.log('from carrier change (with null)=>')
            console.log(State.getCarrier())

          }}
        />
      </div>
    </form>
    <div className="Checkout-Register">
      <p className="Checkout-Text">{"subtotal : $" + (getSubtotal()).toFixed(2)}</p>
      <p className="Checkout-Text">{"shipping : $" + (getHighestShippingCost()).toFixed(2)}</p>
      <p className="Checkout-Text">{"taxes    : $" + ((getSubtotal()+getHighestShippingCost())*0.15).toFixed(2)}</p>
      <p className="Checkout-Text">{"total    : $" + ((getSubtotal()+getHighestShippingCost())*1.15).toFixed(2)}</p>
    </div>
    <div className="Checkout-Stripe-Container">
      <div 
        className='Checkout-Stripe-Blocker'
        style={{height: validateFields() ? '1px' : '60px'}}
        onClick={(e)=>{
          e.preventDefault()
          alert('Please Fill Out All The Fields')
        }}
      />
      <StripeCheckout token={onToken} stripeKey={PUBLIC_KEY}/>  
    </div>
  </div>
)}

export default observer(Checkout)