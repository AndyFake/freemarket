import React from 'react'
import Link from './Link'
import {ShoppingCart} from 'react-feather'
import State from '../views/state'
import './CartIcon.css'


const CartIcon = () =>
  <div>
    <Link to='/cart'>
      <div className='Store-Cart-icon'>
        <ShoppingCart className='Store-Feather'/>
        <div className='Store-Cart-Icon-Number'>
          {State.cart.reduce((acc,cur)=>acc+cur.quantity,0)}
        </div>
      </div>
    </Link>
  </div>

export default CartIcon