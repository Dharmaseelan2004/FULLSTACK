const User=require('../models/userModel')
const Recipe=require('../models/recipeModel')
const Comment=require('../models/commentModel')
const mongoose=require('mongoose')

//like a recipe
const likeRecipe=async(req,res)=>{
    const {id}=req.params;
    const uid=req.user.id;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such recipe'})
    }
    const recipe=await Recipe.findOneAndUpdate({ _id: id },
        { $addToSet: { likedby: uid } },
        { new: true } 
    )
    const user=await User.findOneAndUpdate({_id:uid},
        { $addToSet: { liked: id } },
        { new:true }
    )
    if(!recipe){
        return res.status(404).json({error:'No such recipe or user'})
    }
    res.status(200).json({ message: 'Recipe liked successfully', recipe,user });
}

//unlike a recipe
const unlikeRecipe=async(req,res)=>{
    const {id}=req.params;
    const uid=req.user.id;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such recipe'})
    }
    const recipe=await Recipe.findOneAndUpdate( { _id: id },
        { $pull: { likedby: uid } },
        { new: true } 
    )
    const user=await User.findOneAndUpdate({_id:uid},
        { $pull: { liked: id } },
        { new:true }
    )
    if(!recipe || !user){
        return res.status(404).json({error:'No such recipe or user'})
    }
    res.status(200).json({ message: 'Recipe unliked successfully', recipe,user});
}

//save a recipe
const saveRecipe=async(req,res)=>{
    const {id}=req.params;
    const uid=req.user.id;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such recipe'})
    }
    const recipe=await Recipe.findOne({ _id: id })
    if(!recipe)
    {
        return res.status(404).json({error:'No such recipe'})
    }
    const user=await User.findOneAndUpdate({_id:uid},
        { $addToSet: { saved: id } },
        { new:true }
    )
    if(!user){
        return res.status(404).json({error:'No such user'})
    }
    res.status(200).json({ message: 'Recipe saved successfully',user });
}

//unsave a recipe
const removeSave=async(req,res)=>{
    const {id}=req.params;
    const uid=req.user.id;
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such recipe'})
    }
    const recipe=await Recipe.findOne( { _id: id })
    const user=await User.findOneAndUpdate({_id:uid},
        { $pull: { saved: id } },
        { new:true }
    )
    if(!recipe || !user){
        return res.status(404).json({error:'No such recipe or user'})
    }
    res.status(200).json({ message: 'Recipe save removed successfully',user});
}

//comment on a recipe
const commentRecipe=async(req,res)=>{
    const {id}=req.params;
    const uid=req.user.id;
    
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such recipe'})
    }
    const {comment}=req.body;
    if (!comment){return res.status(400).json({error:"Please type a comment to post"})}
    try{
        const newc = await Comment.create({comment,user:uid,recipe: id,})
        const newComment=await newc.populate('user', 'username _id')
        res.status(200).json({newComment})
    }catch(error)
    {
        res.status(400).json({error:error.message})
    }

}

//delete a comment
const deleteComment=async(req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'No such comment'})
    }
    const comment = await Comment.findOneAndDelete({_id:id});
    if (!comment) {
        return res.status(404).json("No such comment");
    }
    res.status(200).json({comment});
}

module.exports={likeRecipe,unlikeRecipe,saveRecipe,removeSave,commentRecipe,deleteComment}



