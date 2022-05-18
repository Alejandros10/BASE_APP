import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { InputText } from 'primereact/inputtext'
import { Dropdown } from 'primereact/dropdown'
import { Password } from 'primereact/password'
import { Button } from 'primereact/button'
import { useInputValue } from '../../hooks/useInputValue'
import { getAvailableRoles } from '../../utils/helpers/role.helper'

export const UserForm = ({ item, isLoading, onSubmit, cancelLink, userLogged }) => {
  const { handleReset: handleResetRole, setValue: setRoleValue, ...role } = useInputValue({
    value: item ? item.role : '',
    name: 'role',
    required: true,
    disabled: isLoading,
  })

  const { handleReset: handleResetEmail, setValue: setEmailValue, ...email } = useInputValue({
    value: item ? item.email : '',
    name: 'email',
    type: 'email',
    required: true,
    disabled: isLoading,
  })

  const { handleReset: handleResetName, setValue: setNameValue, ...name } = useInputValue({
    value: item ? item.name : '',
    name: 'name',
    type: 'text',
    required: true,
    disabled: isLoading,
  })

  const {
    handleReset: handleResetPassword,
    setValue: setPasswordValue,
    ...password
  } = useInputValue({
    value: '',
    name: 'password',
    required: item ? '' : 'required',
    disabled: isLoading,
    type: 'password',
    minLength: 5,
  })

  const {
    handleReset: handleResetPasswordConfirm,
    setValue: setPasswordConfirmValue,
    ...passwordConfirm
  } = useInputValue({
    value: '',
    name: 'password_confirm',
    required: item && item.id ? '' : 'required',
    disabled: isLoading,
    equal_to: password.value,
    type: 'password',
  })

  const rolesList = getAvailableRoles(userLogged).map((r) => {
    return {
      label: r.name,
      value: r.id,
    }
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {
      role: role.value,
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirm.value,
      is_revoked:0,
    }
    onSubmit(data)
  }

  return (
    <form disabled={isLoading} onSubmit={handleSubmit}>
      <div className="p-grid">
        <div className="p-col-12 p-md-2">
          <label htmlFor="role-input">Rol {role.required ? '*' : ''}</label>
        </div>
        <div className="p-col-12 p-md-4">
          <Dropdown id="role-input" options={rolesList}  {...role} />
        </div>

        <div className="p-col-12 p-md-2">
          <label htmlFor="name-input">Nombre {name.required ? '*' : ''}</label>
        </div>
        <div className="p-col-12 p-md-4">
          <InputText id="name-input" {...name} />
        </div>
        <div className="p-col-12 p-md-2">
          <label htmlFor="email-input">Email {email.required ? '*' : ''}</label>
        </div>
        <div className="p-col-12 p-md-4">
          <InputText id="email-input" {...email} />
        </div>

        <div className="p-col-12 p-md-2">
          <label htmlFor="password-input">Contraseña {password.required ? '*' : ''}</label>
        </div>
        <div className="p-col-12 p-md-4">
          <Password id="password-input" {...password} />
        </div>
        <div className="p-col-12 p-md-2">
          <label htmlFor="confirm-input">
            Confirmar Contraseña {passwordConfirm.required ? '*' : ''}
          </label>
        </div>
        <div className="p-col-12 p-md-4">
          <Password id="confirm-input" {...passwordConfirm} />
        </div>
      </div>

      <div className="p-grid" style={{ marginTop: '20px' }}>
        <div className="p-col-12 p-md-3" style={{ textAlign: 'center' }}>
          <Button
            label={isLoading ? 'Guardando...' : 'Guardar'}
            disabled={isLoading}
            type="submit"
          />
        </div>
        <div className="p-col-12 p-md-3" style={{ textAlign: 'center' }}>
          <Link to={cancelLink}>
            <Button
              label="Cancelar"
              disabled={isLoading}
              className="p-button-secondary"
              type="button"
            />
          </Link>
        </div>
      </div>
    </form>
  )
}

UserForm.propTypes = {
  item: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  cancelLink: PropTypes.string.isRequired,
  userLogged: PropTypes.object.isRequired,
}
