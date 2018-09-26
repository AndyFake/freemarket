import React from 'react'
import Link from './Link'
import './Select.css'
import {ChevronLeft} from 'react-feather'

class Select extends React.Component{
  constructor(){
    super()
    this.state={open:false,selection:undefined}
  }
  render(){
    const {options,onChange,title} = this.props
    const {open,selection} = this.state
    return(
      <div className='Select-Container'>
        <div className='Select-Main' onClick={()=>this.setState(s=>({open:!s.open})) } >
          <div className='Select-Text'>{selection ? (options[selection].label||options[selection]) : title}</div>
            <ChevronLeft className='Select-Feather' style={{transform: `rotate(${open?90:-90}deg)`}}/>
        </div>
        {open && 
          options.map((option,i)=>{
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
          })
        }
      </div>
    )
  }
}
export default Select