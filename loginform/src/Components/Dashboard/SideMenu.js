import React, { useState } from 'react';
import Menudata from './Menudata.json';
import { Link, useNavigate } from 'react-router-dom';

function SideMenu() {
    const[menuOpen,setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const handleClick = () => {
        if(menuOpen)
          setMenuOpen(false)
        else
        setMenuOpen(true)
    }
    return (
        <div className={` ${menuOpen ? 'WideSideBarDiv' : 'SideBarDiv'} `}>
            <div></div>
            {menuOpen? <i onClick={handleClick} class="fa-solid fa-xmark fa-xl" style={{color: '#e9e8ee', marginLeft:'150px', cursor:'pointer' , marginTop:'-15px'}} ></i>:<i onClick={handleClick} class="fa-solid fa-bars fa-xl menuicon" style={{color: '#e9e8ee', cursor:'pointer'}}></i>}
            <div></div>
          <ul className='SideBarUl'>
            {Menudata.map((item, index) => (
              <li className='SideBarLi' key={index}>
                <Link to={`/Dashboard/${item.name}`}><i  class={item.icon} style={{color: '#e9e8ee'}}></i></Link>
                {menuOpen? <div><p style={{fontSize:'15px', marginLeft:'5px', color:'white'}}><Link to={`/Dashboard/${item.name}`}>{item.name}</Link></p></div> : ""}
              </li> 
            ))}
          </ul>
          <div></div>
          <div></div>
        </div>
      );
}

export default SideMenu