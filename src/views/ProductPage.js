import React from 'react'
import State from './state'
import ReactMarkdown from 'react-markdown'
import Link from '../components/Link'
import Select from '../components/Select'
import Gallery from '../components/Gallery'

import './ProductPage.css'

const getSmallImages = (images) => {
  var smallImages = []
  images.forEach(image=>{
    var img = image.image.split('/')[image.image.split('/').length-1]
    var name = img.substring(0, img.lastIndexOf("."));
    var extension = img.substring(img.lastIndexOf(".") + 1, img.length);  
    const path = '/images/uploads/resized/' + name + '.600.' + extension
    smallImages.push({...image,image:path})
  })
  return smallImages
}

export default ({ fields }) => {
  // console.log(fields)
  const { title, price, longDescription, images, options } = fields
  State.setSelection('')
  return (
    <div className="App">
      <div className="Container">
        <div className="Product">
          <Gallery imageList={getSmallImages(images)}/>
          <div className="Product-bar">
            <div className="Product-name">{title || ''}</div>
            <div className="Product-price">${price}</div>
          </div>
          {options &&
            <Select
              title='Please Select :'
              options={[...options.map(o=>({label:o.title,value:o.title}))]}
              onChange={(selection)=>{State.setSelection(selection.label?selection.label:selection)}}
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