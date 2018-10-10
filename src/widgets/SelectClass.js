import React from 'react'

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

// file = products

// export function SelectFile(data,collection,param){
export class SelectClass extends React.Component{

    handleChange = e => {
      this.props.onChange(e.target.value);
    };
    
    render(){
      const {forID,value,classNameWrapper,setActiveStyle,setInactiveStyle} = this.props
      const options = data.shipping.map(x=>x.title)
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
//   }
//   return SelectFile
// }