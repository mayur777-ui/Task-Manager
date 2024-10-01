import USER from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';




export const Register = async(req,res)=>{
    try{
        const {name,email,password} = req.body;

        const exitUser = await USER.findOne({ email: email });
        if (exitUser) {
            return res.status(409).json({ message: "Email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashpassword = await bcrypt.hash(password,salt);
        const newUser = new USER({
            name:name,
            email:email,
            password:hashpassword,
        })
        
        
        await newUser.save();

        res.status(201).json({
            user: newUser,
            message: "User registered successfully"
        });
        
    
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const login = async(req,res)=>{
    try{
        // console.log(req.body);
        const {email,password} = req.body;

        const existUser = await USER.findOne({ email: email });
        if (!existUser) {
            return res.status(404).json({ message: "Email not exists" });
        }
        const isMatch = await bcrypt.compare(password,existUser.password);
        if(!isMatch){
            return res.status(401).json({message: "wrong password entered"});
        }

        const token = jwt.sign({email:existUser,id: existUser._id},process.env.JWT_SECRET,{expiresIn:'1h'});
        res.status(201).json({
            token,
            user:existUser,
            message: "User login successfully"
        });
        
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
}

export const Userdetails = async(req,res)=>{
    const{id} = req.params;
    const {name,email} = await USER.findById(id);
    res.status(200).json({name,email});
}