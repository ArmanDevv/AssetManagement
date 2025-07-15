import React from 'react'
import Cardz from './Cards'
import SimpleBarChart from './Chart'
import DataTable from './List'
import AccountMenu from './Navbar'
import SideMenu from './SideMenu'
import { Context } from '../Contexts'
function Landingpage(props) {
  return (
    <div className='DashLayout'>
    <SideMenu/>
    <div className= 'DashBack' >
      <div className="Navbar">
        <AccountMenu/>
      </div>
      <h1 className='tEXT'>DASHBOARD</h1>
      <div className="cards">
        <Cardz/>
      </div>

      <div className='bottomm'>
        <div className='bottommleft'>
          <h1 className='tEXT'>RECENT ACTIVITY</h1>
          <div className="lists">
            <DataTable/>
          </div>
        </div>
        <div className='bottommright'>
          <div className="lists" style={{width:'300px'}}>
            <SimpleBarChart/>
          </div>
        </div>
      </div>

    </div>
    </div>
  )
}

export default Landingpage