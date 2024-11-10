import {useState} from "react";
import { useAuthContext } from "./useAuthContext";
import { useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';

export const useLogin=()=>{
    const [error,setError]=useState(null)
    const [isLoading,setIsloading]=useState(null)
    const {dispatch} =useAuthContext()
    const navigate=useNavigate()
    const login=async(credentials,password)=>{
        setIsloading(true)
        setError(null)
        const response=await fetch('/api/user/login',{
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({credentials,password})
        })
        const json=await response.json()
        if(!response.ok){
            setIsloading(false)
            setError(json.error)
        }
        if(response.ok){
            localStorage.setItem('user',JSON.stringify({email:json.user.email,token:json.token}))
            dispatch({type:"LOGIN",payload:json})
            setIsloading(false)
            toast.success('Logged In Successfully')
            navigate('/home')
        }
    }
    return {login,isLoading,error}
}