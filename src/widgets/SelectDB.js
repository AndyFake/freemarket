import React from 'react'

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`
const BASE_URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/`

// path = 'shipping/classes.json' || 'shipping/carriers.json' || 'shipping/regions.json'

export function SelectDB(data,path,objectName){
  class SelectDB extends React.Component{
    constructor(props){
      super(props)
      this.state={
        options:data[path].map(x=>x.title)
      }
    }
    handleChange = e => {
      this.props.onChange(e.target.value);
    };
    componentDidMount(){
      fetch(`${BASE_URL}${path}`,{ method:"GET" })
      .then(f=>f.json())
      .then(f=>{
        var items = JSON.parse(atob(r.content))
        var options = items[objectName].map(x=>x.title)
        this.setState({options})
      })
    }
    
    render(){
      const {forID,value,classNameWrapper,setActiveStyle,setInactiveStyle} = this.props
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
            {this.state.options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      )
    }
  }
  return SelectDB
}