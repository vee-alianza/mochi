import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';
import * as sessionActions from "../../store/session";


function Navigation({ isLoaded }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
        {/* <NavLink to="/signup"> nav Sign Up</NavLink> */}
      </>
    );
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
    history.push('/');
  }

  return (
    <>
      <div className="navbar__loggedIn">
        <div className="navbar__btn__loggedIn">

          <a href="/home">
            <img src="https://user-images.githubusercontent.com/92604480/165882725-37ad9f6f-cbb1-4389-aabb-1a88bfa3c309.png" alt="logo" />
          </a>
        </div>
        <div className="navbar__btn__loggedIn">
          {/* <div
            className="navbar__btns"
          >
            <img src="https://user-images.githubusercontent.com/92604480/165881172-2fecedae-a5c5-4f5c-8084-84afd1d01e9c.svg" alt="noms" />
            <p>noms</p>
          </div> */}
          {/* <div
            className="navbar__btns"
          >
            <img src="https://user-images.githubusercontent.com/92604480/165879974-08803a96-c31c-4e2e-9fa5-268a65f62375.svg" alt="all recipes" />
            <p>all recipes</p>
          </div> */}

          <div
            className="navbar__btns"
            onClick={() => history.push("/stories/new")}
          >
            <img src="https://user-images.githubusercontent.com/92604480/165881766-efe5572f-17e9-4ef8-983e-5298f11c5f53.svg" alt="add stories" />
            <p>add recipe</p>
          </div>
        </div>
        <div
          className="navbar__btn__loggedIn"
          onClick={logout}
        >
          <div
            className="navbar__btns"
          >
            <img src="https://user-images.githubusercontent.com/92604480/165881385-7923e4ee-80a4-4f08-9cce-1a300ec4957a.svg" alt="log out" />
            <p>log out</p>
          </div>
        </div>
        <div className="navbar__profile__image">
          <NavLink exact to="/home">
            {/* <img src={sessionUser.profileImage} alt="" /> */}
          </NavLink>
          {isLoaded && sessionLinks}
        </div>
      </div>
    </>
  );
}

export default Navigation;
