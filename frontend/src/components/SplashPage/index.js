import React from 'react';
import { useHistory } from 'react-router-dom';
import './SplashPage.css';

const SplashPage = () => {
    const history = useHistory();

    return (
        <>
            <div className="splash__container">
                <div className="splash__navbar">
                    <div
                        onClick={() => history.push("/home")}
                        className="splash__left__box"
                    >
                        <div className="splash__logo">
                            <img src="https://user-images.githubusercontent.com/92604480/167276377-bbafa200-e4d7-497b-9796-dc87f8c7294a.png" alt="" align="left" id="splash__logo" />
                        </div>
                        <div className="splash__logo__letters">
                            &nbsp;&nbsp;m&nbsp;&nbsp;&nbsp;&nbsp; chi
                        </div>

                        <div className='splash__about'>
                            <h1 className="about__space">W</h1>
                            <h2>here's </h2>
                            <h1 className="about__space">T</h1>
                            <h2>he </h2>
                            <h1 className="about__space">F</h1>
                            <h2>ood?</h2>
                        </div>
                        {/* <p>Bringing people together through great food, culture and history! Food lovers, food enthusiasts, food connoisseurs can share and discover culinary experiences that awakens all senses with Mochi!</p> */}
                    </div>
                    <div></div>

                    {/* <div className="story__images"></div> */}

                </div>
            </div >
        </>
    )
}

export default SplashPage;
