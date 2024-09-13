const User = require("../model/user.model");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose'); // Import mongoose

const RegisterUser = async (req, res) => {
    const { username, email, password, bio, profilePicture } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(401).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
        bio,
        profilePicture
    });

    await newUser.save();
    res.status(200).json({
        success: true,
        message: 'User registered successfully',
        userId: newUser.userId  
    });
};

const LoginUser = async (req, res) => {
    const { email, password} = req.body

    const user = await User.findOne({email})

    if(!user) {
        return res.status(404).json({message: "User needs to register first"})
    }

    let confirmPassword = await bcrypt.compare(password, user.password)

    if(!confirmPassword) {
        return res.status(401).json({message: "Invalid Credentials"})
    }

    //token generate for successfull login of user
    const accessToken = jwt.sign(
        {id: user.userId, username: user.username, email: user.email}
        , process.env.SECRET_KEY, 
        {expiresIn: "15min"}
    )

    const refreshToken = jwt.sign(
        {id: user.userId, username: user.username, email: user.email}
        , process.env.SECRET_KEY, 
        {expiresIn: "45min"}
    )
    res.status(200).json({
        accessToken,
        refreshToken,
        user: {
            id: user.userId,
            username: user.username,
            email: user.email
        }
    });
}

const GetUser = async (req, res) => {
    const { userId } = req.params;

    const user = await User.findOne({userId})

    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
        id: user.userId,
        username: user.username,
        bio: user.bio,
        profilePicture: user.profilePicture
    })
}


const UpdateUser = async (req, res) => {
    const { userId } = req.params; 
    const { username, bio, profilePicture } = req.body; 

    try {
       
        const result = await User.updateOne(
            { _id: userId }, 
            { 
                $set: { 
                    username: username ,
                    bio: bio,
                    profilePicture: profilePicture
                }
            }
        );

        
        if (result.matchedCount === 0) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    RegisterUser,
    LoginUser,
    GetUser,
    UpdateUser
};
