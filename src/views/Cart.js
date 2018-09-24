import React from 'react'
import { Link } from 'react-router-dom'
import './Store.css';
import State from './state'
import { observer } from 'mobx-react';

const Cart = observer( 
  class Cart extends React.Component{
    render(){
      return(
        <div className='Cart-container'>
          <Link to='/store'><div className='Cart-back' >continue shopping</div></Link>
          <div className='Items-container'>
            {State.cart.map((item,i) => 
              <div className='Cart-line'>
                <img className='Cart-item-image' src={item.primaryImage}/>
                <div className='Cart-item-name'>{item.title}</div>
                {item.options!='' && <div className='Cart-item-options'>{item.options}</div>}
                <div className='Cart-remove-x' onClick={()=>{State.modCart(i,item.quantity+1)}}>+</div>
                <div>quantity : {item.quantity} </div>
                <div className='Cart-remove-x' onClick={()=>{item.quantity>1&&State.modCart(i,item.quantity-1)}}>-</div>
                <div className='Cart-item-price'>${item.price}</div>
                <div className='Cart-remove-x' onClick={()=>{State.RFC(i)}}>x</div>
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