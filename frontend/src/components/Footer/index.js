import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
    return (
        <footer>
            <div className="footer__info">
                <p>Developer</p>
                <div className="contact__info">
                    <a href="https://github.com/vee-alianza">
                        <img src="https://user-images.githubusercontent.com/92604480/167403399-04f7b726-4f98-4f60-bd99-c85cec3b8ba3.png" />
                    </a>
                </div>
            </div>
        </footer>
    )

}

export default Footer;
