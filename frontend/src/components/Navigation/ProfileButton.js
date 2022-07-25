import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import * as sessionActions from '../../store/session';


function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user);

    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = () => {
            setShowMenu(false);
        };

        document.addEventListener('click', closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);

    const logout = (e) => {
        e.preventDefault();
        dispatch(sessionActions.logout());
        history.push("/");
    };

    return (
        <>
            <button
                onClick={openMenu}
                className="profile__btn"
            >
                {/* <i className="fas fa-user-circle" /> */}
                <img src={sessionUser.profileImage} className="profile__image" alt="" />
            </button>
            {showMenu && (
                <div className="dropup">
                    <ul className="profile__dropup">
                        <li>{user.username}</li>
                        <li>{user.email}</li>
                        {/* <li>
                            <button onClick={logout}>Log Out</button>
                        </li> */}
                    </ul>
                </div>
            )}
        </>
    );
}

export default ProfileButton;
