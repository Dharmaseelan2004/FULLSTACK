import {BrowserRouter,Routes,Route,Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import Home from './pages/Home'
import Main from './pages/Main'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Update from './pages/Update'
import EditRecipe from './pages/EditRecipe'
import RecipeForm from './pages/RecipeForm'
import Navbar from './components/Navbar'
import RecipeInfo from './components/RecipeInfo'
import Recipes from './pages/Recipes'
import Profile from './components/Profile'
import Cuisines from './pages/Cuisines'
import Search from './pages/Search'

function App() {
  const {user}=useAuthContext()
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
          <div className="pages">
            <Routes>
              <Route path='/' element={!user ? <Home />: <Navigate to="/home"/>}/>
              <Route path='/home' element={<Main />}/>
              <Route path='/signup' element={!user ? <Signup /> : <Navigate to="/home"/>}/>
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/home"/>}/>
              <Route path='/create' element={<RecipeForm />}/>
              <Route path='/updateprofile' element={<Update />}/>
              <Route path='/recipe/:rid' element={<RecipeInfo />}/>
              <Route path="/recipe/:rid/edit" element={<EditRecipe/>}/>
              <Route  path="/user/:type" element={<Recipes/>}/>
              <Route  path="/:uid/profile" element={<Profile/>}/>
              <Route  path="/cuisines/:cuisine" element={<Cuisines/>}/>
              <Route  path="/search" element={<Search/>}/>
            </Routes>
          </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
