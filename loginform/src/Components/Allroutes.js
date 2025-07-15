import React from 'react'
import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom'
import Landingpage from './Dashboard/LandingPage'
import MainForm from './login/form';
import PrivateRoute from './login/PrivateRoute';
import Assets from './Pages/Assets';
import Licenses from './Pages/Licenses';
import Consumables from './Pages/Consumables';
import Accessories from './Pages/Accessories';
import Settings from './Pages/Settings';
import Analytics from './Pages/Analytics';
import RegistrationForm from './login/RegistrationForm';
import assetDetails from './Pages/assetDetails';
import ProfileData from './Pages/Profile';
import UpdatePassword from './Pages/ChangePass';
import Logout from './Pages/Logout';
import AssetDetails from './Pages/assetDetails';
function Allroutes() {
  return(
  <Router>
    <Routes>
        <Route path='/' element={<MainForm/>}/>
        <Route path='/recent-users' element={<Landingpage/>}/>
        <Route path='/Logout' element={<Logout/>}/>
        <Route path='/ChangePassword' element={<UpdatePassword/>}/>
        <Route path='/Profile' element={<ProfileData/>}/>
        <Route path='/RegistrationForm' element={<RegistrationForm/>}/>
        <Route path="/dashboard" element={<Landingpage/> } /> 
        <Route path="/dashboard/assetDetails" element ={<AssetDetails/>}/>
        <Route path="/dashboard/assets" element ={<Assets/> }/>
        <Route path="/dashboard/assets" element ={<Licenses/> }/>
        <Route path="/dashboard/assets" element ={<Consumables/> } />
        <Route path="/dashboard/assets" element ={<Accessories/> }/>
        <Route path="/dashboard/assets" element ={<Settings/> }/>
        <Route path="/dashboard/assets" element ={<Analytics/> }/>
    </Routes>

  </Router>);
}

export default Allroutes