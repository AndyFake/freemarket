import React,{Fragment} from 'react'
import MenuNav from './Menu'
import CartIcon from './CartIcon'
import './StoreHeader.css'

const StoreHeader = ({title}) =>
<Fragment>
  <div className='Store-Header'>
    <div className ='Menu-Box'>
      <MenuNav className ='Icon'/>
    </div>
     {title}
    <div className='Cart-Box'>
      <CartIcon className ='Icon'/>
    </div>
  </div>
    <div className='Header-Spacer'/>
    </Fragment>

export default StoreHeader
