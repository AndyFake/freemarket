import React from 'react'
import Link from '../components/Link'
import './Cart.css';
import State from './state'
import { observer } from 'mobx-react';
import {PlusSquare, MinusSquare, XSquare} from 'react-feather'
import atob from 'atob'
import data from '../data.json'
import {GITHUB_USERNAME} from '../PUBLIC_KEY.js'

const URL = `https://api.github.com/repos/${GITHUB_USERNAME}/freemarket/contents/content/settings/stock.json`
const stock = data.inventory[0].inventory

const getStock=item=>{
  var chosenOption = {}
  if(item.options && item.options.filter(o=>o.title==item.selected) > 0 ){
    chosenOption = item.options.filter(o=>o.title==item.selected)[0]
  }
  if(item.selected!='' && chosenOption.separateStock){
    const name = ''+item.title+'('+chosenOption.title+')'
    return stock.filter(i=>i.title==name)[0].value
  }
  if(item.trackInventory){
    if(stock.filter(i=>i.title==item.title).length>0){
      return stock.filter(i=>i.title==item.title)[0].value
    }
    return 1
  }
  return -1
}

const Cart = () =>{
  
return(
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
          {item.selected != ' ' && 
            <div className='Cart-Item-Name-Text' style={{color:'grey'}}>
              {item.selected}
            </div>
          }
        </div>
        <div className='Cart-Quantity-Widget'>
          <div 
            onClick={(e)=>{
              e.preventDefault()
              // getStock() is broken
              if(getStock(item)>=0 && (getStock(item) < item.quantity+1)){
                window.alert(`sorry we only have ${getStock(item)} in stock `)
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
              onChange={e=>{
                // getStock() is broken
                if(getStock(item)>=0 && (getStock(item) < parseInt(e.target.value)||0)){
                  window.alert(`sorry we only have ${getStock(item)} in stock `)
                }else{
                  State.modCart(i,parseInt(e.target.value)||0)
                }
              }}
              onKeyPress={e=>e.key==='Enter'&&this[i].blur()}
            />
          </div>
          <div 
            onClick={(e)=>{
              e.preventDefault()
              item.quantity>1&& State.modCart(i,item.quantity-1)
            }}
          >
            <MinusSquare size={29} className='Cart-Feather'/>
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
)}
export default observer(Cart)