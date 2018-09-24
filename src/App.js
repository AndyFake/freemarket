import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'
import StripeCheckout from "react-stripe-checkout"
import './App.css';
import uuid from 'uuid/v4'

import Blog from './views/Blog'
import Meta from './components/Meta'
import { getCollectionTerms } from './util/collection'



import data from './data.json'
import {PUBLIC_KEY} from './PUBLIC_KEY.js'
console.log('public key: ' + PUBLIC_KEY)
console.log(data)

const Cart = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"/></svg>
const SELECT_HEIGHT = 30
const {settings=[], products=[]} = data
const name = settings[0].siteTitle

// const images = {}
// products.forEach(product=>{
//   images[product.productName]=[]
//   images[product.productName].push(require('.' + product.primaryImage))
//   product.images.forEach(img=>{
//     images[product.productName].push(require('.' + img.image))
//   })
// })


const LINK = x => <Link {...x} style={{textDecoration:'none'}}/>
const u = name => name.replace(/\s/g, '');

const getDocuments = collection => data[collection] || []
const getDocument = (collection, name) =>
  data[collection] &&
  data[collection].filter(page => page.name === name)[0]
const posts = getDocuments('posts').filter(
    post => post.status !== 'Draft'
  )
const categoriesFromPosts = getCollectionTerms(posts, 'categories')
const postCategories = getDocuments('postCategories').filter(
  category => categoriesFromPosts.indexOf(category.name.toLowerCase()) >= 0
  )
const RouteWithMeta = ({ component: Component, ...props }) => (
  <Route
    {...props}
    render={routeProps => (
      <Fragment>
        <Meta {...props} />
        <Component {...routeProps} {...props} />
      </Fragment>
    )}
  />
)
  




class Gallery extends Component{
  constructor(){
    super()
    this.state={
      view:0
    }
  }
  render(){
    const {imageList} = this.props
    const {view} = this.state
    return(
      <div className='Gallery-Container'>
        <div className='Gallery-Image-Container'>
          <div className='Gallery-Left-Nav' onClick={this.handleClickLeft}>
            <p className='Gallery-Left-Nav-Icon'
              style={{opacity:view==0?.5:1}}
            >{'<'}</p>
          </div>
          <img className='Gallery-Image' src={imageList[view].image}/>
          <div className='Gallery-Right-Nav' onClick={this.handleClickRight}>
            <p className='Gallery-Right-Nav-Icon'
              style={{opacity:view==imageList.length-1?.5:1}}
            >{'>'}</p>
          </div>
        </div>
        <div>{[...imageList].map((_,i)=><div className='Select-Bullets' style={{fontSize:i==view?'10px':'8px' ,opacity:i==view?0.4:1}}> {' O '} </div>)}</div>
      </div>
    )
  }
  handleClickLeft=()=> this.setState(s=>({view: s.view==0 ? 0 : s.view-1}))
  handleClickRight=()=>this.setState(s=>({view: s.view>=this.props.imageList.length-1 ? this.props.imageList.length-1 : s.view+1}))
}

class Select extends Component{
  constructor(){
    super()
    this.state={open:false,selection:0}
  }
  render(){
    const {options,onChange} = this.props
    const {open,selection} = this.state
    return(
      <div className='Select-Container'>
        <div className='Select-Main' onClick={()=>this.setState(s=>({open:!s.open})) } >
          <div className='Select-Text'>{options[selection].label||options[selection]}</div>
          <span className='Select-Chevron' style={{transform: `rotate(${open?90:-90}deg)`}}>{'<'}</span>
        </div>
        {open && 
          options.map((option,i)=>
            <div 
              className='Select-Dropdown' 
              style={{top:(i+1)*SELECT_HEIGHT+'px',backgroundColor:i==selection?'grey':'white'}}
              onClick={()=>{
                this.setState({selection:i,open:false});
                onChange(options[i])}}
            >
              <p className='Select-Text'>{option.label || option}</p>
            </div>)
        }
      </div>
    )
  }
}

class App extends Component {
  constructor(props){
    super(props)
    this.state={
      cart:[],
      fedexShippingCost:12,
      uspsShippingCost:10,
      upsShippingCost:14,
      shippingCost:0,
      shippingKind:'',
    }
  }

