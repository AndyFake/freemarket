import React from 'react'

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

// file = products

// export function SelectFile(data,collection,param){
export class SelectClass extends React.Component{
    handleChange = e => {
      this.props.onChange(e.target.value);
    };
    
    render(){
      const {Select} = this.props
      const _props = this.props
      _props.options = this.props.data.shipping.map(x=>x.title)
      return(
        <div>
          <Select 
            {..._props}
          >
            {/* {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))} */}
          </Select>
        </div>
      )
    }
  }

//   }
//   return SelectFile
// }