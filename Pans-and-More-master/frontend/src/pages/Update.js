import {useState} from 'react'
import { useEffect } from 'react'
import { useNavigate} from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import {toast} from 'react-toastify'


const Update=()=>{
    const {user,dispatch}=useAuthContext()
    const [username,setusername]=useState('')
    const [bio,setbio]=useState('')
    const [error,seterror]=useState(null);
    const [loading,setloading]=useState(false)
    const navigate=useNavigate()

    useEffect(()=>{
        if(user){
            setusername(user.user.username)
            setbio(user.user.bio?user.user.bio:'')
        }
    },[user])

    const handleSubmit=async(e)=>{
        e.preventDefault()
        setloading(true)
        const response=await fetch('/api/user/update',{
            method:"POST",
            headers:{'Authorization':`Bearer ${user.token}`,
            'Content-Type': 'application/json'},
            body:JSON.stringify({username,bio})
        })
        const json=await response.json()
        if (response.ok){
            dispatch({type:"LOGIN",payload:{user:json.user,token:user.token}})
            setloading(false);
            toast.success('Profile Updated Successfully')
            navigate('/home')
        }
        else{
            seterror(json.error)
            setloading(false)
        }
    }

    return(
        <div className="page-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Choose a username and bio</h2>
                <label>Username:</label>
                <input type='text'  value={username} onChange={(e)=>{setusername((e.target.value).toLowerCase())}}/>
                <label>bio:</label>
                <input type='text'  value={bio} onChange={(e)=>{setbio(e.target.value)}}/>
                <button disabled={loading}>Done</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    )
}

export default Update;