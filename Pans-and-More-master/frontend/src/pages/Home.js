import '../image.css'
import {useNavigate} from'react-router-dom'
const Home=()=>{
    const navigate=useNavigate()

    const clickLogin=()=>{
        navigate('/login')
    }

    const clickSignup=()=>{
        navigate('/signup')
    }
    
    return(
        <div className="page-container">
            <div className="home-page">
                <h1>Pans&More</h1>
                <p>Welcome to Pans&More, your culinary companion! 
                Explore a curated collection of diverse recipes, 
                from quick weeknight dinners to indulgent treats. 
                Our passion is turning every dish into a delightful 
                experience, blending flavors and sharing the joy of
                cooking. Join our community of food enthusiasts, 
                where we celebrate the art of creating memories 
                through delicious bites. At Pans&More, 
                we're your guide to a world of tasty possibilities</p>
                <p>Join the community for a pantastic experience!</p>
                <button onClick={clickSignup}>Signup</button>
                <br/>
                <button onClick={clickLogin}>Login</button>
                <br/>
            </div>
        </div>
    )
}

export default Home;