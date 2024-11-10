import React,{useEffect,useState} from 'react';
import SearchBar from './SearchBar.js';
import RecipeList from '../components/RecipeList';
import { useRecipesContext } from '../hooks/useRecipesContext.js'

const Search = () => {
  const[search,setsearch]=useState(false)
  const {state,dispatch}=useRecipesContext()
  const {recipes}=state;

  useEffect(()=>{
    dispatch({type:"SET_RECIPES",payload:[]})
  },[])

  const handleSearch = async ({query,type}) => {
    setsearch(true)
    try {
      console.log(query,type)
      const response = await fetch(`/api/other/search?query=${query}&type=${type}`);
      const json = await response.json();
      console.log(json)
      dispatch({type:"SET_RECIPES",payload:json.recipes})
    } catch (error) {
      console.error('Error fetching recipes:', error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />      
            <section>
              {search && <h2>Search Results:</h2>}
                <div className="recipe-list">
                    {recipes.length===0 && search && <p>No recipe found for search query</p>}                    
                    {recipes && recipes.length >0 && recipes.map((recipe)=>(<RecipeList key={recipe._id} recipe={recipe}/>))}
                </div> 
            </section>        
    </div>
  );
};

export default Search;