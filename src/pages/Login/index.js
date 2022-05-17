import React, { useContext, useState } from 'react'
import { useInputValue } from '../../hooks/useInputValue'
import { AuthService } from '../../services/Auth'
import { Context } from '../../Context'

import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Message } from 'primereact/message'

const logo = require('../../utils/images/logoEmpresaA.png')

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const { activateAuth } = useContext(Context)
  console.log("index");
  const { handleReset: handleResetEmail, ...email } = useInputValue({
    value: '',
    name: 'email',
    type: 'email',
    required: 'required',
    disabled: loading,
  })

  const { handleReset: handleResetPassword, ...password } = useInputValue({
    value: '',
    name: 'password',
    required: 'required',
    disabled: loading,
    type: 'password',
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const data = {
        email: email.value,
        password: password.value,
      }

      const response = await AuthService.login(data)

      handleResetEmail()
      handleResetPassword()
      setError(null)
      setLoading(false)

      activateAuth(response.access_token.token, response.user)
    } catch (e) {
      const errors = e.message.split(',').join(' / ')
      setError(errors)
      setLoading(false)
    }
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-t-100 p-b-30">
          <form onSubmit={handleSubmit} disabled={loading}>
            <div className="login100-form-avatar">
              <img src={logo} />
            </div>

            {error && <Message severity="error" text={error}></Message>}

            <div className="wrap-input100 validate-input m-b-10" data-validate="Username is required">
              <span className="p-float-label">
                <InputText className="input100" id="email" {...email} />
                <label  htmlFor="email">Email</label>
              </span>
              <span className="focus-input100"></span>
            </div>
<br/>
            <div className="wrap-input100 validate-input m-b-10" data-validate="Password is required">


            <span className="p-float-label">
            <InputText className="input100" id="password" {...password} />
              <label htmlFor="password">Contraseña</label>
              </span>

         
              <span className="focus-input100"></span>
            </div>

            <div className="container-login100-form-btn p-t-10">
              <Button label={loading ? 'Cargando...' : 'Ingresar'} type="submit" />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
