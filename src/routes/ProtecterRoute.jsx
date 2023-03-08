import React from 'react'
import { Navigate } from 'react-router-dom'
import { LoginPage } from '../pages/LoginPage';

export const ProtecterRoute = ({children,user}) => {
    if(user === undefined){
        return null;
    }

    return user ? children : <LoginPage/>
}
