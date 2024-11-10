const Recipe=require('../models/recipeModel')
const User=require('../models/userModel')
const Comment=require('../models/commentModel')
const mongoose=require('mongoose')

//get top liked recipes
const getTopLikedRecipes=async (req,res)=>{
    const recipes=await Recipe.find({}).sort({'likedby':-1}).limit(30).populate({path:'user',select: '_id username'})
    res.status(200).json(recipes)
}

//get single recipe
const getSingleRecipe = async (req, res) => {
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        console.log('case 1')
        return res.status(404).json({error:'No such recipe'})
    }
    const recipe = await Recipe.findById(id).populate({path:'user',select: '_id username'});
    if (!recipe) {
        console.log('case 2')
        return res.status(404).json("No such recipe");
    }
    const comments=await Comment.find({recipe:id}).populate({path:'user',select: '_id username'})
    
    res.status(200).json({recipe,comments});
}


//create a recipe
const createRecipe=async (req,res)=>{
    const {name,image,cuisine,ingredients,method,time,category,servings}=req.body
    let emptyFields=[];
    if(!name){emptyFields.push('name')}
    if(!image){emptyFields.push('image')}
    if(!cuisine){emptyFields.push('cuisine')}
    if(ingredients.length===0){emptyFields.push('ingredients')}
    if(!method){emptyFields.push('method')}
    if (emptyFields.length>0){
        return res.status(400).json({error:`Please provide ${emptyFields.join(', ')}`,emptyFields:emptyFields})
    }
    try{
        const user=req.user._id
        const recipe= await Recipe.create({name,image,cuisine,ingredients,method,time:Number(time),category,servings:Number(servings),user})
        res.status(200).json(recipe);
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//delete a recipe
const deleteRecipe = async(req,res)=>{
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such recipe'})
    }
    const recipe = await Recipe.findOneAndDelete({_id:id});
    if (!recipe) {
        return res.status(404).json("No such recipe");
    }
    await User.updateMany(
        { $or: [{ liked: id }, { saved: id }] },
        { $pull: { liked: id, saved: id } }
      );  
    await Comment.deleteMany({ recipe: id });
    res.status(200).json({recipe});
}

//edit a recipe
const updateRecipe=async(req,res)=>{
    const {id}=req.params;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such recipe'})
    }
    const recipe = await Recipe.findOneAndUpdate({_id:id},{
        ...req.body
    });
    if (!recipe) {
        return res.status(404).json("No such recipe");
    }
    res.status(200).json(recipe);
}

const getCuisineRecipes=async(req,res)=>{
    const {cuisine}=req.params;
    const cuisineRecipes=await Recipe.find({cuisine}).populate({path:'user',select: '_id username'});
    res.status(200).json({cuisineRecipes})
}


module.exports={getTopLikedRecipes,getSingleRecipe,createRecipe,deleteRecipe,updateRecipe,getCuisineRecipes}
