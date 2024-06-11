const bcrypt = require('bcryptjs')
const User = require('../models/user');

async function handleCreateUser(req, res) {
    const { username, email, password, profilePicture } = req.body;
    try {
        let user = await User.findOne({username});

        if (user) {
            return res.status(409).json({
                message: "Username already used"
            })
        }

        user = await User.findOne({email});

        if (user) {
            return res.status(409).json({
                message: "Email already used"
            })
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        user = await User.create({
            username,
            email,
            hash,
            profilePicture,
            entries: []
        })

        await user.save();
        res.status(200).json({ messsage: "User has been created" });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function handleDeleteUser(req, res) {
    const{username, password}=req.body;
    try{
        let user=await User.findOne({username});

        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        else{
            await User.findByIdAndDelete(user._id); 
            res.status(200).json("User has been deleted"); 
        }
    } catch(error){
        res.status(400).json({ error: error.message });
    }
}

async function handleUpdateUser(req, res) {
    const { username, email, password, profilePicture } = req.body;
    try {
        let user = await User.findOne({ username });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        user = await User.findOneAndUpdate(
            { username },
            {
                email,
                password: hash,
                profilePicture
            },
            { new: true }
        );

        res.status(200).json({ message: "User has been updated", user });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

async function handleViewUser(req, res) {
    const { username } = req.body;
    try {
        let user = User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        else {
            return res.status(200).json({ message: "User found", user });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

module.exports={
    handleCreateUser,
    handleDeleteUser,
    handleUpdateUser,
    handleViewUser
}
