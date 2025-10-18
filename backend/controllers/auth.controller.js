import { generateToken } from '../lib/util.js';
import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    console.log(req.body);
    try {
        if (password.length < 6) {
            return res.status(400).json({ msg: "Password must be at least 6 characters long." });
        }
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User with this email already exists." });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);


        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });


        if (newUser) {
            const token = generateToken(newUser._id, res);
            await newUser.save();
            return res.status(201).json({ msg: "User registered successfully", user: newUser, token });
        }
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }

}

export const login = async (req, res) => {
    let { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ msg: "All fields are required." });
        }
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "Invalid email or password." });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid email or password." });
        }
        const token = generateToken(user._id, res);
        return res.status(200).json({ msg: "Login successful", user, token });
        res.status(200).json({ msg: "Login successful" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
}

export const logout = (req, res) => {
    try{
        res.cookie('jwt', '', {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 0,
            secure: process.env.NODE_ENV !== 'development',
        });
        return res.status(200).json({ msg: "Logout successful" });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
}

export const updateProfile = async (req, res) => {
    
}