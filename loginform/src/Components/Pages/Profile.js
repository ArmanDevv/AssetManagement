import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import UpdatePassword from './ChangePass';

function ProfileData() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/profile', {
          withCredentials: true // Important for sending cookies
        });
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      {userData ? (
        <>
        <div style={{display:'flex', justifyContent:'center', alignItems:'center', flexDirection:'column', height:'100vh', backgroundColor:'white'}}>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'space-evenly', alignItems:'center', width:'70%', margin:'auto', backgroundColor:'white', padding:'40px', boxShadow: 'rgba(59,130, 246, 0.5) 5px 10px 15px', height:'600px'}}>     
        
        <div style={{display:'flex', justifyContent:'space-evenly', alignItems:'center', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', justifyContent:'center', alignItems:'center'}}>
          <div style={{fontSize:'30px', fontWeight:'900', marginBottom:'20px'}}>
            Update password
          </div>
          <div>
          <UpdatePassword/>
          </div>
        </div>
        <div>
          <div style={{fontSize:'30px', fontWeight:'900', marginBottom:'50px'}}>
            User Profile
          </div>
          <h1 style={{fontSize:'18px', fontWeight:'700', display:'inline', width:'50px', marginBottom:'20px'}}>First Name : </h1><p style={{fontSize:'18px', fontWeight:'500', display:'inline', width:'50px', marginLeft:'5px', marginBottom:'20px'}}>{userData.firstName}</p><br></br><div style={{height:'10px'}}></div>
          <h1 style={{fontSize:'18px', fontWeight:'700', display:'inline', width:'50px'}}>Last Name :</h1><p style={{fontSize:'18px', fontWeight:'500', display:'inline', width:'50px', marginLeft:'5px'}}> {userData.lastName}</p><br></br><div style={{height:'10px'}}></div>
          <h1 style={{fontSize:'18px', fontWeight:'700', display:'inline', width:'50px'}}>Email : </h1><p style={{fontSize:'18px', fontWeight:'500', display:'inline', width:'50px', marginLeft:'5px'}}>{userData.email}</p><br></br><div style={{height:'10px'}}></div>
          {/* <h1 style={{fontSize:'18px', fontWeight:'700', display:'inline', width:'50px'}}>Password : </h1><p style={{fontSize:'18px', fontWeight:'500', display:'inline', width:'50px', marginLeft:'5px'}}>{userData.password}</p><br></br><div style={{height:'10px'}}></div> */}
          {/* Display other user details as needed */}
        </div>
        </div>
        <div style={{display:'flex', gap:'20px'}}>
          <button className='btn' > Go back </button>
          {/* <button className='btn' onClick={()=>{navigate('/ChangePassword')}}> Change Password </button> */}
        </div>
        </div>
        </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfileData;
