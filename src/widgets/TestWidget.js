import React, { Component } from "react";
import uuid from 'uuid/v4';
// import styled from "styled-components";

// This is the editing component
export class TestWidgetControl extends Component {
  constructor(){
    super(props)
    this.controlID=uuid()
  }
  componentDidMount() {
    const collection = 'products';
    const searchFields = 'status';
    const value = 'published'
    this.props.query(this.controlID, collection, searchFields, value);
  }
  render() {
    const {queryHits} = this.props
    console.log(JSON.stringify(queryHits))
    return (
      <div>
        {queryHits.get(this.controlID).map(hit=><div>{hit.data.title}</div>)}
      </div>
    )
  }
}

// This is the preview component
export const TestWidgetPreview = props => <div></div>;