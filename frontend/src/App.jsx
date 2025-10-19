import React from 'react'
import Navbar from './components/Navbar.jsx'
import {Routes, Route} from "react-router-dom";
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import {useAuthStore} from './store/useAuthStore.js';
import {useEffect} from 'react';
import {Loader} from "lucide-react";

const App = () => {
  const {authUser,checkAuth} = useAuthStore();
  useEffect(()=>{
    checkAuth();
  }, [checkAuth]);

  console.log("Authenticated User:", authUser);


  if(isCheckingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="animate-spin h-10 w-10 text-blue-500"/>
      </div>
    )
  }

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/signup' element={<SignUpPage/>}/>
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/settings' element={<SettingsPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </div>
  );
};

export default App
