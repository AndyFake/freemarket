import React from 'react'
import './Select.css'
import {ChevronLeft} from 'react-feather'

class Select extends React.Component{
  constructor(props){
    super(props)
    this.state={open:false,selection:null,options:props.options}
  }
  componentWillReceiveProps(props){
    //if props change while the tray is closed
    // if(props.options && !this.state.open){
    //   if(this.state.options[0].label!=props.options[0].label) {
    //     this.setState({selection:null})
    //   }
    // }
  }
  reset(){
    this.setState({open:false,selection:null,options:this.props.options})
  }
  render(){
    const {options=[],onChange=()=>{},title=''} = this.props
    const {open,selection} = this.state
    return(
      <div className='Select-Container'>
        <div className='Select-Main' onClick={()=>this.setState(s=>({open:!s.open})) } >
          <div className='Select-Text'>
            {!open ? selection!=null ? (options[selection].label?options[selection].label:options[selection]) : title : title}
          </div>
          <div className='Select-Icon-Box'>
            <div className='Select-Feather-Circle'>
              <ChevronLeft size={19} className='Select-Feather' style={{transform: [`rotate(${open?90:-90}deg)`]}}/>
            </div>
          </div>
        </div>
        {open && 
          options.map((option,i)=>{
            return(
              <div 
                className='Select-Dropdown' 
                style={{top:(i+1)*30+'px',backgroundColor:i==selection?'grey':'white'}}
                onClick={()=>{
                  this.setState({selection:i,open:false});
                  onChange(options[i])
                }}
                  >
                  <p className='Select-Text'>{option.label?option.label:option}</p>
                  <p className='Select-Text' style={{whiteSpace: 'pre-wrap',color:'grey',fontSize:11}}>
                    {option.cost && option.cost>0 ? `   (+$${option.cost})`:null}
                  </p>
              </div>
            )
          })
        }
      </div>
    )
  }
}
export default Select