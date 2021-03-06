import React from 'react'
import ReactMarkdown from 'react-markdown'
import Link from '../components/Link'
import Select from '../components/Select'
import Gallery from '../components/Gallery'

import './ProductPage.css'

export default ({ fields }) => {
  const { title='', price=0, longDescription='', images=[], options=[] } = fields
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
              options={options.map(o=>({label:o.option,value:o.option}))}
            />
          }
          <div 
            className="Add-to-cart" 
          >
            add to cart
          </div>
          <ReactMarkdown 
            source={longDescription} 
            className="Product-description"/>
        </div>
      </div>
    </div>
  )
}