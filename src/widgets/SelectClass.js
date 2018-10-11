import React from 'react'

// const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`
const BASE_URL = `https://api.github.com/repos/marchingband/freemarket/contents/content`

// file = products

export function SelectClass(data){
  return class SelectClass extends React.Component {
    // static propTypes = {
    //   onChange: PropTypes.func.isRequired,
    //   value: PropTypes.node,
    //   forID: PropTypes.string.isRequired,
    //   classNameWrapper: PropTypes.string.isRequired,
    //   setActiveStyle: PropTypes.func.isRequired,
    //   setInactiveStyle: PropTypes.func.isRequired,
    //   field: ImmutablePropTypes.contains({
    //     options: ImmutablePropTypes.listOf(
    //       PropTypes.oneOfType([
    //         PropTypes.string,
    //         ImmutablePropTypes.contains({
    //           label: PropTypes.string.isRequired,
    //           value: PropTypes.string.isRequired,
    //         }),
    //       ]),
    //     ).isRequired,
    //   }),
    // };
  
    // static defaultProps = {
    //   value: '',
    // };

    constructor(props){
      super(props)
      this.state={
        options : data.shipping ? data.shipping.map(x=>x.title) : []
      }
    }

    componentDidMount(){
      try{
        fetch('https://api.github.com/repos/marchingband/freemarket/contents/content/shipping',{ method:"GET" })
        .then(r=>r.json()).then(r=>r.map(f=>f.path))
        .then(paths=>Promise.all(
          paths.filter(p=>p!="content/shipping/.init.txt").map(path=>
            fetch('https://api.github.com/repos/marchingband/freemarket/contents/'+path,{ method:"GET" })
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
      // const fieldOptions = field.get('options');
  
      // if (!fieldOptions) {
      //   return <div>Error rendering select control for {field.get('name')}: No options</div>;
      // }
  
      // const options = [
      //   ...(field.get('default', false) ? [] : [{ label: '', value: '' }]),
      //   ...fieldOptions.map(option => {
      //     if (typeof option === 'string') {
      //       return { label: option, value: option };
      //     }
      //     return Map.isMap(option) ? option.toJS() : option;
      //   }),
      // ];
      // const options = data.shipping ? data.shipping.map(x=>x.title) : []
      // const options = data.shipping.map(x=>x.title)
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
// export function SelectFile(data,collection,param){
//   return class SelectClass extends React.Component{
//     handleChange = e => {
//       this.props.onChange(e.target.value);
//     };
    
//     render(){
//       const {forID,value,classNameWrapper,setActiveStyle,setInactiveStyle} = this.props
//       const options = this.props.data.shipping.map(x=>x.title)
//       return(
//         <div>
//           <select
//             {...this.props}
//             id={forID}
//             value={value || ''}
//             onChange={this.handleChange}
//             className={classNameWrapper}
//             onFocus={setActiveStyle}
//             onBlur={setInactiveStyle}
//           >
//             {options.map((option, idx) => (
//               <option key={idx} value={option}>
//                 {option}
//               </option>
//             ))}
//           </select>
//         </div>
//       )
//     }
//   }
// }

//   }
//   return SelectFile
// }