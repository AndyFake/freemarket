import React from 'react'
import Select from './Select'

const NavIconAndy = () =>
  <Select
    options={[
      {label:'Home',value:'home',link:true},
      {label:'Store',value:'store',link:true},
      {label:'Blog',value:'blog',link:true},
      {label:'Contact',value:'contact',link:true},
      {label:'About',value:'about',link:true},
    ]}
    onChange={()=>{}}
  />


export default NavIconAndy