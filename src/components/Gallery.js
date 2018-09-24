import React from 'react'
import './andy.css'

class Gallery extends React.Component{
  constructor(){
    super()
    this.state={
      view:0
    }
  }
  render(){
    const {imageList} = this.props
    const {view} = this.state
    return(
      <div className='Gallery-Container'>
        <div className='Gallery-Image-Container'>
          <div className='Gallery-Left-Nav' onClick={this.handleClickLeft}>
            <p className='Gallery-Left-Nav-Icon'
              style={{opacity:view==0?.5:1}}
            >{'<'}</p>
          </div>
          <img className='Gallery-Image' src={imageList[view].image}/>
          <div className='Gallery-Right-Nav' onClick={this.handleClickRight}>
            <p className='Gallery-Right-Nav-Icon'
              style={{opacity:view==imageList.length-1?.5:1}}
            >{'>'}</p>
          </div>
        </div>
        <div>{[...imageList].map((_,i)=><div className='Select-Bullets' style={{fontSize:i==view?'10px':'8px' ,opacity:i==view?0.4:1}}> {' O '} </div>)}</div>
      </div>
    )
  }
  handleClickLeft=()=> this.setState(s=>({view: s.view==0 ? 0 : s.view-1}))
  handleClickRight=()=>this.setState(s=>({view: s.view>=this.props.imageList.length-1 ? this.props.imageList.length-1 : s.view+1}))
}
export default Gallery