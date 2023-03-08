import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { SigninForm } from '../components/SigninForm'
import { getState } from '../context/Context';


export const SigninPage = () => {
  const {user} = getState();
  const navigate = useNavigate();



  useEffect(() => {
    if(user){
      navigate('/',{replace:true})
    }
  },[user])

  if(user === undefined){
    return null;
  }
  if(user == null){
    return <SigninForm/>
  }

}
