export const getUsersForSidebar = async (req, res) => {
    try{
        const loggedInUserId = req.user.id;
        const filteredUsers = await User.find({_id: { $ne: loggedInUserId }}).select('-password');
        return res.status(200).json({ users: filteredUsers }); 
    }
    catch(errr){
        console.error(err);
        return res.status(500).json({ msg: "Server error" });
    }
};