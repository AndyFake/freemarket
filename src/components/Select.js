import React from 'react'
import Link from './Link'
import './Select.css'
import {ChevronLeft} from 'react-feather'

class Select extends React.Component{
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
          {/* <span className='Select-Chevron' style={{transform: `rotate(${open?90:-90}deg)`}}> */}
            <ChevronLeft className='Select-Feather' style={{transform: `rotate(${open?90:-90}deg)`}}/>
          {/* </span> */}
        </div>
        {open && 
          options.map((option,i)=>{
            if(option.link!=true){
              return(
                <div 
                  className='Select-Dropdown' 
                  style={{top:(i+1)*30+'px',backgroundColor:i==selection?'grey':'white'}}
                  onClick={()=>{
                    this.setState({selection:i,open:false});
                    onChange(options[i].value || options[i])}}
                >
                  <p className='Select-Text'>{option.label || option}</p>
                </div>
              )
            }
            return(
              <Link to={option.value}>
                <div 
                  className='Select-Dropdown' 
                  style={{top:(i+1)*30+'px',backgroundColor:i==selection?'grey':'white'}}
                  onClick={()=>{
                    this.setState({selection:i,open:false});
                    onChange(options[i].value || options[i])}}
                >
                  <p className='Select-Text'>{option.label || option}</p>
                </div>
              </Link>
            )
          })
        }
      </div>
    )
  }
}
export default Select