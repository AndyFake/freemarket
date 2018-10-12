import React from 'react'
import './Gallery.css'
import {ChevronLeft, ChevronRight} from 'react-feather'

class Gallery extends React.Component{
  constructor(){
    super()
    this.state={
      view:0
    }
  }
  render(){
    const {imageList = []} = this.props
    const {view} = this.state
    return(
      <div className='Gallery-Container'>
        <div className='Gallery-Image-Container'>
          {imageList.length>1 && 
            <div className='Gallery-Left-Nav' onClick={this.handleClickLeft}>
              <div className='Gallery-Left-Nav-Icon'
                style={{opacity:view==0?.5:1}}
              >
                <ChevronLeft className='Gallery-Feather'/>
              </div>
            </div>
          }
          {imageList.length>0 && 
            imageList.map((_,i)=>
              <img 
                style={{display:i==view?'inline':'none'}} 
                className='Gallery-Image' 
                src={imageList[i].image}/>
            )
          }
          {imageList.length>1 && 
            <div className='Gallery-Right-Nav' onClick={this.handleClickRight}>
              <div
                  className='Gallery-Right-Nav-Icon'
                  style={{opacity:view==imageList.length-1?.5:1}}
              >
                <ChevronRight className='Gallery-Feather'/>
              </div>
            </div>
          }
        </div>
        <div>
          <div style={{height:'13px'}}>
          {imageList.length>1 && imageList.map((_,i)=>
            <div 
              className='Gallery-Select-Bullets' 
              style={{fontSize:i==view?'10px':'8px' ,opacity:i!=view?0.4:1}}>
              {' O '}
            </div>
          )}
          </div>
        </div>
      </div>
    )
  }
  handleClickLeft=()=> 
    this.setState(s=>({
      view: s.view==0 ? 0 : s.view-1
    }))
  handleClickRight=()=>
    this.setState(s=>({
      view: s.view>=this.props.imageList.length-1 ? this.props.imageList.length-1 : s.view+1
    }))

}
export default Gallery