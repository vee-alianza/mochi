import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import LoginFormModal from '../LoginFormModal';


import './SplashPage.css'

const SplashPage = (isLoaded) => {
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
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <>
      <div className="splash__page">

        <div className="splash__left__box">
          <h1>Curiouser and Curiouser</h1>
          <p>laflsdjfj</p>
        </div>
        <div className="splash__right__box">
          <svg viewBox="0 0 585 462" xmlns="http://www.w3.org/2000/svg" width="585" height="462">
            <g>
              <g fill="rgb(0,0,0)" aria-label="🍕🍔🍟🌭🍿🥓🍳🧇🥞🍞🥐🥨🥯🧀🥗🥙🥪🌮🌯🍖🍗🥟🍘🍚🍙🍛🍜🍤🍥🥮🧆🥘🍲🍝🥣🥧🍨🍩🍪🍰🧁🍮🍻🥢🍕🍔🍟🌭🍿🥓🍳🧇🥞🍞🥐🥨🥯🧀🥗🥙🥪🌮🌯🍖🍗🥟🍘🍚🍙🍛🍜🍤🍥🥮🧆🥘🍲🍝🥣🥧🍨🍩🍪🍰🧁🍮🍻🥢" transform="matrix(1,0,0,1,291,232)" opacity="1" style="display:block">
              </g>
            </g>
          </svg>
        </div>
      </div >
    </>
  )
}

export default SplashPage;
