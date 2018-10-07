import React, { Component } from "react";

// import uuid from 'uuid/v4';
// import styled from "styled-components";
const URL = `http://api.github.com/repos/marchingband/freemarket/contents/content/settings/stock.json`

// This is the editing component
export class TestWidgetControl extends Component {
  constructor(){
    super()
    this.state={data:'not done'}
  }
  componentDidMount(){
    console.log('start fetch')
    fetch( URL, { method:"GET" } )
    .then(r => r.json() )
    .then(r =>{
      console.log('fetched')
      this.setState({data:'done'})
      const store = atob(r.content)

  })
    // .then(r => console.log(atob(r.content)) )
  }
  render(){
    return(
      <div>{'this is the content'+this.state.data}</div>
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