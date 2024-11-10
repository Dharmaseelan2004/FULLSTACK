import {useState} from 'react'
import {useSignup} from "../hooks/useSignup"
import '../image.css'

const Signup=()=>{
    const [firstname,setfirstname]=useState('')
    const [lastname,setlastname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const {signup,isLoading,error} = useSignup();

    const handleSubmit=async(e)=>{
        e.preventDefault()
        await signup(firstname,lastname,email,password)
    }

    return(
        <div className="page-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <label>Firstname:</label>
                <input type='text'  value={firstname} onChange={(e)=>{setfirstname(e.target.value)}}/>
                <label>Lastname:</label>
                <input type='text'  value={lastname} onChange={(e)=>{setlastname(e.target.value)}}/>
                <label>Email:</label>
                <input type='email'  value={email} onChange={(e)=>{setemail(e.target.value)}}/>
                <label>Password:</label>
                <input type='password'  value={password} onChange={(e)=>{setpassword(e.target.value)}}/>
                <button disabled={isLoading}>Sign up</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    )
}

export default Signup;