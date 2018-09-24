import { observable } from "mobx"

class State {
  cart = observable([])
  selection = observable.box(' ')
  fields = observable({})
  shippingCost = observable.box(0)
  shippingKind = observable.box('')
  setField =(field,val)=>this.fields[field]=val
  getField = field => this.fields[field]
  ATC = (item,options='')=> this.cart.push({...item,quantity:1,options})
  RFC = i=> this.cart.replace(this.cart.slice(0,i).concat(this.cart.slice(i+1)))
  modCart=(index,q)=>this.cart[index].quantity=q
  getTotal=()=>{
    var total = 0
    this.cart.forEach(p=>total+=p.price * p.quantity)
    return total
  }
  getTotalWithShipping=(shipping)=>{
    if(shipping=='USPS'){return this.getTotal()+10}
    if(shipping=='UPS'){return this.getTotal()+13}
    if(shipping=='FEDEX'){return this.getTotal()+12}
    return this.getTotal()
  }
  setSelection=(x)=>this.selection=x
}
export default State = new State()