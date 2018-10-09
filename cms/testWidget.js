import React, { Component } from "react";
// import styled from "styled-components";

// This is the editing component
export class SlidesControl extends Component {
  render() {
    console.log('collection=> ')
    console.log(this.props.field.get('collection'))
    return <div></div>;
  }
}

// This is the preview component
export const SlidesPreview = props => <div></div>;