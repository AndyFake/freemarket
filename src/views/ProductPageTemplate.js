import React from 'react'
import State from './state'
import ReactMarkdown from 'react-markdown'
import Link from '../components/Link'
import Select from '../components/Select'
import Gallery from '../components/Gallery'

import './ProductPage.css'

export default ({ fields }) => {
  const { title, price, longDescription, images, options } = fields
  State.setSelection('')
  return (
    <div className="App">
      <div className="Container">
        <div className="Product">
          <Gallery imageList={images}/>
          <div className="Product-bar">
            <div className="Product-name">{title || ''}</div>
            <div className="Product-price">${price}</div>
          </div>
          {options &&
            <Select
              title='Please Select :'
              options={[...options.map(o=>o.option)]}
              onChange={(selection)=>{State.setSelection(selection)}}
            />
          }
          <Link to='/cart'>
            <div 
              className="Add-to-cart" 
              onClick={()=>{State.ATC(fields,String(State.selection))}}
            >
              add to cart
            </div>
          </Link>
          <ReactMarkdown 
            source={longDescription} 
            renderers={{image:(props)=><img {...props} style={{maxWidth: '100%'}}/>}}
            className="Product-description"/>
        </div>
      </div>
    </div>
  )
}