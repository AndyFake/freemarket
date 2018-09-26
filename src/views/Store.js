import React from 'react'
import Link from '../components/Link'
import { slugify } from '../util/url'
import './Store-Page.css';
import State from './state'
import {ShoppingCart} from 'react-feather'

export default ({fields}) => { 
  const {products,settings} = fields
  const name = settings[0].siteTitle
  return(
    <div>
      <div className='Store-Top-bar'>
        <div className='Store-Store-title'>
          {name}
        </div>
        <Link to='/cart'>
          <div className='Store-Cart-icon'>
            <ShoppingCart className='Store-Feather'/>
            <div className='Store-Cart-Icon-Number'>
              {State.cart.reduce((acc,cur)=>acc+cur.quantity,0)}
            </div>
          </div>
        </Link >
      </div>
      {products.map(({title,primaryImage})=>
        <div className="Store-Product">
          <Link  to={'/'+slugify(title)}>
            <img  
              className="Store-Product-Page-image"  
              src={primaryImage}
            />
          </Link >
          <div className="Store-Product-bar">
            <div className="Store-Product-name">
              {title}
            </div>
          </div>
        </div>
      )}
    </div>
  )}
