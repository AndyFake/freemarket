import React from 'react'
import Link from '../components/Link'
import { slugify } from '../util/url'
import './Store-Page.css';

export default ({data}) => { 
  const {products=[]} = data
  return(
    <div className="Store-Container">
      {products
        .sort((a,b)=>a.position-b.position)
        .map(({title,primaryImage})=>
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
      {products.length % 2 != 0 && 
        <div className="Store-Product">
        {/* <Link  to={'/'+slugify(title)}>
          <img  
            className="Store-Product-Page-image"  
            src={primaryImage}
          />
        </Link > */}
        <div className="Store-Product-bar">
          <div className="Store-Product-name">
            {/* {title} */}
          </div>
        </div>
      </div>
    
      }
    </div>
  )}

  const sortProducts = products =>{

  }
