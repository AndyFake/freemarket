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
    }

    handleChange = ({title,value}) => {
      var {inventory} = this.state
      inventory[title] = value
      this.props.onChange(inventory);
      this.setState(inventory)
    };
    
    render(){
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