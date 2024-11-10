import React, {useEffect,useState } from "react";
import { useParams} from "react-router-dom";
import RecipeList from "../components/RecipeList";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRecipesContext } from '../hooks/useRecipesContext'

const Cuisines =()=>{
    const {cuisine}=useParams()
    const {user} =useAuthContext()   
    const [error,seterror]=useState(null)  
    const {state,dispatch}=useRecipesContext()
    const {recipes}=state

    useEffect(()=>{
        const fetchCuisine=async()=>{
            const response=await fetch('/api/recipes/cuisines/'+cuisine)
            const json=await response.json();
            if(!response.ok){
                seterror(json.error)
            }
            else{
                dispatch({type:"SET_RECIPES",payload:json.cuisineRecipes})
            }
        }
            fetchCuisine()
    },[user])

    return(
        <div>
            <h1>{cuisine} Recipes</h1>
            <div className="recipe-list">
                {recipes && recipes.length >0 && recipes.map((recipe)=>(<RecipeList key={recipe._id} recipe={recipe}/>))}
                {recipes && recipes.length===0 && <p>No recipes yet</p>}
            </div>
            {error && <p>{error}</p>}
        </div>
    )
}

export default Cuisines;