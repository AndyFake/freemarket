import React from 'react'

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

// file = products

export function SelectFile(data,collection,param){
  class SelectFile extends React.Component{

    handleChange = e => {
      this.props.onChange(e.target.value);
    };
    
    render(){
      const {forID,value,classNameWrapper,setActiveStyle,setInactiveStyle} = this.props
      const options = data[collection].map(x=>x[param])
      return(
        <div>
          <select
            id={forID}
            value={value || ''}
            onChange={this.handleChange}
            className={classNameWrapper}
            onFocus={setActiveStyle}
            onBlur={setInactiveStyle}
          >
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    }
  }
  return SelectFile
}