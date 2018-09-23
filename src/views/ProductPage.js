import React from 'react'
import './ProductPage.css'

export default ({ fields }) => {
  const { name, price, images, description } = fields
  return (
        <div className="Product">
          <Gallery imageList={images}/>
          <div className="Product-bar">
            <div className="Product-name">{name}</div>
            <div className="Product-price">${price}</div>
          </div>
          <Select options={['Please Select :','One','Two','Three','four']} onChange={(e)=>{}}/>
          <div className="Add-to-cart" >
              add to cart
          </div>
          <div className="Product-description">{description}</div>
        </div>
    // <article className='SinglePost section light'>
    //   {postFeaturedImage && (
    //     <BackgroundImage
    //       className='SinglePost--BackgroundImage'
    //       src={postFeaturedImage}
    //       alt={title}
    //     />
    //   )}

    //   <div className='container skinny'>
    //     <Link className='SinglePost--BackButton' to='/blog/'>
    //       <ChevronLeft /> BACK
    //     </Link>
    //     <div className='SinglePost--Content relative'>
    //       <div className='SinglePost--Meta'>
    //         {!!categories.length &&
    //           categories.map(obj => (
    //             <span key={obj.category} className='SinglePost--Meta--Category'>
    //               {obj.category}
    //             </span>
    //           ))}
    //         {date && (
    //           <span className='SinglePost--Meta--Date'>
    //             {dateFormatted(date)}
    //           </span>
    //         )}
    //       </div>

    //       {title && <h1 className='SinglePost--Title'>{title}</h1>}

    //       <div className='SinglePost--InnerContent'>
    //         <Content source={body} />
    //       </div>

    //       <div className='SinglePost--Pagination'>
    //         {prevPostURL && (
    //           <Link
    //             className='SinglePost--Pagination--Link prev'
    //             to={prevPostURL}
    //           >
    //             Previous Post
    //           </Link>
    //         )}
    //         {nextPostURL && (
    //           <Link
    //             className='SinglePost--Pagination--Link next'
    //             to={nextPostURL}
    //           >
    //             Next Post
    //           </Link>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    // </article>
  )
}
class Gallery extends Component{
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

class Select extends Component{
  constructor(){
    super()
    this.state={open:false,selection:0}
  }
  render(){
    const {options,onChange} = this.props
    const {open,selection} = this.state
    return(
      <div className='Select-Container'>
        <div className='Select-Main' onClick={()=>this.setState(s=>({open:!s.open})) } >
          <div className='Select-Text'>{options[selection].label||options[selection]}</div>
          <span className='Select-Chevron' style={{transform: `rotate(${open?90:-90}deg)`}}>{'<'}</span>
        </div>
        {open && 
          options.map((option,i)=>
            <div 
              className='Select-Dropdown' 
              style={{top:(i+1)*SELECT_HEIGHT+'px',backgroundColor:i==selection?'grey':'white'}}
              onClick={()=>{
                this.setState({selection:i,open:false});
                onChange(options[i])}}
            >
              <p className='Select-Text'>{option.label || option}</p>
            </div>)
        }
      </div>
    )
  }
}

