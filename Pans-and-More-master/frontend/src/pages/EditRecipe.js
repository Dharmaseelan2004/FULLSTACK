import React,{ useEffect,useState }  from 'react';
import {useAuthContext} from '../hooks/useAuthContext'
import {useParams,useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const EditRecipe=()=>{
    const {user}=useAuthContext()
    const navigate=useNavigate();
    const { rid } = useParams();
    const [recipe,setrecipe]=useState(null);
    const [name,setname]=useState('');
    const [image,setimage]=useState('');
    const [cuisine,setcuisine]=useState('');
    const [ingredients,setingredients]=useState([]);
    const [method,setmethod]=useState('');
    const [time,settime]=useState(0);
    const [category,setcategory]=useState('');
    const [servings,setservings]=useState(0)
    const [error,seterror]=useState(null);
    
    useEffect(()=>{
        const fetchData = async () => {
            try {
                const recipeResponse = await fetch(`/api/recipes/${rid}`);
                const recipeData = await recipeResponse.json();
                setrecipe(recipeData.recipe)
            } catch (error) {
              console.error('Error fetching recipe:', error);
              navigate('/home');
              return;
            }
          };
          if (rid){
          fetchData();
        }
    },[])

    useEffect(()=>{
        if(recipe){
            if (!name){
                setname(recipe.name);
                setimage(recipe.image);
                setcuisine(recipe.cuisine);
                setingredients(recipe.ingredients);
                setmethod(recipe.method);
                settime(recipe.time);
                setcategory(recipe.category);
                setservings(recipe.servings);
                
            }
        }
    },[recipe])
    
    const handleIngredientChange = (e, index) => {
        const newIngredients = [...ingredients];
        newIngredients[index] = e.target.value;
        setingredients(newIngredients);
      };
    
      const addIngredient = () => {
        setingredients([...ingredients, '']);
      };
    
      const removeIngredient = (index) => {
        const newIngredients = [...ingredients];
        newIngredients.splice(index, 1);
        setingredients(newIngredients);
      };
    
    const handleSubmit=async (e)=>{
        e.preventDefault();
        if (!user){
            seterror("Please login to edit recipe")
            return 
        }
        const Recipe={name,image,cuisine,ingredients,method,time,category,servings,}
        const response= await fetch('/api/recipes/'+recipe._id,{
            method:'PUT',
            body:JSON.stringify(Recipe),
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json();
        if(!response.ok){
            seterror(json.error)
        }
        else{
            setname('');
            seterror(null);
            console.log("Successfully updated recipe!");
            toast.success('Recipe updated successfully!');
            navigate(`/${user.user._id}/profile`)
        }
    }

    return(
        <div>
        { recipe && (
        <form className="recipe-form" onSubmit={handleSubmit}>
            <h3>Edit Recipe</h3>
            <tr>
                <td><label>Name:</label></td>
                <td><input type='text' value={name} onChange={e => setname(e.target.value)}/><br /></td>
            </tr>
            <tr>
                <td><label>Image URL:</label></td>
                <td><input type='text'  value={image} onChange={e => setimage(e.target.value)}/></td>
            </tr>
            <tr>
                <td><label>Cuisine:</label></td>
                <td>
                    <input type="radio" name="cuisine" value="Indian" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Indian'}/>Indian<br />
                    <input type="radio" name="cuisine" value="Japanese" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Japanese'}/>Japanese<br />
                    <input type="radio" name="cuisine" value="Italian" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Italian'}/>Italian<br />
                    <input type="radio" name="cuisine" value="Mexican" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Mexican'}/>Mexican<br />
                    <input type="radio" name="cuisine" value="Thai" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Thai'}/>Thai<br />
                    <input type="radio"name="cuisine"  value="French" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'French'}/>French<br />
                    <input type="radio" name="cuisine" value="Greek" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Greek'}/>Greek<br />
                    <input type="radio" name="cuisine" value="Other" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Other'}/>Other<br />
                </td>
            </tr>
            <tr>
                <td><label>Ingredients:</label></td>
                <td>
                    {ingredients && ingredients.map((ingredient, index) => (
                    <div key={index}  className="ingredient-row">
                    <input type="text" value={ingredient} onChange={(e) => handleIngredientChange(e, index)}/>
                    {index >= 0 && (<button type="button" onClick={() => removeIngredient(index)}>Remove</button>)}
                    </div>))}
                    <button type="button" onClick={addIngredient}>Add Ingredient</button>
                </td>
            </tr>
            <tr>
                <td><label>Method:</label></td>
                <td>
                    <textarea value={method} onChange={(e) => setmethod(e.target.value)} rows="8" cols="50">
                    Enter the directions for cooking
                    </textarea>
                </td>
            </tr>
            <tr>
                <td><label>Type: </label></td>
                <td>
                    <input type="radio" name="category" value="Breakfast" onChange={(e)=>{setcategory(e.target.value)}} checked={category === 'Breakfast'}/>Breakfast<br />
                    <input type="radio" name="category" value="Lunch" onChange={(e)=>{setcategory(e.target.value)}} checked={category === 'Lunch'}/>Lunch<br />
                    <input type="radio" name="category" value="Dinner" onChange={(e)=>{setcategory(e.target.value)}} checked={category === 'Dinner'}/>Dinner<br />
                    <input type="radio" name="category" value="Snack" onChange={(e)=>{setcategory(e.target.value)}} checked={category === 'Snack'}/>Snack<br />
                    <input type="radio" name="category" value="Dessert" onChange={(e)=>{setcategory(e.target.value)}} checked={category === 'Dessert'}/>Dessert<br />
                    <input type="radio"name="category"  value="Appetizer" onChange={(e)=>{setcategory(e.target.value)}} checked={category === 'Appetizer'}/>Appetizer<br />
                    <input type="radio" name="category" value="Soups" onChange={(e)=>{setcategory(e.target.value)}} checked={category === 'Soups'}/>Soups<br />
                    <input type="radio" name="category" value="Beverages" onChange={(e)=>{setcategory(e.target.value)}} checked={category === 'Beverages'}/>Beverages<br />
                    <input type="radio" name="category" value="Other" onChange={(e)=>{setcategory(e.target.value)}} checked={category === 'Other'}/>Other<br />
                </td>
            </tr>
            <tr>
                <td><label>Cooking time (in minutes)</label></td>
                <td><input type='number' min='1' max='60' value={time} onChange={(e)=>settime(e.target.value)}/></td>
            </tr>
            <tr>
                <td><label>Number of servings:</label> </td>
                <td><input type='number' min='1' max='10' value={servings} onChange={(e)=>setservings(e.target.value)}/></td>
            </tr>
            <div className="post-button">
                <button>Update</button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
        )}
        </div>  
    )
}

export default EditRecipe;