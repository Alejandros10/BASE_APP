import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'
import { Context } from '../../Context'
import './styles.scss'
import { GLOBALS } from '../../utils/Globals'

export const AppProfile = () => {
  const { userLogged, removeAuth } = useContext(Context)
  const [expanded, setExpanded] = useState(false)

  const onClick = (event) => {
    event.preventDefault()
    setExpanded(!expanded)
  }

  const onLogout = (event) => {
    event.preventDefault()

    removeAuth()
  }

  if (!userLogged) return <div />

  return (
    <div className="layout-profile">
      <div onClick={onClick}>
        <div className="user-icon">
          <i className="pi pi-user" />
        </div>

        <button className="p-link layout-profile-link">
          <span className="username">{userLogged.name}</span>
          <i className="pi pi-fw pi-cog" />
        </button>
      </div>

      <ul className={classNames({ 'layout-profile-expanded': expanded })}>
        <li>
          <Link to={GLOBALS.menu.profile.link}>
            <button className="p-link">
              <i className="pi pi-fw pi-user" />
              <span>Mi Cuenta</span>
            </button>
          </Link>
        </li>
        <li>
          <button className="p-link" onClick={onLogout}>
            <i className="pi pi-fw pi-power-off" />
            <span>Salir</span>
          </button>
        </li>
      </ul>
    </div>
  )
}
