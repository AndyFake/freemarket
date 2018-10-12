import React from 'react'
import State from './state'
import ReactMarkdown from 'react-markdown'
import Link from '../components/Link'
import Select from '../components/Select'
import Gallery from '../components/Gallery'
import { observer } from 'mobx-react';


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

const getCost = (price,options,selection) =>{
  if(options.filter(o=>o.title==selection).length>0){
    return parseFloat(price) + parseFloat(options.filter(o=>o.title==selection)[0].cost)
  }
  return price
}

const setSelection=x=>State.setSelection(x)

class ProductPage extends React.Component{
  constructor(props){
    super(props)
    this.state={cost:props.fields.price}
  }
  componentDidMount(){
    State.setSelection('')

  }
  render(){
    const { title, price, longDescription, images, options=[] } = this.props.fields
    return (
      <div className="Product-Page-Wrapper">
        <div className="Product-Page-Container">
          <div className="Product-Page-Product">
            <Gallery imageList={getSmallImages(images)}/>
            <div className="Product-bar">
              <div className="Product-name">{title || ''}</div>
              <div className="Product-price">${this.state.cost}</div>
            </div>
            {options && options.length>0 &&
              <Select
                title='Please Select :'
                options={[...options.map(o=>({
                  // ({label:( o.cost==0 || o.cost=='') ? 
                  //           o.title :
                  //           `${o.title}  (+ $${o.cost})`,
                  //   value:o.title
                  // }))
                  label:o.title,
                  value:o.title,
                  cost:o.cost
                }))
                ]}
                onChange={(selection)=>{
                  setSelection(selection.value?selection.value:selection)
                  this.setState({cost:getCost(price,options,State.getSelection())})
                }}
              />
            }
            <Link to='/cart'>
              <div 
                className="Add-to-cart"
                onClick={()=>{ 
                  State.ATC({...this.props.fields,price:this.state.cost},String(State.getSelection()))
                }}
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
}


export default ProductPage