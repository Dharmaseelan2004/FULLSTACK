import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RecipesContextProvider } from './context/RecipesContext';
import { AuthContextProvider } from './context/AuthContext';
import { CommentsContextProvider } from './context/CommentsContext';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <RecipesContextProvider>
        <CommentsContextProvider>
          <App />
          <ToastContainer/>
        </CommentsContextProvider>
      </RecipesContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
