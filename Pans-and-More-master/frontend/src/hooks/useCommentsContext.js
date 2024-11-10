import { CommentsContext } from "../context/CommentsContext";
import {useContext} from 'react';

export const useCommentsContext=()=>{
    const context=useContext(CommentsContext)
    if(!context){
        throw new Error('useCommentsContext must be used inside an CommentsContextProvider')
    }
    return context;
}