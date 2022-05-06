import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import SignupFormModal from '../SignupFormModal';


function Navigation({ isLoaded }) {
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

  return (
    <>
      <div className="navbar__loggedId">
        <div className="navbar__btn__loggedIn">
          <NavLink exact to="/home">Home</NavLink>
          {isLoaded && sessionLinks}
          <a href="/home">
            <img src="https://user-images.githubusercontent.com/92604480/165882725-37ad9f6f-cbb1-4389-aabb-1a88bfa3c309.png" alt="logo" />
          </a>
        </div>
        <div className="navbar__btn__loggedIn">
          <img src="https://user-images.githubusercontent.com/92604480/165881172-2fecedae-a5c5-4f5c-8084-84afd1d01e9c.svg" alt="noms" />
          <p>noms</p>

          <img src="https://user-images.githubusercontent.com/92604480/165879974-08803a96-c31c-4e2e-9fa5-268a65f62375.svg" alt="all recipes" />
          <p>all recipes</p>

          <img src="https://user-images.githubusercontent.com/92604480/165881766-efe5572f-17e9-4ef8-983e-5298f11c5f53.svg" alt="add stories" />
          <p>add story</p>
        </div>
        <div className="navbar__btn__loggedIn">
          <img src="https://user-images.githubusercontent.com/92604480/165881385-7923e4ee-80a4-4f08-9cce-1a300ec4957a.svg" alt="log out" />
        </div>
        <div>
          <NavLink exact to="/"></NavLink>
          {isLoaded && sessionLinks}
          {/* <a href="/"> */}
          <p>log out</p>
          <img src="https://user-images.githubusercontent.com/92604480/165883308-5bae2d62-4598-453d-8bef-9693b98fcea3.jpg" alt="user image" />
        </div>
      </div>
    </>
  );
}

export default Navigation;
