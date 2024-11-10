import {useRecipesContext} from '../hooks/useRecipesContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { toast } from 'react-toastify';

const RecipeList=({recipe})=>{
    const {dispatch}=useRecipesContext();
    const {user}=useAuthContext()
    const navigate = useNavigate();

    const deleteRecipe=async()=>{
        const response=await fetch('/api/recipes/'+recipe._id,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json()
        if(response.ok){
            dispatch({type:'DELETE_RECIPE',payload:recipe._id})
            console.log('sucessfully deleted',json)
            toast.success('Recipe deleted successfully!');
        }
    }

    const editRecipe=()=>{
        navigate(`/recipe/${recipe._id}/edit`)
    }

    const showRecipe=()=>{
        localStorage.setItem('recipeId',JSON.stringify({recipeId:recipe._id}))
        navigate(`/recipe/${recipe._id}`)

    }
    const showUser=()=>{
        navigate(`/${recipe.user._id}/profile`)
    }
    
    return(
        <div className="recipe-item">
            <div onClick={showRecipe}>
            <p className="recipe-name">{recipe.name}</p>
            <img src={recipe.image} alt={recipe.title} height="200px" width="200px"/>
            </div>
            <p className="recipe-user" onClick={showUser}>{recipe.user.username}</p>
            <p>{formatDistanceToNow(new Date(recipe.createdAt),{addSuffix:true})}</p>
            {user&&user.user._id===recipe.user._id &&
            <div className='icons'>
            <span className="material-symbols-outlined" onClick={deleteRecipe}>
                delete
            </span>
            <span className="material-symbols-outlined" onClick={editRecipe}>
                edit
            </span>
            </div>
            }
            <br/>
        </div>
    )
}

export default RecipeList;