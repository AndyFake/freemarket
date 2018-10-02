import React from 'react'
import Link from '../components/Link'
import './Cart.css';
import State from './state'
import { observer } from 'mobx-react';
import {PlusSquare, MinusSquare, XSquare} from 'react-feather'

const Cart = () =>
  <div className='Cart-Container'>
    <Link to='/store'><div className='Cart-Back'>continue shopping</div></Link>
    <div className='Items-Container'>
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
            <div>{item.title}</div>
            {item.options.length>0 && 
              <div style={{color:'grey'}}>
                {item.options}
              </div>
            }
          </div>
          <div className='Cart-Item-Price'>${item.price*item.quantity}</div>
          <div className='Cart-Quantity-Widget'>
            <div 
              className='Cart-Button' 
              onClick={()=>{State.modCart(i,item.quantity+1)}}
            >
            <PlusSquare className='Cart-Feather'/>
            </div>
            <div className='Cart-Item-Quantity'>
              <input
                ref={el=>this[i]=el}
                style={{textAlign:'center',position:'relative',height:'25px',width:'30px',margin:'3px',padding:'0px'}}
                value={item.quantity?item.quantity:''}
                onChange={e=>State.modCart(i,parseInt(e.target.value)||0)}
                onKeyPress={e=>e.key==='Enter'&&this[i].blur()}
              />
            </div>
            <div 
              className='Cart-Button'
              onClick={()=>{item.quantity>1&&State.modCart(i,item.quantity-1)}}
            >
              <MinusSquare className='Cart-Feather'/>
            </div>
          </div>
        </div>
      )}
    </div>
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