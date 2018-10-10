import React from 'react'

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

// file = products

const InventoryLine = ({
  forID,
  classNameWrapper,
  setActiveStyle,
  setInactiveStyle,
  item,
  onChange }) =>
    <div>
      <div>
        {item.title}
      </div>
      <input
        id={forID}
        value={item.quantity}
        onChange={(e)=>onChange(
          {
            title:item.title,
            value:e.target.value
          }
        )}
        className={classNameWrapper}
        onFocus={setActiveStyle}
        onBlur={setInactiveStyle}
      />
    </div>

export function InventoryControl(data){
  class InventoryControl extends React.Component{
    constructor(props){
      super(props)
      this.state={
      //   inventory : data.products.map(p=>({
      //     title:p.title,
      //     // not sure about this
      //     quantity:props.value.inventory[title] || 0
      //   }))
      // }
        inventory:[]
      }
    }

    componentDidMount(){
      console.log(this.props)
      const test = this.props.field.get('inventory')
      console.log("inventory=>")
      console.log(test)

      const inventory = this.getStockDisplayObject()
      console.log(inventory)
      this.setState({inventory})
    }

    getStockDisplayObject=()=>{
      var display = []
      const stock = this.props.field.get('inventory')
      const products = []
      data.products
      .filter(p=>p.trackInventory)
      .forEach(p=>{
        if(p.options.length<1){products.push(p.title)}
        if(p.options.length>0){
          p.options.forEach(o=>{
            products.push(''+p.title+'('+o.title+')')
          })
        }
      })
      products.forEach(title=>{
        const value = stock[title] ? stock[title] : 0
        display.push({title,value})
      })
      return display
    }
    
    

    handleChange = ({title,value}) => {
      var {inventory} = this.state
      inventory[title] = value
      this.props.onChange(inventory);
      this.setState(inventory)
    };
    
    render(){
      // var display = []
      // const stock = this.props.field.get('inventory')
      // const products = []
      // data.products
      // .filter(p=>p.trackInventory)
      // .forEach(p=>{
      //   if(p.options.length<1){products.push(p.title)}
      //   if(p.options.length>0){
      //     p.options.forEach(o=>{
      //       products.push(''+p.title+'('+o.title+')')
      //     })
      //   }
      // })
      // products.forEach(title=>{
      //   const quantity = stock[title] ? stock[title] : 0
      //   display[title] = quantity
      // })
      return(
        <div>
          {this.state.inventory.map((item,i)=>
            <InventoryLine {...this.props} key={i} item={item} onChange={this.handleChange} />
          )}
        </div>
      )
    }
  }
  return InventoryControl
}