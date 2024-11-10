const express=require('express');
const router =express.Router()


const {getRecipes,getProfile,search}=require('../controllers/otherController')

//get recipes of one user
router.get('/:id/recipes',getRecipes)

//get username and bio
router.get('/:id/profile',getProfile)

//search for a recipe
router.get('/search',search)

module.exports=router