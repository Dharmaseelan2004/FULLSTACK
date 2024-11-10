import {useEffect} from 'react'
import RecipeList from '../components/RecipeList'
import { useRecipesContext } from '../hooks/useRecipesContext'
import {useNavigate} from 'react-router-dom'

const Main=()=>{
    const {state,dispatch}=useRecipesContext()
    const {recipes}=state
    const navigate=useNavigate();
    useEffect(()=>{
        const fetchRecipes=async()=>{
            const response=await fetch('/api/recipes')
            const json=await response.json()
            if(response.ok){
                dispatch({type:"SET_RECIPES",payload:json})
            }
        }
        fetchRecipes()
    },[])
    
    const gotocuisine=(cuisine)=>{
        navigate(`/cuisines/${cuisine}`)
    }

    return (
        <div className="main-page">
            <h2>Top Liked Recipes</h2>
            <div className="recipe-list">
                {recipes && recipes.length >0 && recipes.map((recipe)=>(<RecipeList key={recipe._id} recipe={recipe}/>))}
                {recipes && recipes.length===0 && <p>No recipes yet</p>}
            </div>
            <h1>Recipes by cuisine</h1>
            <button onClick={()=>gotocuisine('Indian')}>Indian</button>
            <button onClick={()=>gotocuisine('Japanese')}>Japanese</button>
            <button onClick={()=>gotocuisine('Italian')}>Italian</button>
            <button onClick={()=>gotocuisine('Thai')}>Thai</button>
            <button onClick={()=>gotocuisine('Mexican')}>Mexican</button>
            <button onClick={()=>gotocuisine('French')}>French</button>
            <button onClick={()=>gotocuisine('Greek')}>Greek</button>
            <button onClick={()=>gotocuisine('Italian')}>Other</button>
        </div>
    )
}

export default Main;