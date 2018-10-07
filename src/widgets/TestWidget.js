import React, { Component } from "react";

// import uuid from 'uuid/v4';
// import styled from "styled-components";
const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store.json`

// This is the editing component
export class TestWidgetControl extends Component {
  constructor(){
    super()
    this.state={
      data:'not done',
      stock:[]
    }
  }
  componentDidMount(){
    if(this.state.data=='not done'){
      console.log('start fetch')
      fetch( URL, { method:"GET" } )
      .then(r => r.json() )
      .then(r =>{
        console.log('fetched')
        this.setState({data:'done'})
        console.log(atob(r.content))
        var stock = []
        for(let p of JSON.parse(atob(r.content)).products){
          stock.push(stock.push({title:p.option,stock:p.stock}))
          for(let o of p.options){
            o.separateStock && stock.push({title: p.title + ':' + o.option, stock: o.stock})
          }
        }
        // JSON.parse(atob(r.content)).products.forEach(p=>{
        //   p.options.forEach(o=>{
        //     if(o.separateStock){
        //       stock.push({title: p.title + ':' + o.option, stock: o.stock})
        //     }
        //   })
        //   stock.push({title:p.title,stock:p.stock})
        // })
        this.setState({stock})
        console.log(stock)
      })
    }
  }
  render(){
    const {stock} = this.state
    return(
      <div>
        {stock.map(p=><div>{p.title + " : " + p.stock}</div>)}
      </div>
    )
  }
}

//   constructor(){
//     super(props)
//     this.controlID=uuid()
//   }
//   componentDidMount() {
//     const collection = 'products';
//     const searchFields = 'status';
//     const value = 'published'
//     this.props.query(this.controlID, collection, searchFields, value);
//   }
//   render() {
//     const {queryHits} = this.props
//     console.log(JSON.stringify(queryHits))
//     return (
//       <div>
//         {queryHits.get(this.controlID).map(hit=><div>{hit.data.title}</div>)}
//       </div>
//     )
//   }
// }

// This is the preview component
export const TestWidgetPreview = props => <div></div>;