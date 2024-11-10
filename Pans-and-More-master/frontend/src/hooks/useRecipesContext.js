import { RecipesContext } from "../context/RecipesContext";
import {useContext} from 'react';

export const useRecipesContext=()=>{
    const context=useContext(RecipesContext)
    if(!context){
        throw new Error('useRecipesContext must be used inside an RecipesContextProvider')
    }
    return context;
}