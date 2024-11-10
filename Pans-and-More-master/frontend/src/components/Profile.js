import React, { useEffect, useState } from 'react';
import { useAuthContext } from '../hooks/useAuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeList from './RecipeList';
import { useRecipesContext } from '../hooks/useRecipesContext';
import { toast } from 'react-toastify';

const Profile = () => {
    const { user } = useAuthContext();
    const { uid } = useParams();
    const { state, dispatch } = useRecipesContext();
    const navigate = useNavigate();
    const { recipes } = state;
    const [username, setUsername] = useState('');
    const [bio, setBio] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecipes = async (id) => {
            try {
                const response = await fetch(`/api/other/${id}/recipes`);
                const json = await response.json();
                if (!response.ok) throw new Error("Couldn't fetch recipes");
                dispatch({ type: "SET_RECIPES", payload: json.recipes });
            } catch (error) {
                toast.error(error.message);
            }
        };

        const fetchUser = async (id) => {
            try {
                const response = await fetch(`/api/other/${id}/profile`);
                const json = await response.json();
                if (!response.ok) throw new Error("Couldn't get profile details");
                setUsername(json.username);
                setBio(json.bio);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        if (uid && user && user.user._id !== uid) {
            fetchUser(uid);
        } else {
            if (user && user.user) {
                setUsername(user.user.username);
                setBio(user.user.bio);
            }
            setLoading(false);
        }

        fetchRecipes(uid);
    }, [user, uid, dispatch]);

    const handleClick = () => {
        navigate('/updateprofile');
    };

    const clickLiked = () => {
        navigate('/user/liked');
    };

    const clickSaved = () => {
        navigate('/user/saved');
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="profile">
            <header>
                <h2>{username}</h2>
                {user && user.user._id === uid && (
                    <span className="material-symbols-outlined" onClick={handleClick}>
                        edit
                    </span>
                )}
            </header>
            <p>{bio}</p>
            <div>
                {user && user.user._id === uid ? (
                    <>
                        <button onClick={clickLiked}>Liked Recipes</button>
                        <button onClick={clickSaved}>Saved Recipes</button>
                        <h3>My recipes</h3>
                    </>
                ) : (
                    <h3>Recipes by {username}</h3>
                )}
            </div>
            <div className="recipe-list">
                {recipes.length === 0 ? (
                    <p>No recipes yet</p>
                ) : (
                    recipes.map((recipe) => <RecipeList key={recipe._id} recipe={recipe} />)
                )}
            </div>
        </div>
    );
};

export default Profile;
