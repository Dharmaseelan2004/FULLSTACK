const express=require('express');

const router=express.Router()

const { loginUser,signupUser,updateProfile,getUser,getLiked,getSaved }=require('../controllers/userController')
const requireAuth=require('../middleware/requireAuth')

//login
router.post('/login',loginUser)

//signup
router.post('/signup',signupUser)

router.use(requireAuth)

//update
router.post('/update',updateProfile)

//get profile
router.get("/profile",getUser)

//get user liked recipes
router.get('/liked',getLiked)

//get user saved recipes
router.get('/saved',getSaved)

module.exports=router