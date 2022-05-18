import React, { useContext, useState } from "react";
import { useInputValue } from "../../hooks/useInputValue";
import { AuthService } from "../../services/Auth";
import { Context } from "../../Context";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Message } from "primereact/message";
/* import './styles.scss' */
/* const logo = require('../../utils/images/.png') */

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { activateAuth } = useContext(Context);
  const { handleReset: handleResetEmail, ...email } = useInputValue({
    value: "",
    name: "email",
    type: "email",
    required: "required",
    disabled: loading,
  });

  const { handleReset: handleResetPassword, ...password } = useInputValue({
    value: "",
    name: "password",
    required: "required",
    disabled: loading,
    type: "password",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = {
        email: email.value,
        password: password.value,
      };

      const response = await AuthService.login(data);

      handleResetEmail();
      handleResetPassword();
      setError(null);
      setLoading(false);

      activateAuth(response.access_token.token, response.user);
    } catch (e) {
      const errors = e.message.split(",").join(" / ");
      setError(errors);
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <div>
          <form onSubmit={handleSubmit} disabled={loading}>
            <div>{/*   <img src={logo} /> */}</div>

            {error && <Message severity="error" text={error}></Message>}

            <div data-validate="Username is required">
              <span>
                <InputText  id="email" {...email} />
                <label htmlFor="email">Email</label>
              </span>
              <span></span>
            </div>
            <br />
            <div data-validate="Password is required">
              <span>
                <InputText id="password" {...password} />
                <label htmlFor="password">Contraseña</label>
              </span>

              <span></span>
            </div>

            <div>
              <Button
                label={loading ? "Cargando..." : "Ingresar"}
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
