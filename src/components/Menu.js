import React from 'react'
import Link from './Link'
import './Menu.css'
import { Menu } from 'react-feather'

const pages = ['home','store','blog','about','contact','cart','checkout']

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
    return(
      <div className='Menu-Container'>
        <div onClick={()=>this.setState(s=>({open:!s.open}))}>
          <Menu size={30}/>
        </div>
        {open &&
          pages.map((page,i)=>
            <Link to={page}>
              <div 
                className='Menu-Dropdown' 
                style={{top:(i+1)*30+'px',backgroundColor:i==selection?'grey':'white'}}
                onClick={()=>this.setState({selection:i,open:false})}
              >
              {i!=0 && <hr className='Menu-hr'/>}
                <div className='Menu-Text'>{page}</div>
              </div>
            </Link>

            )
        }
      </div>


    )
  }

}

export default MenuNav