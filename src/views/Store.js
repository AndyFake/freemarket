import React from 'react'
import Link from '../components/Link'
import { slugify } from '../util/url'
import './Store-Page.css';
import StoreHeader from '../components/StoreHeader'
import State from './state'
// import {ShoppingCart} from 'react-feather'

export default ({fields}) => { 
  const {products=[]} = fields
  return(
    <div>
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
