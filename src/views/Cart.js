import React from 'react'
import Link from '../components/Link'
import './Cart.css';
import State from './state'
import { observer } from 'mobx-react';
import {PlusSquare, MinusSquare, XSquare} from 'react-feather'

const Cart = observer( 
  class Cart extends React.Component{
    render(){
      return(
        <div className='Cart-container'>
          <Link to='/store'><div className='Cart-back'>continue shopping</div></Link>
          <div className='Items-container'>
            {State.cart.reduce((acc,cur)=>acc+cur.quantity,0)<=0 && 
              <div className='Cart-Empty-Message'>Cart is Empty</div>
            }
            {State.cart.map((item,i) => 
              <div className='Cart-line'>
                <div className='Cart-Remove' onClick={()=>{State.RFC(i)}}>
                  <XSquare className='Cart-Feather'/>
                </div>
                <div className='Cart-Item-Name'>{item.title}{item.options.length>0 && '('+item.options+')'}</div>
                <div className='Cart-item-price'>${item.price*item.quantity}</div>
                <div className='Cart-Quantity-Widget'>
                  <div className='Cart-Button' onClick={()=>{State.modCart(i,item.quantity+1)}}>
                  <PlusSquare className='Cart-Feather'/>
                  </div>
                  <div className='Cart-Item-Quantity'> {item.quantity} </div>
                  <div className='Cart-Button' onClick={()=>{item.quantity>1&&State.modCart(i,item.quantity-1)}}>
                    <MinusSquare className='Cart-Feather'/>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className='Cart-footer'>
            <div className='Cart-footer-total'>TOTAL : ${State.getTotal()}</div>
            <Link to='/checkout'><div className='Cart-footer-checkout'>checkout</div></Link>
          </div>
        </div>
        )
    }
  }
)
export default Cart