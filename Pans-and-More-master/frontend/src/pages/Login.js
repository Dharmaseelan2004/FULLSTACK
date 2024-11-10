import {useState} from 'react'
import { useLogin } from '../hooks/useLogin'
import '../image.css'
const Login=()=>{
    const [credentials,setcredentials]=useState('')
    const [password,setpassword]=useState('')
    const {login,error,isLoading} =useLogin()

    const handleSubmit=async(e)=>{
        e.preventDefault()
        await login(credentials,password)
    }

    return(
        <div className="page-container">
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Login</h2>
            <label>Email/Username:</label>
            <input type='text'  value={credentials} onChange={(e)=>{setcredentials(e.target.value)}}/>
            <br/>
            <label>Password:</label>
            <input type='password'  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
            <br/>
            <button disabled={isLoading}>Login</button>
            {error && <div className="error">{error}</div>}
        </form>
        </div>
    )
}

export default Login;