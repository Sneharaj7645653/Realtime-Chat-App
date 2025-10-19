import React from 'react'
import {useAuthStore} from '../store/useAuthStore.js';

const SettingsPage = () => {
  const {authUser} = useAuthStore();
  return (
    <div>
      settings page
    </div>
  )
}

export default SettingsPage
