import React, { Fragment, useEffect, useState } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { DrawerBar } from '../components/DrawerBar'
import { NavigateBar } from '../components/NavigateBar'
import { getState } from '../context/Context'
import { FavoritePage } from '../pages/FavoritePage'
import Home from '../pages/Home'
import ProductDetails from '../pages/ProductDetails'
import { SigninPage } from '../pages/SigninPage'
import { UserProfilePage } from '../pages/UserProfilePage'
import { ProtecterRoute } from './ProtecterRoute'



export const Root = () => {

  const {user} = getState();
  const [navPosStatus,setNavPosStatus] = useState(true);

  return (
    <Fragment>
      {user && 
      <>
       <DrawerBar navController ={setNavPosStatus}/>
       <NavigateBar status={navPosStatus}/>
      </>
      }
      <Routes>
          <Route path='/' element={<ProtecterRoute user={user} path='/'><Home/></ProtecterRoute>}/>
          <Route path='/create' element={<SigninPage/>}/>
          <Route path='/favorite' element={<ProtecterRoute user={user}><FavoritePage/></ProtecterRoute>}/>
          <Route path='/userProfilePage' element={<ProtecterRoute user={user}><UserProfilePage/></ProtecterRoute>}/>
          <Route path='/productDetails/:id' element={<ProtecterRoute user={user}><ProductDetails/></ProtecterRoute>}/>
      </Routes>  
    </Fragment>
)
}
