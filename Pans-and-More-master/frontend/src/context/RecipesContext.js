import {createContext,useReducer} from 'react'

export const RecipesContext=createContext()

export const recipesReducer=(state,action)=>{
    switch(action.type){
        case "DELETE_RECIPE":{
            return {recipes:state.recipes.filter(recipe => recipe._id !== action.payload)}
        }
        case "SET_RECIPES":{
            return {recipes:action.payload}
        }
        default:
            return state;
    }
}

export const RecipesContextProvider =({children})=>{
    const [state,dispatch]=useReducer(recipesReducer,{
        recipes:[]
    })
    return(
        <RecipesContext.Provider value={{state,dispatch}}>
            {children}
        </RecipesContext.Provider>
    )
}