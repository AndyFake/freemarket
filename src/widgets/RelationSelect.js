import React from 'react'

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

export function RelationSelectControl(RelationWidget){
  class RelationSelectControl extends React.Component{
    constructor(props){
      super(props)
      console.log(JSON.stringify(props))
      this.state={
        loading:'not done',
        data:[]
      }
    }
    handleChange = e => {
      this.props.onChange(e.target.value);
    };
    // componentDidMount(){
    //   if(this.state.loading=='not done'){
    //     fetch( URL, { method:"GET" } )
    //     .then(r => r.json() )
    //     .then(r =>{
    //       var data = []
    //       var products = JSON.parse(atob(r.content)).products
    //       for(var p of products){
    //         stock.push({title:p.title,stock:p.stock})
    //         for(var {options:o} of p){
    //           o.separateStock && stock.push({title: p.title + ':' + o.option, stock: o.stock})
    //         }
    //       }
    //       this.setState({data,loading:'done'})
    //     })
    //   }
    // }
    componentDidMount(){
      console.log('ref=>')
      console.log(this.relation)
      console.log('relation.props.query=>')
      console.log(this.relation.props.query)
    }
    render(){
      // var _props = {...this.props}
      // _props.field.options=['test','test2']
      // _props.field.default='test'
      // _props.value='test'
      // const query = this.props.query
      // console.log(query)
      console.log(this.props)
      console.log('q=> ')
      if(this.relation){
        console.log(this.relation.props.query)
        console.log(this.props.query)
      }
      // console.log(_props.field.get('options'))
      const {forID,value,classNameWrapper,setActiveStyle,setInactiveStyle} = this.props
      const options = [
        {label:'one',value:'one'},
        {label:'two',value:'two'}
      ]
      
      // const test = this.props.field.getAsset()
      return(
        <div>
          {/* <SelectWidget {..._props} /> */}
          <RelationWidget {...this.props} ref={i=>this.relation=i} />
          {/* <select
            id={forID}
            value={value || ''}
            onChange={this.handleChange}
            className={classNameWrapper}
            onFocus={setActiveStyle}
            onBlur={setInactiveStyle}
          >
            {options.map((option, idx) => (
              <option key={idx} value={option.value}>
                {option.label}
              </option>
            ))}
          </select> */}
        </div>

      )
    }
  }
  return RelationSelectControl
}