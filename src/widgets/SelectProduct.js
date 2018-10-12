import React from 'react'
import {GITHUB_USERNAME} from '../PUBLIC_KEY.js'

const BASE_URL = `https://api.github.com/repos/${GITHUB_USERNAME}/freemarket/contents/content`

export function SelectProduct(data){
  return class SelectProduct extends React.Component {
    constructor(props){
      super(props)
      this.state={options : data.products ? data.products.map(x=>x.title) : []}
    }
    componentDidMount(){
      try{
        fetch(BASE_URL+"/products",{ method:"GET" })
        .then(r=>r.json()).then(r=>r.map(f=>f.path))
        .then(paths=>Promise.all(
          paths.filter(p=>p!="content/products/.init.txt").map(path=>
            fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/freemarket/contents/`+path,{ method:"GET" })
            .then(r=>r.json()).then(r=>JSON.parse(atob(r.content)))
          )
        ))
        .then(r=>this.setState({options:r.map(c=>c.title)}))
      }catch(e){console.log(e)}
    }

    handleChange = e => {
      this.props.onChange(e.target.value);
    };

    render() {
      const { field, value='', forID, classNameWrapper, setActiveStyle, setInactiveStyle } = this.props;
      return (
        <select
          id={forID}
          value={value || ''}
          onChange={this.handleChange}
          className={classNameWrapper}
          onFocus={setActiveStyle}
          onBlur={setInactiveStyle}
        >
          <option value={""} disabled={true} selected={true} hidden={true}>Please Choose...</option>
          {this.state.options.map((option, idx) => (
            <option key={idx} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }
  }
}