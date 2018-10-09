import React from 'react'

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

// file = products

export function SelectFile(data,file){
  class SelectFile extends React.Component{

    handleChange = e => {
      this.props.onChange(e.target.value);
    };
    
    render(){
      const {field,forID,value,classNameWrapper,setActiveStyle,setInactiveStyle} = this.props
      const options = {
        'region'  : field.collection.shipping.regions.map(c=>c.title),
        'carrier' : field.collection.shipping.carriers.map(c=>c.title),
      }
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
            {options[file].map((option, idx) => (
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