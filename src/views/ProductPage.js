import React from 'react'
import State from './state'
import ReactMarkdown from 'react-markdown'
import Link from '../components/Link'
import Select from '../components/Select'
import Gallery from '../components/Gallery'

import './ProductPage.css'

const getSmallImages = (images) => {
  var smallImages = []
  images.forEach((image,i)=>{
    const name = image.image.split('/')[image.image.split('/').length-1]
    const nameWithoutExtension = name.split('.')[0]
    const extension = name.split('.')[1]
    const path = '/images/uploads/resized/' + nameWithoutExtension + '.600.' + extension
    smallImages.push({...image,image:path})
  })
  return smallImages
}

export default ({ fields }) => {
  const { productName, price, longDescription, images, options } = fields
  State.setSelection('')
  return (
    <div className="App">
      <div className="Container">
        <div className="Product">
          <Gallery imageList={getSmallImages(images)}/>
          <div className="Product-bar">
            <div className="Product-name">{productName || ''}</div>
            <div className="Product-price">${price}</div>
          </div>
          {options &&
            <Select 
              options={['Please Select :',...options.map(o=>o.option)]}
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
          <ReactMarkdown source={longDescription} className="Product-description"/>
        </div>
      </div>
    </div>
  )
}