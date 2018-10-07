import { observable } from "mobx"

class State {
  cart = observable([])
  selection = observable.box(' ')
  fields = observable({})
  shippingCost = observable.box(0)
  setField =(field,val)=>this.fields[field]=val
  getField = field => this.fields[field]
  ATC = (item,selected='')=> this.cart.push({...item,quantity:1,selected})
  RFC = i=> this.cart.replace(this.cart.slice(0,i).concat(this.cart.slice(i+1)))
  modCart=(index,q)=>this.cart[index].quantity=q
  getTotal=()=>{
    var total = 0
    this.cart.forEach(p=>total+=p.price * p.quantity)
    return total
  }
  getTotalWithShipping=()=>{
    const total= this.getTotal()+this.shippingCost.get()
    return total 
  }
  getCart=()=>this.cart.slice()
  setSelection=(x)=>this.selection=x
  setShippingCost=x=>this.shippingCost.set(x)
}
export default State = new State()