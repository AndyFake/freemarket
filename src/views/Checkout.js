import React from 'react'
import { observer } from 'mobx-react';
import Select from '../components/Select.js'
import State from './state'
import { slugify } from '../util/url'
import uuid from 'uuid/v4'
import StripeCheckout from "react-stripe-checkout"
import './ProductPage.css'
import {PUBLIC_KEY} from '../PUBLIC_KEY.js'
console.log('public key: ' + PUBLIC_KEY)



const uspsShippingCost = 10
const upsShippingCost  = 15
const fedexShippingCost= 20

// const PUBLIC_KEY = 1234

const formfields = ['Name','Street Address','City', 'State/Province','ZIP code / Postal Code', 'Country']
const encodeData=token=>{
  const names = Object.keys(State)
  const userDataStrings = names.map(name=>`${name} : ${this.state[name]}`)
  const userData = userDataStrings.join('\n')
  const tokenString = JSON.stringify(token,null,3).replace(/[^\w\s:_@.-]/g,'')
  return`
${userData}
stripe payment meta-data:${tokenString}`
}
const onToken = token => {
  const data = {
    token:token,
    amount : 111,
    idempotency_key:uuid(),
  }
  console.log(token)
  fetch("/.netlify/functions/purchase", {
    method: "POST",
    body: JSON.stringify(data)
  }).then(response => {
    response.json().then(data => {
      console.log(data)
      if(data.status=='succeeded'){
        alert(`payment was successful`);
        submit(encodeData(token))
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

const Checkout = observer( ({fields})=>{
  
  return(
    <div className='checkout-container'>
    <form 
    // ref={i=>this.infoForm=i}
    >
      {formfields.map((field,index)=>{
        const slug = slugify(field)
        return(
          <div>
          <input
            key={index}
            placeholder={field}
            name={slug} 
            value={State.getField(slug) || ''} 
            onChange={(e)=>State.setField(e.target.name,e.target.value)}/>
          </div>
      )})}
    <div className='checkout-shipping-dropdown'>
    <Select 
      options={[{label:'please select'},
                {label:`USPS ($ ${uspsShippingCost})`  ,value:uspsShippingCost},
                {label:`UPS ($ ${upsShippingCost})`    ,value:upsShippingCost},
                {label:`FEDEX ($ ${fedexShippingCost})`,value:fedexShippingCost}]}
      onChange={(e)=>{State.shippingCost=e.value;State.shippingKind=e.label}}
    />
    </div>
    <div>{"total with shipping : $" + (State.getTotal()+State.shippingCost).toFixed(2)}</div>
    <div>{"total with taxes    : $" + ((State.getTotal()+State.shippingCost)*1.15).toFixed(2)}</div>
    </form>
    <StripeCheckout token={onToken} stripeKey={PUBLIC_KEY}/>      
  </div>
  )}
)

  // class Select extends React.Component{
  //   constructor(){
  //     super()
  //     this.state={open:false,selection:0}
  //   }
  //   render(){
  //     const {options,onChange} = this.props
  //     const {open,selection} = this.state
  //     return(
  //       <div className='Select-Container'>
  //         <div className='Select-Main' onClick={()=>this.setState(s=>({open:!s.open})) } >
  //           <div className='Select-Text'>{options[selection].label||options[selection]}</div>
  //           <span className='Select-Chevron' style={{transform: `rotate(${open?90:-90}deg)`}}>{'<'}</span>
  //         </div>
  //         {open && 
  //           options.map((option,i)=>
  //             <div 
  //               className='Select-Dropdown' 
  //               style={{top:(i+1)*30+'px',backgroundColor:i==selection?'grey':'white'}}
  //               onClick={()=>{
  //                 this.setState({selection:i,open:false});
  //                 onChange(options[i])}}
  //             >
  //               <p className='Select-Text'>{option.label || option}</p>
  //             </div>)
  //         }
  //       </div>
  //     )
  //   }
  // }
  
  export default Checkout
