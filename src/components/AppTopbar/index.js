import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Context } from '../../Context'
import { GLOBALS } from '../../utils/Globals'

export const AppTopbar = ({ onToggleMenu, showToggler }) => {
  const { removeAuth } = useContext(Context)

  const onLogout = (event) => {
    event.preventDefault()

    removeAuth()
  }

  return (
    <div className="layout-topbar clearfix">
      <>
        {showToggler && (
          <button className="p-link layout-menu-button" onClick={onToggleMenu}>
            <span className="pi pi-bars" />
          </button>
        )}
        <div className="layout-topbar-icons">
          <button className="p-link" onClick={onLogout}>
            <span className="layout-topbar-item-text">Salir</span>
            <span className="layout-topbar-icon pi pi-sign-out" />
          </button>

          <Link to={GLOBALS.menu.profile.link}>
            <button className="p-link">
              <span className="layout-topbar-item-text">Mi Cuenta</span>
              <span className="layout-topbar-icon pi pi-user" />
            </button>
          </Link>
        </div>
      </>
    </div>
  )
}

AppTopbar.defaultProps = {
  onToggleMenu: null,
  showToggler: false,
}

AppTopbar.propTypes = {
  onToggleMenu: PropTypes.func.isRequired,
  showToggler: PropTypes.bool.isRequired,
}
