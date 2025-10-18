import express from 'express';
import { signup,login,logout, updateProfile } from '../controllers/auth.controller.js';
const router = express.Router();
import { protectRoute } from '../middleware/auth.middleware.js';


router.post('/signup', signup)
router.post('/login',login)
router.post('/logout',logout)
router.post('/update-profile',protectRoute, updateProfile)

export default router;