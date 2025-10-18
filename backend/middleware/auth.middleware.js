import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookeies.token || '';
        if(!token){
            return res.status(401).json({msg:"Not authorized, no token"});
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if(!decoded){
            return res.status(401).json({msg:"Not authorized, token failed"});
        }
        const user = await User.findById(decoded.id).select('-password');
        if(!user){
            return res.status(401).json({msg:"Not authorized, user not found"});
        }
        req.user = user;
        next();
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
}