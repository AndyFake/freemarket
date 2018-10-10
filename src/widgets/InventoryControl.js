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
    }

    handleChange = ({title,value}) => {
      var {inventory} = this.state
      inventory[title] = value
      this.props.onChange(inventory);
      this.setState(inventory)
    };
    
    render(){
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