const mongoose=require('mongoose');

const Schema=mongoose.Schema

const commentSchema=new Schema({
    comment: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required:true},
    recipe: { type: Schema.Types.ObjectId, ref: 'Recipe', required:true},
},{timestamps:true});

module.exports=mongoose.model('Comment',commentSchema)



