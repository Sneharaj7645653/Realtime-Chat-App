import React from 'react'
import {useAuthStore} from '../store/useAuthStore.js';


const LoginPage = () => {
  const {authUser} = useAuthStore();
  return (
    <div>
      login page
    </div>
  )
}

export default LoginPage
