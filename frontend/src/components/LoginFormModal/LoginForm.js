import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import "./LoginForm.css";


function LoginForm({ setShowModal }) {
  const dispatch = useDispatch();
  const history = useHistory();
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
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    setShowModal(false);
    history.push('/home');
  }



  // const demoUser = (e) => {
  //   setCredential('Demo-lition');
  //   setPassword('password');
  //   e.submit();
  // }

  return (
    <>
      <div id="modal__login">

        <form className="login__modal__container "
          onSubmit={handleSubmit}>
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="login__form">
            <label
              htmlFor="login__username__email"
              className="login__box"
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
          <div className="login__form">
            <label
              htmlFor="login__password"
              className="login__box"
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
              className="login__btn"
            >
              Log In
            </button>
            <button
              type="submit"
              className="demo__btn"
              onClick={demoUser}
            >
              DEMO
            </button>
          </div>
        </form>
      </div >
    </>

  );
}

export default LoginForm;
