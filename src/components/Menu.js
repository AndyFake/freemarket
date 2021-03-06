import React,{Fragment} from 'react'
import Link from './Link'
import './Menu.css'
import { Menu,XSquare } from 'react-feather'

// const pages = ['store','blog','about','contact']

class MenuNav extends React.Component{
  constructor(){
    super()
    this.state={
      open:false,
      selections:0
    }
  }
  render(){
    const {open,selection} = this.state
    const {links} = this.props
    return(
      <Fragment>
        <div onClick={(e)=>{e.preventDefault();this.setState(s=>({open:!s.open}))}}>
          {!open && <Menu size={29} className='Menu-Feather'/>}
          {open  && <XSquare size={29} className='Menu-Feather' style={{zIndex:100,stroke:'white'}}/>}
        </div>
        {open &&
          <div className='Menu-Container'>
          {links.map((page,i)=>
            <Link to={page=='home'?'/':page}>
              <div 
                className='Menu-Link' 
                // className='Menu-Dropdown' 
                style={{top:(i+1)*30+'px',backgroundColor:i==selection?'grey':'white'}}
                onClick={()=>{this.setState({selection:i,open:false})}}
              >
              {/* {i!=0 && <hr className='Menu-hr'/>} */}
                <div className='Menu-Text'>{page}</div>
              </div>
            </Link>
          )}
          </div>
        }
      </Fragment>
    )
  }

}

export default MenuNav