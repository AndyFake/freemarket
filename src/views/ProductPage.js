import React from 'react'
import State from './state'
import { Link } from 'react-router-dom'
import Select from '../components/Select'
import Gallery from '../components/Gallery'

import './ProductPage.css'

export default ({ fields }) => {
  const { productName, price, longDescription, images, options=[] } = fields
  return (
    <div className="App">
    <div className="Container">
        <div className="Product">
          <Gallery imageList={images}/>
          <div className="Product-bar">
            <div className="Product-name">{productName || ''}</div>
            <div className="Product-price">${price}</div>
          </div>
          <Select options={['Please Select :',...options.map(o=>o.option)]} onChange={(selection)=>{State.setSelection(selection)}}/>
          <Link to='/cart'>
            <div 
              className="Add-to-cart" 
              onClick={()=>{State.ATC(fields,String(State.selection))}}
            >
              add to cart
            </div>
          </Link>
          <div className="Product-description">{longDescription}</div>
        </div>
      </div>
      </div>
  )
}

