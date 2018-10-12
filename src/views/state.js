import { observable } from "mobx"

class State {
  cart = observable([])
  selection = observable.box(' ')
  fields = observable({})
  carrier = observable.box(' ')
  region = observable.box(' ')
  shippingCost = observable.box(0)
  carriers = observable([])
  
  setField =(field,val)=>this.fields[field]=val
  getField = field => this.fields[field] ? this.fields[field] : false
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
  setRegions=(x)=>this.regions.replace(x)
  getRegions=()=>this.regions.slice()
  setCarriers=x=>this.carriers.replace(x)
  getCarriers=()=>this.carriers.slice()
  setSelection=(x)=>this.selection.set(x)
  getSelection=()=>this.selection.get()
  setCarrier=x=>this.carrier.set(x)
  getCarrier=()=>this.carrier.get()
  setRegion=x=>this.region.set(x)
  getRegion=x=>this.region.get()
}
export default State = new State()