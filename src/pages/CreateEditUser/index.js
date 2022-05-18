import React, { useState, useEffect, useContext } from 'react'
import { useParams, Navigate, useLocation } from 'react-router-dom'
import { Message } from 'primereact/message'
import { UserService } from '../../services/User'
import { Context } from '../../Context'
import { GLOBALS } from '../../utils/Globals'
import { UserForm } from '../../components/UserForm'
import { Layout } from '../../components/Layout'
import './styles.scss'

export const CreateEditUser = () => {
  let { id: idToEdit } = useParams()
  const { isAuth: token, userLogged, activateAuth } = useContext(Context)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [userToEdit, setUserToEdit] = useState(null)
  const [redirectTo, setRedirectTo] = useState(null)
  const location = useLocation()
  const isProfile = location.pathname === GLOBALS.menu.profile.link

  const config = {
    title: 'Crear Usuario',
    icon: 'pi pi-user',
    link: GLOBALS.menu.users.link,
  }
  if (isProfile) {
    idToEdit = userLogged.id

    config.title = 'Mi Cuenta'
    config.link = GLOBALS.menu.dashboard.link
  } else if (idToEdit) {
    config.title = 'Editar Usuario'
  }

  const getUser = async () => {
    if (idToEdit) {
      try {
        setIsLoading(true)

        const data = await UserService.getById(idToEdit, token)
        setUserToEdit(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    getUser()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const onSubmit = async (data) => {
    if (data.password && data.password !== data.password_confirmation) {
      return setError('Confirmación de contraseña incorrecto')
    }

    try {
      setIsLoading(true)

      if (idToEdit) {
        const response = await UserService.update(idToEdit, data, token)
        if (parseInt(idToEdit) === userLogged.id) {
          activateAuth(token, response)
        }
      } else {
        await UserService.create(data, token)
      }

      setIsLoading(false)
      setError(null)

      setRedirectTo({
        pathname: config.link,
        state: { success: true, message: 'Perfil actualizado' },
      })
    } catch (e) {
      setIsLoading(false)
      setError(e.message)
    }
  }

  if (redirectTo) {
    return <Navigate to={redirectTo} />
  }

  return (
    <Layout>
      {isLoading || (!userToEdit && idToEdit) ? (
        <div className="p-fluid">
          <i className="pi pi-spin pi-spinner" style={{ fontSize: '3em' }}></i>
        </div>
      ) : (
        <div className="p-fluid">
          <div className="p-grid">
            <div className="p-col-12">
              <div className="card card-w-title">
                <h1 className="create-edit-title">
                  {config.icon && <i className={config.icon}></i>}
                  {config.title}
                </h1>

                {error && (
                  <Message severity="error" text={error} style={{ marginBottom: '20px' }}></Message>
                )}

                <UserForm
                  item={userToEdit}
                  isLoading={isLoading}
                  onSubmit={onSubmit}
                  cancelLink={config.link}
                  userLogged={userLogged}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
