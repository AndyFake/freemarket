import React from 'react'
import MenuNav from './Menu'
import CartIcon from './CartIcon'
import './StoreHeader.css'

const StoreHeader = ({title}) =>
  <div className='Store-Header'>
    <div className ='Menu-Box'>
      <MenuNav className ='Icon'/>
    </div>
     {title}
    <div className='Cart-Box'>
      <CartIcon className ='Icon'/>
    </div>
  </div>

export default StoreHeader
