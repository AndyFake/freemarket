import React from 'react'
import Link from '../components/Link'
import './Cart.css';
import State from './state'
import { observer } from 'mobx-react';
import {PlusSquare, MinusSquare, XSquare} from 'react-feather'

const Cart = () =>
  <div className='Cart-Container'>
    <Link to='/store'><div className='Cart-Back'>continue shopping</div></Link>
    {State.cart.length<=0 && 
      <div className='Cart-Empty-Message'>
        Cart is Empty
      </div>
    }
    {State.cart.map((item,i) => 
      <div className='Cart-Line'>
        <div 
          className='Cart-Remove' 
          onClick={()=>{State.RFC(i)}}
        >
          <XSquare className='Cart-Feather'/>
        </div>
        <div className='Cart-Item-Name'>
          <div className='Cart-Item-Name-Text'>{item.title}</div>
          {item.options.length>0 && 
            <div className='Cart-Item-Name-Text' style={{color:'grey'}}>
              {item.options}
            </div>
          }
        </div>
        <div className='Cart-Quantity-Widget'>
          <div 
            onClick={()=>{State.modCart(i,item.quantity+1)}}
          >
          <PlusSquare className='Cart-Feather'/>
          </div>
          <div className='Cart-Item-Quantity'>
            <input
              ref={el=>this[i]=el}
              style={{width:`${String(item.quantity).length*8+5}px`,minWidth:'33px', textAlign:'center',height:'25px',margin:'3px',padding:'0px'}}
              value={item.quantity?item.quantity:''}
              onChange={e=>State.modCart(i,parseInt(e.target.value)||0)}
              onKeyPress={e=>e.key==='Enter'&&this[i].blur()}
            />
          </div>
          <div 
            onClick={()=>{item.quantity>1&&State.modCart(i,item.quantity-1)}}
          >
            <MinusSquare className='Cart-Feather'/>
          </div>
        </div>
        <div className='Cart-Item-Price'>${item.price*item.quantity}</div>
      </div>
    )} 
    <div className='Cart-Footer'>
      <div className='Cart-Footer-Total'>
        TOTAL : ${State.getTotal()}
      </div>
      <Link to='/checkout'>
        <div className='Cart-Footer-Checkout'>
          checkout
        </div>
      </Link>
    </div>
  </div>

export default observer(Cart)