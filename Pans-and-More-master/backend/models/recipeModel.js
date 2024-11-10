const mongoose=require('mongoose');

const Schema=mongoose.Schema

const recipeSchema=new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    cuisine: { type: String, required: true },
    ingredients: [{ type: String, required: true }],
    method: { type: String, required: true },
    time: { type: Number, required: true },
    category: { type: String, required: true },
    servings: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required:true}, 
    likedby:[{type: mongoose.Schema.Types.ObjectId, ref: 'User'}],
},{timestamps:true});

module.exports=mongoose.model('Recipe',recipeSchema)