  get home(){return(
      <div>
        <div className='Top-bar'>
          <LINK to='/blog'>
            <div className='Cart-icon'>
              BLOG
            </div>
          </LINK>
          <div className='Store-title'>
            {name}
          </div>
          <LINK to='/cart'>
            <div className='Cart-icon'>
              <Cart/>
              <div className='Cart-Icon-Number'>{this.state.cart.reduce((acc,cur)=>acc+cur.quantity,0)}</div>
            </div>
          </LINK>
        </div>
        {products.map(({title,primaryImage})=>
          <div className="Product">
            <LINK to={'/'+u(title)}>
              <img  className="Product-image"  src={primaryImage}/>
            </LINK>
            <div className="Product-bar">
              <div className="Product-name">{title}</div>
            </div>
          </div>
        )}
      </div>)}

  get productPages(){
      return(
        products.map(({title,longDescription,images,price,options},i)=>
        ({
          path:
          title,
          html:
            <div className="Product">
              <Gallery imageList={images}/>
              <div className="Product-bar">
                <div className="Product-name">{title}</div>
                <div className="Product-price">${price}</div>
              </div>
              {options && <Select options={['Please Select :',...options.map(o=>o.option)]} onChange={(e)=>this.setState({[title]:e})}/>}
              <LINK to='/cart'><div className="Add-to-cart" onClick={()=>{this.ATC(products[i],this.state[title])}}>
                  add to cart
              </div></LINK>
              <div className="Product-description">{longDescription}</div>
            </div>
        })
      ))}

  get cart(){return(
    <div className='Cart-container'>
      <LINK to='/'><div className='Cart-back' >continue shopping</div></LINK>
      <div className='Items-container'>
      {this.state.cart.map(({title,price,primaryImage,quantity,options},i) => 
          <div className='Cart-line'>
            <img className='Cart-item-image' src={primaryImage}/>
            <div className='Cart-item-name'>{title}</div>
            {options && <div className='Cart-item-options'>{options}</div>}
            <div className='Cart-remove-x' onClick={()=>{this.modCart(i,quantity+1)}}>+</div>
            <div>quantity : {quantity} </div>
            <div className='Cart-remove-x' onClick={()=>{quantity>1&&this.modCart(i,quantity-1)}}>-</div>
            <div className='Cart-item-price'>${price}</div>
            <div className='Cart-remove-x' onClick={()=>{this.RFC(i)}}>x</div>
          </div>
      )}
      </div>
      <div className='Cart-footer'>
        <div className='Cart-footer-total'>TOTAL : ${this.getTotal()}</div>
        <LINK to='/checkout'><div className='Cart-footer-checkout'>checkout</div></LINK>
      </div>
  </div>
  )}

  get checkOut(){return(
    <div className='checkout-container'>
    <form ref={i=>this.infoForm=i}>
      {fields.map((field,index)=>{
        const stateName = field.split(' ').join('').toLowerCase()
        return(
          <div>
          <input
            key={index}
            placeholder={field}
            name={stateName} 
            value={this.state[stateName] || ''} 
            onChange={this.handleChange}/>
          </div>
      )})}
    <div className='checkout-shipping-dropdown'>
    {/* <Dropdown 
      value={this.state.shippingKind || null}
      options={[{label:`USPS ($ ${this.state.uspsShippingCost})`  ,value:this.state.uspsShippingCost},
                {label:`UPS ($ ${this.state.upsShippingCost})`    ,value:this.state.upsShippingCost},
                {label:`FEDEX ($ ${this.state.fedexShippingCost})`,value:this.state.fedexShippingCost}]}
      onChange={(e)=>this.setState({shippingCost:e.value,shippingKind:e.label}) } 
      placeholder="Select Shipping" /> */}
    <Select 
      options={[{label:'please select'},
                {label:`USPS ($ ${this.state.uspsShippingCost})`  ,value:this.state.uspsShippingCost},
                {label:`UPS ($ ${this.state.upsShippingCost})`    ,value:this.state.upsShippingCost},
                {label:`FEDEX ($ ${this.state.fedexShippingCost})`,value:this.state.fedexShippingCost}]}
      onChange={(e)=>this.setState({shippingCost:e.value,shippingKind:e.label}) } 
                />
    </div>
    <div>{"total with shipping : $" + (this.getTotal()+this.state.shippingCost).toFixed(2)}</div>
    <div>{"total with taxes    : $" + ((this.getTotal()+this.state.shippingCost)*1.15).toFixed(2)}</div>
    </form>
    <StripeCheckout token={this.onToken} stripeKey={PUBLIC_KEY}/>      
  </div>
  )}

