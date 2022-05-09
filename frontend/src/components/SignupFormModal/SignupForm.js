import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";


const inputClassNames = {
  name: "signup__name",
  email: "signup__email",
  username: "signup__username",
  password: "signup__pasword",
  confirmPassword: "signup__confirm__password"
};

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  if (sessionUser) return <Redirect to="/signup" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const response = await dispatch(sessionActions.signup({ email, username, password }))
        .catch(async (res) => {
          const data = await res.json();
          data.errors.forEach((error) => {
            if (error.toLowerCase().includes("email")) {
              setEmailError(error);
            }
            if (error.toLowerCase().includes("username")) {
              setUsernameError(error);
            }
            if (error.toLowerCase().includes("password")) {
              setPasswordError(error);
            }
          });
        });
      if (response.ok) {
        history.push("/home");
      }
    };
  };

  const handleInput = (e) => {
    const inputClassName = e.target.className;

    if (inputClassName === inputClassNames.name) {
      setName(e.target.value);
    } else if (inputClassName === inputClassNames.email) {
      setEmail(e.target.value);
      setEmailError("");
    } else if (inputClassName === inputClassNames.username) {
      setUsername(e.target.value);
      setUsernameError("");
    } else if (inputClassName === inputClassNames.password) {
      setPassword(e.target.value);
      setPasswordError("");
    } else if (inputClassName === inputClassNames.confirmPassword) {
      setConfirmPassword(e.target.value);
    }
  };

  return (
    <>
      <div className="signup__container">
        <div className="signup__left__container">
          <div className="signup__right__container">
            <img src="https://user-images.githubusercontent.com/92604480/167227290-6b43766a-6a0b-4c62-a082-d7ea15b8fec4.png" alt="signup__right__container" width="150px" />
            <h3>SIGN UP!</h3>
            <form onSubmit={handleSubmit} className="signup__form">
              <input
                className={inputClassNames.name}
                type="text"
                value={name}
                placeholder="Name"
                onChange={handleInput}
                required
              />
              <div>
                <div>{emailError}</div>
                <input
                  className={inputClassNames.email}
                  type="text"
                  value={email}
                  placeholder="Email"
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <div>{usernameError}</div>
                <input
                  className={inputClassNames.username}
                  type="text"
                  value={username}
                  placeholder="Username"
                  onChange={handleInput}
                  required
                />
              </div>
              <div>
                <div>{passwordError}</div>
                <input
                  className={inputClassNames.password}
                  type="password"
                  value={password}
                  placeholder="Password"
                  onChange={handleInput}
                  required
                />
              </div>
              <input
                className={inputClassNames.confirmPassword}
                type="password"
                value={confirmPassword}
                placeholder="Confirm password"
                onChange={handleInput}
                required
              />
              <button
                type="submit"
                className="signup__btn"
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SignupFormPage;
