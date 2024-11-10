import {createContext,useReducer,useEffect} from 'react'

export const  CommentsContext=createContext()

export const commentsReducer=(state,action)=>{
    switch(action.type){
        case "ADD_COMMENT":{
            return {comments: [...state.comments, action.payload] }
        }
        case "DELETE_COMMENT":{
            return {comments:state.comments.filter(comment => comment._id !== action.payload)}
        }
        case "SET_COMMENTS":{
            return {comments:action.payload}
        }
        default:
            return state;
    }
}

export const CommentsContextProvider=({children})=>{
    const [state,dispatch]=useReducer(commentsReducer,{
        comments:[]
    })
    useEffect(()=>{
        const initialize_comments=async()=>{
            const stored=JSON.parse(localStorage.getItem('recipeId'))
            
            if(stored){
                const response=await fetch('/api/recipes/'+stored.recipeId,{
                    headers:{'Authorization':`Bearer ${stored.token}`},
                })
                const json=await response.json()
                if(response.ok){
                    dispatch({type:"SET_COMMENTS", payload:json.comments})
                }
            }                       
        }        
        initialize_comments();        
    },[])
    return (
        <CommentsContext.Provider value={{...state,dispatch}}>
            {children}
        </CommentsContext.Provider>
    )
}