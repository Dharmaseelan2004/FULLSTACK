import {createContext,useReducer,useEffect} from 'react'

export const  AuthContext=createContext()

export const authReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":{
            return {user:action.payload}
        }
        case "LOGOUT":{
            return {user:null}
        }
        case "UPDATE":{
            return{user:action.payload}
        }
        default:
            return state
    }
}

export const AuthContextProvider=({children})=>{
    const [state,dispatch]=useReducer(authReducer,{
        user:null
    })
    useEffect(()=>{
        const initialize_user=async()=>{
            const stored=JSON.parse(localStorage.getItem('user'))
            if(stored){
                const response=await fetch('/api/user/profile',{
                    headers:{'Authorization':`Bearer ${stored.token}`},
                })
                const json=await response.json()
                if(response.ok){
                    dispatch({type:"LOGIN", payload:{user:json,token:stored.token}})
                }
            }           
        }
        initialize_user();       
    },[])
    console.log("Authcontext state: ",state)
    return (
        <AuthContext.Provider value={{...state,dispatch}}>
            {children}
        </AuthContext.Provider>
    )
}