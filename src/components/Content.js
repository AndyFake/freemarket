import React from 'react'
import Marked from 'react-markdown'

import { getImageSrc, getImageSrcset } from '../util/getImageUrl'
import './Content.css'

export default ({ source }) => (
  <Marked
    className='Content'
    source={source}
    renderers={{
      Image: ImageWithSrcset
    }}
  />
)

const ImageWithSrcset = ({ nodeKey, src, alt, ...props }) => (
  <img
    className='Content--Image'
    {...props}
    src={getImageSrc(src)}
    srcSet={getImageSrcset(src)}
    alt={alt}
  />
)
