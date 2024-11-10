const User=require('../models/userModel')
const Recipe=require('../models/recipeModel')
const mongoose=require('mongoose')

//get all recipes posted by a user
const getRecipes=async(req,res)=>{
    const {id}=req.params
    console.log(id)
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such user'})
    }
    const recipes= await Recipe.find({user:id}).populate({
        path: 'user',
        model: 'User',
        select: 'username _id',
      }).select('_id name image createdAt updatedAt user');
    res.status(200).json({recipes})
}

//get username and bio of a user
const getProfile=async (req,res)=>{
    const {id}=req.params
    try{
        const user = await User.findById( id )
        if (!user) {
            throw Error('user not found')
        }
        res.status(201).json({_id:user._id,username:user.username,bio:user.bio})
    }catch(error){
        return  res.status(400).json({error:error.message})
    }
}

//search for a recipe
const search=async(req,res)=>{
  const { query, type } = req.query;
    try {
      let recipes;
      const queryFilter = { name: { $regex: new RegExp(query, 'i') } };
      if (type) {
        recipes = await Recipe.find({ ...queryFilter, category:type }).populate({path:'user',select: '_id username'});
      } else {
        recipes = await Recipe.find(queryFilter).populate({path:'user',select: '_id username'});
      }
      res.json({recipes});
    } catch (error) {
      console.error('Error fetching recipes:', error);
      res.status(500).json({ error: error.message });
}}

module.exports={getRecipes,getProfile,search}