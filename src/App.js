import logo from './logo.svg';
import './App.css';
import { Routes } from './Routes'
import Login from './pages/Login'
import { Context } from './Context'
import React, { useContext, useState } from 'react'

   const App = () => {
  const { isAuth, userLogged } = useContext(Context)

  return !isAuth ? <Login></Login> : userLogged && <Routes userLogged={userLogged} />
}

export default App