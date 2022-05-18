import React, { useContext } from 'react'
import Login from './pages/Login'
import { Context } from './Context'
import { Rout } from './Routes'
import './App.css';

const App = () => {
  const { isAuth, userLogged } = useContext(Context)
  return !isAuth ? <Login></Login> : userLogged && <Rout userLogged={userLogged} />
}

export default App