  render() {
    return (
      <Router>
        <div className="App">
          <div className="Container">
            <Switch>
            <RouteWithMeta
              path='/blog/'
              exact
              component={Blog}
              fields={getDocument('pages', 'blog')}
              posts={posts}
              postCategories={postCategories}
            />
              <Route exact path='/'                render={_=> this.home} />
              <Route       path='/blog'            render={_=> this.blog} />
              <Route       path='/cart'            render={_=> this.cart} />
              <Route       path='/checkout'        render={_=> this.checkOut} />
              {this.productPages.map((page,i)=>
              <Route       path={'/'+u(page.path)} render={_=> page.html} key={i}/> )}
              <Route                               render={_=> this.home} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
  ATC=(item,options=null)=>{
    const _item = {...item,quantity:1,options}
    this.setState(s=>({cart:s.cart.concat([_item])}))
  }
  RFC=i=>{
    var {cart}= this.state
    cart=cart.slice(0,i).concat(cart.slice(i+1))
    this.setState({cart})
  }
  modCart=(index,quantity)=>{
    var {cart} = this.state
    cart[index].quantity=quantity
    this.setState({cart})
  }
  getTotal=()=>{
    const {cart} = this.state
    var total = 0
    cart.forEach(p=>total+=p.price * p.quantity)
    return total
  }
  getTotalWithShipping=(shipping)=>{
    if(shipping=='USPS'){return this.getTotal()+10}
    if(shipping=='UPS'){return this.getTotal()+14}
    if(shipping=='FEDEX'){return this.getTotal()+12}
    return this.getTotal()
  }
  encodeData=token=>{
    const names = Object.keys(this.state)
    const userDataStrings = names.map(name=>`${name} : ${this.state[name]}`)
    const userData = userDataStrings.join('\n')
    const tokenString = JSON.stringify(token,null,3).replace(/[^\w\s:_@.-]/g,'')
    return`
  ${userData}
  stripe payment meta-data:${tokenString}`
  }
  onToken = token => {
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
          this.submit(this.encodeData(token))
        }
      });
    });
  }
  encode = (data) => {
    return Object.keys(data)
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
        .join("&");
  }
  submit = (data) => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: this.encode({ "form-name": "purchase", "data":data })
    })
      .then(() => alert("Success!"))
      .catch(error => alert(error));
  };
  handleChange = e => this.setState({ [e.target.name]: e.target.value });
}

const fields = ['Name','Street Address','City', 'State/Province','ZIP code / Postal Code', 'Country']

// const Field = ({label,name,value,onChange}) =>
//   // <p>
//   //   <label>
//   //     {label} 
//       <input type={'text'} name={name} value={value} onChange={onChange} 
//       placeholder={name}
//       />
//   //   </label>
//   // </p>


// class Checkout extends Component {
//   constructor(props){
//     super(props)
//     this.state={}
//   }
//   encodeData=token=>{
//     const names = Object.keys(this.state)
//     const userDataStrings = names.map(name=>`${name} : ${this.state[name]}`)
//     const userData = userDataStrings.join('\n')
//     const tokenString = JSON.stringify(token,null,3).replace(/[^\w\s:_@.-]/g,'')
//     return`
//   ${userData}
//   stripe payment meta-data:${tokenString}`
//   }
//   onToken = token => {
//     const data = {
//       token:token,
//       amount : 111,
//       idempotency_key:uuid(),
//     }
//     console.log(token)
//     fetch("/.netlify/functions/purchase", {
//       method: "POST",
//       body: JSON.stringify(data)
//     }).then(response => {
//       response.json().then(data => {
//         console.log(data)
//         if(data.status=='succeeded'){
//           alert(`payment was successful`);
//           this.submit(this.encodeData(token))
//         }
//       });
//     });
//   }
//   render(){
//     return(
//       <div className='container'>
//         <form ref={i=>this.infoForm=i}>
//           {fields.map((field,index)=>{
//             const stateName = field.split(' ').join('').toLowerCase()
//             return(
//               <Field 
//                 key={index}
//                 label={field}
//                 name={stateName} 
//                 value={this.state[stateName] || ''} 
//                 onChange={this.handleChange}/>
//           )})}
//         </form>
//         <StripeCheckout token={this.onToken} stripeKey={PUBLIC_KEY}/>      
//       </div>
//     )
//   }
//   encode = (data) => {
//     return Object.keys(data)
//         .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
//         .join("&");
//   }
//   submit = (data) => {
//     fetch("/", {
//       method: "POST",
//       headers: { "Content-Type": "application/x-www-form-urlencoded" },
//       body: this.encode({ "form-name": "purchase", "data":data })
//     })
//       .then(() => alert("Success!"))
//       .catch(error => alert(error));
//   };
//   handleChange = e => this.setState({ [e.target.name]: e.target.value });
// }

export default App;