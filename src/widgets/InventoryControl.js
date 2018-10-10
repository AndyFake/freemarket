import React from 'react'

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

// file = products

const InventoryLine = ({
  forID,
  classNameWrapper,
  setActiveStyle,
  setInactiveStyle,
  item,
  handleChange }) =>
    <div>
      <div>
        {item.title}
      </div>
      <input
        type="text"
        id={forID}
        value={item.value}
        onChange={(e)=>{
          // console.log('onChange child=>')
          // console.log(item.title + '  ' + e.target.value)
          handleChange(
            {
              title:item.title,
              value:e.target.value
            }
          )
        }}
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
        inventory:[]
      }
    }

    componentDidMount(){
      // console.log(this.props)
      // console.log("value=>")
      // console.log(JSON.stringify(this.props.value))
      // Object.keys(this.props.value).forEach(k=>{
      //   console.log(k)
      //   console.log(this.props.value[k])
      // })
      // console.log('building inventory=>')
      const inventory = this.getStockDisplayObject()
      // console.log(inventory)
      this.setState({inventory})
    }

    getStockDisplayObject=()=>{
      var display = []
      const stock = this.props.value
      const products = []
      //check that there are products, to avoid error 'forEach of undefined'
      if(data.products){
        data.products
        // .filter(p=>p.trackInventory)
        .forEach(p=>{
          if(p.options.length<1 && p.trackInventory){products.push(p.title)}
          //if every option tracks its own stock, dont include the parent category
          if(!(p.options.length>0 && p.options.every(o=>o.separateStock))){
            if(p.trackInventory){
              products.push(p.title)
            }
          }
          if(p.options.length>0){
            p.options.forEach(o=>{
              if(o.separateStock){
                products.push(''+p.title+'('+o.title+')')
              }
            })
          }
        })
      }
      products.forEach(title=>{
        const value = stock[title] ? stock[title] : 0
        display.push({title,value})
      })
      return display
    }
    
    

    handleChange = ({title,value}) => {
      var {inventory} = this.state
      //find the element fo the array with the right title
      const field = inventory.filter(i=>i.title==title)[0]
      field.value = value
      this.props.onChange(inventory);
      this.setState({inventory})
      // console.log('onChange in Parent=>')
      // console.log(title + '  ' + value)
      // console.log('new Inventory=>')
      // console.log(inventory)

    };
    
    render(){
      return(
        <div>
          {this.state.inventory.map((item,i)=>
            <InventoryLine {...this.props} key={i} item={item} handleChange={this.handleChange} />
          )}
        </div>
      )
    }
  }
  return InventoryControl
}