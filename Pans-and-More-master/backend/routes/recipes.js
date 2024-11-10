const express=require('express')
const { getTopLikedRecipes,getSingleRecipe,createRecipe,deleteRecipe,updateRecipe, getCuisineRecipes}=require('../controllers/recipeController')

const requireAuth=require('../middleware/requireAuth')

const router =express.Router()

//top liked recipes
router.get('/',getTopLikedRecipes)

//get recipes of a particular cuisine
router.get('/cuisines/:cuisine',getCuisineRecipes)

//get info on one recipe
router.get('/:id',getSingleRecipe)

router.use(requireAuth)

//post a new recipe
router.post('/create',createRecipe)

//delete a recipe
router.delete('/:id',deleteRecipe)

//update a recipe
router.put('/:id',updateRecipe)

module.exports=router