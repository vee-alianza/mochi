import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from '../Navigation/ProfileButton';
// import LoginFormModal from '../LoginFormModal';
// import SignupFormModal from '../SignupFormModal';

// import { useEffect, useState } from 'react';
// import './SplashPage.css'

// import { Modal } from '../../context/Modal';
// import LoginForm from '../LoginFormModal/LoginForm';
import './SplashPage.css';


const SplashPage = (isLoaded) => {
    return (
        <>
            <div className="splash__logo">
                <h1 className="splash__logo__letters">m<img src="https://user-images.githubusercontent.com/92604480/167276377-bbafa200-e4d7-497b-9796-dc87f8c7294a.png" align="left" />chi</h1>
            </div>
            <div className="navbar__splash">
                {/* <div className='login__container'>
                    <LoginFormModal />
                    <SignupFormModal />
                </div> */}
                {/* <div className='signup__container'>

                </div> */}
                <div></div>

            </div>
        </>
    )
}

export default SplashPage;


// const SplashPage = (isLoaded) => {
//     const [showModal, setShowModal] = useState(false);
//     const sessionUser = useSelector(state => state.session.user);
//     let sessionLinks;
//     if (sessionUser) {
//         sessionLinks = (
//             <ProfileButton user={sessionUser} />
//         );
//     } else {
//         sessionLinks = (
//             <>
//                 <LoginFormModal />
//                 <NavLink to="/signup">Sign Up</NavLink>
//             </>
//         );
//     }

//     return (
//         <>
//             <div className="splash__page">
//                 <div className="splash__navbar">
//                     <button onClick={() => setShowModal(true)}>Log In</button>
//                     {showModal && (
//                         <Modal onClose={() => setShowModal(false)}>
//                             <LoginForm />
//                         </Modal>
//                     )}
//                     <div className="splash__left__box">
//                         <h3>Curiouser and Curiouser</h3>
//                         <p>laflsdjfj</p>
//                     </div>
//                     <div className="splash__right__box">
//                         <svg viewBox="0 0 585 462" xmlns="http://www.w3.org/2000/svg" width="585" height="462">
//                             <g>
//                                 <g fill="rgb(0,0,0)" aria-label="🍕🍔🍟🌭🍿🥓🍳🧇🥞🍞🥐🥨🥯🧀🥗🥙🥪🌮🌯🍖🍗🥟🍘🍚🍙🍛🍜🍤🍥🥮🧆🥘🍲🍝🥣🥧🍨🍩🍪🍰🧁🍮🍻🥢🍕🍔🍟🌭🍿🥓🍳🧇🥞🍞🥐🥨🥯🧀🥗🥙🥪🌮🌯🍖🍗🥟🍘🍚🍙🍛🍜🍤🍥🥮🧆🥘🍲🍝🥣🥧🍨🍩🍪🍰🧁🍮🍻🥢" transform="matrix(1,0,0,1,291,232)" opacity="1" style="display:block">
//                                 </g>
//                             </g>
//                         </svg>
//                     </div>
//                 </div>
//             </div >
//         </>
//     )
// }
// export default SplashPage;
