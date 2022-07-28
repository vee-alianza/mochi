import React from "react";
// import StoryForm from "../StoryFormPage/SidePanel";
import StoryList from "../StoryList";
import './Homepage.css'
// import whiterabbit from '../../image/whiterabbit.png'
import { FaLinkedinIn, FaAngellist, FaGithubAlt, FaStar } from "react-icons/fa";
import { IoPlanetOutline } from "react-icons/io5";
// import { BsMoonStars } from "react-icons/bs";


const Homepage = () => {



    return (
        <div className="main__container">
            <div className="left__container">
                <StoryList />
            </div>
            <div className="right__container">
                {/* <StoryForm /> */}
                <h2>CONNECT WITH ME</h2>
                {/* <img src={whiterabbit} /> */}
                <div className="contact__info__container">
                    <div className="linkedIn">
                        <a href="https://www.linkedin.com/in/vee-alianza/" >
                            <FaLinkedinIn size={30} />
                        </a>
                        {/* <div className="linkedIn__details">
                            <ul>
                                <p className="info__title">LinkedIn</p>
                                <h4 className="info__pun">It's not Facebook</h4>
                            </ul>

                        </div> */}
                    </div>
                    <div className="angelList">
                        <a href="https://angel.co/u/vee-alianza">
                            <FaAngellist size={30} />
                        </a>
                    </div>
                    <div className="gitHub">
                        <a href="https://github.com/vee-alianza">
                            <FaGithubAlt size={30} />
                        </a>
                    </div>
                    <div className="portfolio-logo">
                        <a href="https://vee-alianza.github.io/">
                            <IoPlanetOutline size={30} />
                        </a>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Homepage;
