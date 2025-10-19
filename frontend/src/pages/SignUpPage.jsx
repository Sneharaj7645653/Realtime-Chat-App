import React from 'react'
import {useAuthStore} from '../store/useAuthStore.js';

const SignUpPage = () => {
  const {authUser} = useAuthStore();
  return (
    <div>
      sign up page
    </div>
  )
}

export default SignUpPage
