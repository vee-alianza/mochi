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
    <Redirect to="/home" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    dispatch(sessionActions.login({ credential, password })).catch(
      async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      }
    );
    history.push('/home');
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
      <div className="login__container">
        <div className="login__left__container">
          <div className="login__right__container">
            <img src="https://user-images.githubusercontent.com/92604480/167227290-6b43766a-6a0b-4c62-a082-d7ea15b8fec4.png" alt="signup__right__container" width="150px" />
            <h3>Welcome back!</h3>
            <form className="login__form"
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
                  id="login__btn"

                >
                  Log In
                </button>
                <button
                  type="submit"
                  onClick={demoUser}
                  className="login__btn"
                  id="demo__btn"
                >
                  DEMO
                </button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>

  );
}

export default LoginForm;
