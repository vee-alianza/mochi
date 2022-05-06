import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";


function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
  };

  const demoUser = (e) => {
    setCredential('Demo-lition');
    setPassword('password');
    e.submit();
  }

  return (
    <>
      <div id="modal__login">
        <div id="modal__login__background" />
        <div id="modal__login__content">



          <form className="login__modal__container "
            onSubmit={handleSubmit}>
            <ul>
              {errors.map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
            <div class="login__form">
              <label
                for="login__username__email"
                class="login__box"
              >
                Username or Email
              </label>
              <input
                type="text"
                value={credential}
                onChange={(e) => setCredential(e.target.value)}
                required
              />
            </div>
            <div class="login__form">
              <label
                for="login__password"
                class="login__box"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="login__btn__container">
              <button
                type="submit"
                class="login__btn"
              >
                Log In
              </button>
              <button
                type="submit"
                class="demo__btn"
                onClick={demoUser} className="demo__btn"
              >
                DEMO
              </button>
            </div>
          </form>
        </div>
      </div>
    </>

  );
}

export default LoginForm;
