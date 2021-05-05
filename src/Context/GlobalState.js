import React,{createContext,useReducer} from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';


const initialState={
    users:[    ]
};

export const GlobalContext=createContext(initialState);

export const GlobalProvider=({children})=>{
    const [state,dispatch]=useReducer(AppReducer,initialState);

    const removeUser=(id)=>{
        dispatch({
            type:'REMOVE_USER',
            payload:id
        })
    }
    const addUser=(user)=>{
        dispatch({
            type:'ADD_USER',
            payload:user
        })
    }

    /* const addUserData=(userData)=>{
         //console.log("hello",userData);
        return dispatch=>{
            dispatch(addUser(userData));
            console.log("hello",userData);
            axios.post('https://crudhookapp-default-rtdb.firebaseio.com/user.json', userData )
            .then( response => {
                console.log(response.data);
             dispatch(addUser(response.data,userData));
            } )
            .catch( error => {
             console.log(error,"error");
            } );
        }
    }*/

    const editUser=(user)=>{
        dispatch({
            type:'EDIT_USER',
            payload:user
        })
    }

    return(
        <GlobalContext.Provider value={
            {
                users:state.users,
                removeUser,
                addUser,
                editUser
            }
        }>{children}</GlobalContext.Provider>
    );
}
