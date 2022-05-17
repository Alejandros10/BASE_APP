import React, { createContext, useState } from 'react'

export const Context = createContext()

const Provider = ({ children }) => {
  const [isAuth, setIsAuth] = useState(() => {
    return window.localStorage.getItem('token')
  })
  const [userLogged, setUserLogged] = useState(() => {
    const user = window.localStorage.getItem('user')
    if (user) {
      return JSON.parse(user)
    }
    return null
  })

  const value = {
    isAuth,
    userLogged,
    activateAuth: (token, user) => {
      setIsAuth(token)
      setUserLogged(user)
      window.localStorage.setItem('token', token)
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    updateUserLogged: (user) => {
      setUserLogged(user)
      window.localStorage.setItem('user', JSON.stringify(user))
    },
    removeAuth: () => {
      setIsAuth(null)
      setUserLogged(null)
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('user')
    },
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export default {
  Provider,
  Consumer: Context.Consumer,
}
