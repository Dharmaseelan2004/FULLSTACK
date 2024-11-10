import React,{useEffect,useState}  from 'react';
import {useAuthContext} from '../hooks/useAuthContext'
import {useCommentsContext} from '../hooks/useCommentsContext'
import {useParams,useNavigate } from 'react-router-dom';
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import CommentList from './CommentList';
import {toast} from 'react-toastify';

const RecipeInfo=()=>{
    const [recipe,setrecipe]=useState(null)
    const [liked,setliked]=useState(0);
    const [saved,setsaved]=useState(0)
    const {user,dispatch:authDispatch} =useAuthContext()
    const [newcomment,setnewcomment]=useState('')
    const {comments,dispatch:commentsDispatch}=useCommentsContext()
    const [error,seterror]=useState(null)
    const { rid } = useParams();
    const navigate=useNavigate();

    useEffect(() => {
        if (error!=null){
            toast.error(error)
            seterror(null)
        }
    },[error])

    useEffect(()=>{
        const fetchData = async () => {
            const recipeResponse = await fetch(`/api/recipes/${rid}`);
            const recipeData = await recipeResponse.json();
            console.log(recipeData.ok)
            if(recipeResponse.ok){
                setrecipe(recipeData.recipe)
                commentsDispatch({type:"SET_COMMENTS",payload:recipeData.comments})
            }
            else{
                seterror("Couldn't fetch recipe and comments")
                navigate('/home')  
            }    
          };
          fetchData();
    },[])

    useEffect(()=>{
        if (recipe) {
            if (user && recipe.likedby && recipe.likedby.includes(user.user._id)) {
                setliked(1);
            } else {
                setliked(0);
            }
        }
        if(user){
            if (recipe && user && user.user.saved && user.user.saved.includes(rid))
            {
                setsaved(1)
            }
            else{
                setsaved(0)
            }
        }
    },[recipe,user,rid])

    const deleteRecipe=async()=>{
        const response=await fetch('/api/recipes/'+recipe._id,{
            method:'DELETE',
            headers:{
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json()
        if(response.ok){
            console.log('sucessfully deleted',json)
            toast.success('Recipe deleted successfully')
            navigate('/home')
        }
        else{
            seterror("Couldn't delete recipe")
        }
    }

    const handleLike=async()=>{
        if (liked){
            const response=await fetch('/api/action/'+recipe._id+'/unlike',{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json=await response.json()
            if(response.ok){
                setliked(0)
                setrecipe(json.recipe)
                authDispatch({type:"LOGIN",payload:{user:json.user,token:user.token}})
                console.log(json.message);
            }
        }
        else{
            const response=await fetch('/api/action/'+recipe._id+'/like',{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json=await response.json()
            
            if(response.ok){
                setliked(1)
                authDispatch({type:"LOGIN",payload:{user:json.user,token:user.token}})
                setrecipe(json.recipe)
                console.log(json.message);
            }
        }
    }

    const editRecipe=()=>{
        navigate(`/recipe/${recipe._id}/edit`)
    }

    const handleSave=async()=>{
        if(saved){
            const response=await fetch('/api/action/'+recipe._id+'/removesave',{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json=await response.json()
            if(response.ok){
                setsaved(0)
                authDispatch({type:"LOGIN",payload:{user:json.user,token:user.token}})
                console.log(json.message);
                toast.success('Recipe removed from saved')
            }
        }
        else{
            const response=await fetch('/api/action/'+recipe._id+'/save',{
                method:'POST',
                headers:{
                    'Authorization':`Bearer ${user.token}`
                }
            })
            const json=await response.json()
            
            if(response.ok){ 
                setsaved(1);
                authDispatch({type:"LOGIN",payload:{user:json.user,token:user.token}})
                console.log(json.message);
                toast.success('Recipe saved')
            }
        }
    }
    
    const submitComment=async(e)=>{
        e.preventDefault()
        if (!user){
            seterror("Please login to post a comment")
            return 
        }
        const comment={comment:newcomment}
        const response=await fetch('/api/action/'+recipe._id+'/comment',{
            method:'POST',
            body: JSON.stringify(comment),
            headers:{
                'Content-Type':'Application/json',
                'Authorization':`Bearer ${user.token}`
            }
        })
        const json=await response.json()
        if(!response.ok){
            seterror(json.error);
        }
        else{            
            commentsDispatch({type:"ADD_COMMENT",payload:json.newComment})
            toast.success('Comment Posted!')
            setnewcomment('')
        }
        }    

        const showUser=()=>{
            navigate(`/${recipe.user._id}/profile`)
        }

    if(!recipe){
        return (<p>Loading...</p>)
    }
    if (recipe){
    return(
        <div className="rec-info">
            <div className='left-content'>
                <h1>{recipe.name}</h1> 
                {recipe.user && <p className='recipe-user' onClick={showUser}>by: {recipe.user.username}</p>}
                <p>Cuisine: {recipe.cuisine}</p>            
                <p>Time:{recipe.time} minutes</p>
                <p>Type:{recipe.category}</p>
                <p>Servings:{recipe.servings}</p>
                <p>Ingredients:</p>
                <ul>
                    {recipe.ingredients.map((item,index) => (<li key ={index}>{item}</li>))}
                </ul>
                <p>Directions:</p>
                <p className='directions'>{recipe.method}</p>
                <p>posted {formatDistanceToNow(new Date(recipe.createdAt),{addSuffix:true})}</p>
            </div>
            <div className="right-content">
            {user && user.user._id===recipe.user._id &&
            <div className='icons-container'>
            <span className="material-symbols-outlined" onClick={deleteRecipe}>
                delete
            </span>
            <span className="material-symbols-outlined" onClick={editRecipe}>
                edit
            </span>
            </div>
            }
            <img src={recipe.image} alt={recipe.name} height="300px" width="300px"/>
            
            <p>likes: {recipe.likedby.length}</p>
            <div>
            <button onClick={handleLike}>{liked? "unlike":"like"}</button>
            <button onClick={handleSave}>{saved?"remove save":"save"}</button>
            </div>
            <p>Add a comment:</p>
            <textarea rows='3' cols='35' value={newcomment} onChange={(e)=>setnewcomment(e.target.value)}></textarea>
            <button onClick={submitComment}>post comment</button>
            <p>Comments</p>
            {comments && comments.length >0 && comments.map((c)=>(<CommentList key={c._id} comment={c}/>))}
            {comments.length===0 && <p>No comments yet</p>}
            </div>   
        </div>
    )}
}

export default RecipeInfo;