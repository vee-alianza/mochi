import React from "react";
import StoryForm from "../StoryFormPage";
import StoryList from "../StoryList";

import './Homepage.css'

const Homepage = () => {



    return (
        <div className="main__container">
            <div className="left__container">
                <StoryList />
            </div>
            <div className="right__container">
                {/* <StoryForm /> */}
            </div>
        </div>
    );
};

export default Homepage;
