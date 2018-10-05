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
      <div className='Cart-Line' onClick={(e)=>e.preventDefault()}>
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
            onClick={(e)=>{
              e.preventDefault()
              if(item.stock < item.quantity+1){
                window.alert(`sorry we only have ${item.stock} in stock `)
              }else{
                State.modCart(i,item.quantity+1)
              }
            }}
          >
          <PlusSquare size={29} className='Cart-Feather'/>
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
            onClick={(e)=>{
              e.preventDefault()
              item.quantity>1&&State.modCart(i,item.quantity-1)
            }}
          >
            <MinusSquare size={29} className='Cart-Feather'/>
          </div>
        </div>
        <div className='Cart-Item-Price'>${item.price*item.quantity}</div>
      </div>
    )} 
    <div 
      className='Cart-Footer-Total'
      onClick={()=>{
        fetch("/.netlify/functions/stock", {
          method: "POST",
          body: JSON.stringify({"x":10,"y":100,"z":1000})
        }).then(response => {
          response.json().then(data => {
            const context = JSON.parse(data.context)
            const {url,token} = context.clientContext.identity
            console.log(url + ' ' + token)
            fetch(url,{
              method:"POST",
              token:token
            }).then(response => {
              response.json().then(data => {
                console.log(JSON.stringify(data))
              })})
            // console.log(data.contextString)
            // if(data.status=='succeeded'){
            //   alert(`payment was successful`);
            //   submit(encodeData(token))
            // }
          });
        })
        console.log('click')
      }}  
    >test me where am i
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