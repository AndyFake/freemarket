import React, { Component } from "react";

// import uuid from 'uuid/v4';
// import styled from "styled-components";
const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

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
      fetch( URL, { method:"GET" } )
      .then(r => r.json() )
      .then(r =>{
        var stock = []
        var products = JSON.parse(atob(r.content)).products
        for(var p of products){
          stock.push({title:p.title,stock:p.stock})
          for(var {options:o} of p){
            o.separateStock && stock.push({title: p.title + ':' + o.option, stock: o.stock})
          }
        }
        this.setState({stock,data:'done'})
      })
    }
    fetch("/.netlify/functions/stock", {
      method: "POST",
      body: JSON.stringify([{title:'a weird fish',quantity:1}])
    })

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