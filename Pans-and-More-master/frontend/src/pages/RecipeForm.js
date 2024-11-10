import { useState } from 'react';
import {useAuthContext} from '../hooks/useAuthContext'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';

const RecipeForm=()=>{
    const [name,setname]=useState('');
    const [image,setimage]=useState('');
    const [cuisine,setcuisine]=useState('');
    const [ingredients,setingredients]=useState([]);
    const [method,setmethod]=useState('');
    const [time,settime]=useState(0);
    const [category,setcategory]=useState('');
    const [servings,setservings]=useState(0)
    const [error,seterror]=useState(null);
    const {user}=useAuthContext()
    const navigate=useNavigate();

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
            toast.error("Please login to post a recipe")
            seterror("Please login to post a recipe")
            return 
        }
        const Recipe={name,image,cuisine,ingredients,method,time,category,servings,}
        const response= await fetch('/api/recipes/create',{
            method:'POST',
            body:JSON.stringify(Recipe),
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json();
        if(!response.ok){
            toast.error(json.error)
            seterror(json.error)
        }
        else{
            setname('');
            seterror(null);
            console.log("Successfully created recipe!");
            toast.success('Successfully posted recipe');
            navigate(`/${user.user._id}/profile`)
        }
    }

    return(
        <div>
            <form className="recipe-form" onSubmit={handleSubmit}>
                <h3>Create a recipe</h3>
                <tr>
                    <td><label>Recipe Name : </label></td>
                    <td><input type='text' value={name} onChange={e => setname(e.target.value)}/></td>
                </tr>
                <tr>
                    <td><label>Image URL : </label></td>
                    <td><input type='text' value={image} onChange={e => setimage(e.target.value)}/></td>
                </tr>
                <tr>
                    <td><label>Cuisine : </label></td>
                    <td>
                        <input type="radio" name="cuisine" value="Indian" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Indian'}/>Indian<br/>
                        <input type="radio" name="cuisine" value="Japanese" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Japanese'}/>Japanese<br/>
                        <input type="radio" name="cuisine" value="Italian" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Italian'}/>Italian<br/>
                        <input type="radio" name="cuisine" value="Mexican" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Mexican'}/>Mexican<br/>
                        <input type="radio" name="cuisine" value="Thai" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Thai'}/>Thai<br/>
                        <input type="radio"name="cuisine"  value="French" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'French'}/>French<br/>
                        <input type="radio" name="cuisine" value="Greek" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Greek'}/>Greek<br/>
                        <input type="radio" name="cuisine" value="Other" onChange={e=>{setcuisine(e.target.value)}} checked={cuisine === 'Other'}/>Other<br />
                    </td>
                </tr>
                <tr>
                    <td><label>Ingredients : </label></td>
                    <td>
                        {ingredients.map((ingredient, index) => (
                            <div className="ingredient-row" key={index}>
                            <input type="text" value={ingredient} onChange={(e) => handleIngredientChange(e, index)}/>
                            {index >= 0 && (<button type="button" onClick={() => removeIngredient(index)}>Remove</button>)}
                            </div>
                        ))}
                        <button type="button" onClick={addIngredient}>Add Ingredient</button>
                    </td>
                </tr>
                <tr>
                    <td><label>Method : </label></td>
                    <td>
                        <textarea value={method} onChange={(e)=>setmethod(e.target.value)} rows="5" cols="50">
                            Enter the directions for cooking
                        </textarea>
                    </td>
                </tr>  
                <tr>
                    <td><label>Type : </label></td>
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
                    <td><label>Cooking time (in minutes) : </label></td>
                    <td><input type='number' min='1' max='60' value={time} onChange={(e)=>settime(e.target.value)}/></td>
                </tr>   
                <tr>
                    <td><label>Number of servings :</label></td>
                    <td><input type='number' min='1' max='10' value={servings} onChange={(e)=>setservings(e.target.value)}/></td>
                </tr>    
                <div className="post-button">
                    <button>Post Recipe</button>
                </div>
            {error && <div className="error">{error}</div>} 
            </form>  
    </div>
    )
}

export default RecipeForm;