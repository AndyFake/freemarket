import React from 'react'

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

export function RelationSelectControl(SelectWidget){
  class RelationSelectControl extends React.Component{
    constructor(props){
      super(props)
      console.log(JSON.stringify(props))
      this.state={
        loading:'not done',
        data:[]
      }
    }
    // componentDidMount(){
    //   if(this.state.loading=='not done'){
    //     fetch( URL, { method:"GET" } )
    //     .then(r => r.json() )
    //     .then(r =>{
    //       var data = []
    //       var products = JSON.parse(atob(r.content)).products
    //       for(var p of products){
    //         stock.push({title:p.title,stock:p.stock})
    //         for(var {options:o} of p){
    //           o.separateStock && stock.push({title: p.title + ':' + o.option, stock: o.stock})
    //         }
    //       }
    //       this.setState({data,loading:'done'})
    //     })
    //   }
    // }
    render(){
      var _props = {...this.props}
      _props.field.options=['test','test2']
      _props.field.default='test'
      _props.value='test'
      console.log(_props)
      return(
        <div>
          <SelectWidget {..._props} />
        </div>

      )
    }
  }
  return RelationSelectControl
}