import {create} from 'zustand';
import axiosInstance from '../lib/axios.js';

export const useAuthStore = create((set) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIn: false,
    isUpdatingProfile: false,
    isCheckingAuth: true,

    checkAuth: async () =>{
        try{
            const res = await axiosInstance.get('/auth/check');
            set({authUser: res.data});
        }
        catch(err)
        {
            console.error("Error checking authentication:", err);
            set({authUser: null});
        }
        finally{
            set({isCheckingAuth: false});
        }
    },

    signup: async (data) =>{
        set({isSigningUp: true});
        try{
            const res = await axiosInstance.post('/auth/signup', data);
            set({authUser: res.data.user});
        }
        catch(err)
        {
            console.error("Error during signup:", err);
        }
        finally{
            set({isSigningUp: false});
        }
    },

}));