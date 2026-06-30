const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// register 

const registerUser = async (req,res)=>{
    const {firstName,lastName,email,password} = req.body;

    try{
        const userExists = await User.findOne({email});
        if(userExists){
            return res.status(400).json({message:'User already exists'});
        }
        const newUser = await User.create({firstName,lastName,email,password});

        res.status(201).json({
            _id: newUser._id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            role: newUser.role,
            token: generateToken(newUser._id)
        });
    }
    catch(err){
        res.status(500).json({message:err.message});
    }
};

// login 

const loginUser = async (req,res)=>{
    const {email,password} = req.body;

    try{
        const user = await User.findOne({email});

        if(user && (await user.matchPassword(password))){
            res.json({
                _id: user._id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(401).json({message:"invalid email or password"});
        }
    }
    catch (err){
        res.status(500).json({message: err.message});
    }
};

module.exports = {registerUser,loginUser};

