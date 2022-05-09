import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from '../Navigation/ProfileButton';
import LoginFormModal from '../LoginFormModal';


// import { useEffect, useState } from 'react';
// import './SplashPage.css'

import { Modal } from '../../context/Modal';
import LoginForm from '../LoginFormModal/LoginForm';
import './SplashPage.css';


const SplashPage = (isLoaded) => {

    const [showModal, setShowModal] = useState(false);
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
                <div className="splash__navbar">
                    <button onClick={() => setShowModal(true)}>Log In</button>
                    {showModal && (
                        <Modal onClose={() => setShowModal(false)}>
                            <LoginForm />
                        </Modal>
                    )}
                    <div className="splash__left__box">
                        <div className="splash__logo">
                            <div className="splash__logo__letters">m<img src="https://user-images.githubusercontent.com/92604480/167276377-bbafa200-e4d7-497b-9796-dc87f8c7294a.png" align="left" id="splash__logo" />chi</div>
                            <div className='splash__about'>
                                <h1 className="about__space">W</h1>
                                <h2>here's </h2>
                                <h1 className="about__space">T</h1>
                                <h2>he </h2>
                                <h1 className="about__space">F</h1>
                                <h2>ood?</h2>

                            </div>
                            <p>
                                Share and discover culinary experiences that awakens all senses with Mochi!
                            </p>
                            <div className="story__images__container">

                                <div className="story__images">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default SplashPage;
