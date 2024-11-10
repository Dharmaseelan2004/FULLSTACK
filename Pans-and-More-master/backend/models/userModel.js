const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const validator=require('validator')

const Schema=mongoose.Schema

const userSchema=new Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    username: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    bio: {type:String},
    saved: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
    liked: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Recipe' }],
})

userSchema.statics.signup=async function(firstname,lastname,email,password){
    if(!email||!password||!lastname||!firstname){
        throw Error("All fields are required")
    }
    if(!validator.isEmail(email)){
        throw Error("Invalid Email")
    }
    if (!validator.isStrongPassword(password)){
        throw Error("Password not strong enough")
    }
    const exists =await this.findOne({email})
    if(exists){
        throw Error("Email already in use")
    }
    const salt=await bcrypt.genSalt(10)
    const hash=await bcrypt.hash(password,salt)
    const baseUsername = firstname+lastname;
    const randomIdentifier = Math.random().toString(36).substring(7).toLowerCase();
    const username = `${baseUsername}${randomIdentifier}`;
    const user=await this.create({firstname,lastname,email,password:hash,username})
    return user
}

//statics login method
userSchema.statics.login=async function(credentials,password){
    if(!credentials || !password ){
        throw new Error("All fields must be filled")
    }
    const user1 =await this.findOne({email:credentials})
    const user2=await this.findOne({username:credentials})
    const user=user1|| user2
    if(!user){
        throw Error("incorrect email/username")
    }
    const match= await bcrypt.compare(password,user.password)
    if(!match){
        throw Error("Incorrect password")
    }
    return user
}

module.exports=mongoose.model('User',userSchema)