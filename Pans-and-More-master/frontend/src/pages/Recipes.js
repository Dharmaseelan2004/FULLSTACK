import React, {useEffect,useState } from "react";
import { useParams} from "react-router-dom";
import RecipeList from "../components/RecipeList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRecipesContext } from '../hooks/useRecipesContext'

const Recipes =()=>{
    const {type}=useParams()
    const {user} =useAuthContext()
    const [error,seterror]=useState(null)
    const {state,dispatch}=useRecipesContext()
    const {recipes}=state

    useEffect(()=>{
        const fetchliked=async()=>{
            const response=await fetch('/api/user/liked',
            {
                headers: {'Authorization':`Bearer ${user.token}`}
            })
            const json=await response.json();
            if(!response.ok){
                seterror(json.error)
            }
            else{
                dispatch({type:"SET_RECIPES",payload:json.likedRecipes})
            }
        }
        const fetchsaved=async()=>{
            const response=await fetch('/api/user/saved',
            {
                headers: {'Authorization':`Bearer ${user.token}`}
            })
            const json=await response.json();
            if(!response.ok){
                seterror(json.error)
            }
            else{
                dispatch({type:"SET_RECIPES",payload:json.savedRecipes})
            }
        }
        if (user)
        {
            if(type==='liked'){fetchliked()}
            else if (type==='saved'){fetchsaved()}
        }
    },[user])
    
    return(
        <div>
            <h1>{type} recipes</h1>
            <div  className='recipe-list'>
                {recipes && recipes.length >0 && recipes.map((recipe)=>(<RecipeList key={recipe._id} recipe={recipe}/>))}
                {recipes.length===0 && <p>No recipes yet</p>}
                {error && <p>{error}</p>}
            </div>
        </div>
    )
}

export default Recipes;