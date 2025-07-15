import React, { useState } from 'react';
import SignIn from './RILForm';
import './form.css';
import CustomerSignIn from './CustomerForm';
import imagepic from './4380747.jpg'

function MainForm() {
    const[RILuser,setRILuser] = useState(false);
    const[customer,setCustomer] = useState(false);
    const[mainForm,setMainForm] = useState(true);
    const handleRILuser = () => {
        setRILuser(true);
        setMainForm(false);
    }
    const handleCustomer = () => {
        setCustomer(true);
        setMainForm(false);
    }

  return (
    <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height:'100vh', backgroundColor:'white'}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'70%', margin:'auto', backgroundColor:'white', padding:'40px', boxShadow: 'rgba(59,130, 246, 0.35) 5px 5px 18px 5px', height:'600px'}}>
        <div>
            <img src={imagepic} width={450}/>
        </div>
        <div>
          {mainForm ? (
          <div className='innerMainForm'> 
          <div className='Header'>
          <h1 style={{fontSize:'30px'}} >Welcome to</h1>
          <h2 style={{fontSize:'30px' , color:'blue', fontWeight:'bold'}} > JAWS platform</h2>
          </div>
          <h1 style={{fontSize:'18px', textDecoration:'underline', margin:'0 0 0 35px'}}>Choose an account type </h1>

          <div className='bottom'>
          <button onClick={handleRILuser} className='btn'>RIL User</button>
          <button onClick={handleCustomer}className='btn'>Customer</button>
          </div>
          </div>
          ) : RILuser ? (<SignIn/>) : <CustomerSignIn/> 
          }
        </div>
      </div>
    </div>
    
  )
}

export default MainForm