import React from 'react'
import uuid from 'uuid/v4';

const URL = `https://api.github.com/repos/marchingband/freemarket/contents/content/store/store.json`

// export function RelationSelectControl(RelationWidget){
export class RelationSelectControl extends React.Component{
  // not sure about this ctx
    constructor(props){
      super(props)
      // console.log(JSON.stringify(props))
      this.controlID = uuid()
      // this.state={
      //   loading:'not done',
      //   data:[]
      // }
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
    // componentDidMount() {
      // const { value, field } = this.props;
      // if (value) {
      //   const collection = field.get('collection');
      //   const searchFields = field.get('searchFields').toJS();
      //   this.props.query(this.controlID, collection, searchFields, value);
      // }
    // }

    render(){
      // console.log('ref=>')
      // console.log(this.relation)
      console.log('own props=>')
      console.log(this.props)
      console.log('self=>')
      console.log(this)


      // var _props = {...this.props}
      // _props.field.options=['test','test2']
      // _props.field.default='test'
      // _props.value='test'
      // const query = this.props.query
      // console.log(query)
      // console.log(this.props)
      // console.log('querryHits=> ')
      // if(this.relation){
      //   console.log(this.relation.stateProps.queryHits)
      // }
      // console.log(_props.field.get('options'))
      // const {forID,value,classNameWrapper,setActiveStyle,setInactiveStyle} = this.props
      // const options = [
      //   {label:'one',value:'one'},
      //   {label:'two',value:'two'}
      // ]
      
      // const test = this.props.field.getAsset()
      return(
        <div>searching for query
          {/* <SelectWidget {..._props} /> */}
          {/* <RelationWidget {...this.props} ref={i=>this.relation=i} /> */}
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
// return RelationSelectControl