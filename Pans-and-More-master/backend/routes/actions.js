const express=require('express')
const {likeRecipe,unlikeRecipe,saveRecipe,removeSave, commentRecipe, deleteComment}=require('../controllers/actionsController')
const requireAuth=require('../middleware/requireAuth')

const router =express.Router()

router.use(requireAuth)

//like  recipe
router.post('/:id/like',likeRecipe)

router.post('/:id/unlike',unlikeRecipe)

//save recipe
router.post('/:id/save',saveRecipe)

router.post('/:id/removesave',removeSave)

//post and delete comments
router.post('/:id/comment',commentRecipe)

router.delete('/:id/deletecomment',deleteComment)

module.exports=router;