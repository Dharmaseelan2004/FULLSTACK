const User=require('../models/userModel')
const Recipe=require('../models/recipeModel')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')

const createToken=(_id)=>{
    return jwt.sign({_id},process.env.SECRET,{expiresIn: "3d"})
}

//login
const loginUser=async(req,res)=>{
    const {credentials,password}=req.body
    try{
        const user=await User.login(credentials,password)
        const token=createToken(user._id)
        res.status(200).json({user,token})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

//signup
const signupUser=async(req,res)=>{
    const {firstname,lastname,email,password}=req.body
    try{
        const user=await User.signup(firstname,lastname,email,password)
        const token=createToken(user._id)
        res.status(200).json({user,token})
    }catch(error){
        return res.status(400).json({error:error.message})
    }
}

//update
const updateProfile=async(req,res)=>{
    const {username,bio}=req.body
    const uid=req.user.id
    try{
        const user= await User.findOne({_id:uid})
        if(!user){
            throw Error('User not found')
        }
        if(!username){
            throw Error('Username is required')
        }
        const uname=await User.findOne({username})
        if(uname && uname._id.toString()!==user._id.toString()){
            throw Error('Username already taken')
        }
        user.username=username;
        user.bio= bio;
        const updated=await user.save()
        res.status(200).json({user:updated})
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

const getUser=async (req,res)=>{   
    const id= new mongoose.Types.ObjectId(req.user.id);
    try{
        const user = await User.findById( id )
        if (!user) {
            throw Error('user not found')
        }
        res.status(201).json(user)
    }catch(error){
        return  res.status(400).json({error:error.message})
    }
}


const getLiked=async(req,res)=>{
    const uid=req.user.id
    if (!mongoose.Types.ObjectId.isValid(uid)){
        return res.status(404).json({error:'No such user'})
    }
    const user= await User.findOne({_id:uid}).select('liked')
    if (!user) {
        return res.status(404).json({ error: 'No such user' });
      }
    const likedRecipes = await Recipe.find({ _id: { $in: user.liked } })
      .populate({path: 'user',model: 'User',select: 'username _id',})
      .select('name image _id createdAt updatedAt user');
      if(likedRecipes){
        res.status(200).json({likedRecipes})
      }
      else{
        res.status(401).json({message:"Error in fetching liked recipes"})
      }
}

const getSaved=async(req,res)=>{
    const uid=req.user.id
    if (!mongoose.Types.ObjectId.isValid(uid)){
        return res.status(404).json({error:'No such user'})
    }
    const user= await User.findOne({_id:uid}).select('saved')
    if (!user) {
        return res.status(404).json({ error: 'No such user' });
    }
    const savedRecipes = await Recipe.find({ _id: { $in: user.saved } })
      .populate({
        path: 'user',
        model: 'User',
        select: 'username _id',
      })
      .select('name image _id createdAt updatedAt user');
      if(savedRecipes){
        res.status(200).json({savedRecipes})
      }
      else{
        res.status(401).json({message:"Error in fetching liked recipes"})
      }
}

module.exports={loginUser,signupUser,updateProfile,getUser,getLiked,getSaved}
