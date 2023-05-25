import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { signOutUser } from "../../utils/firebase/firebase.utils";

import './navigation.styles.scss';

const NavigationBar = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext);
    const navigate = useNavigate();
  
    const handleLogOut = () => {
        signOutUser();
        setCurrentUser(false);
        navigate("/signin");
    };

    return (
        <>
            <nav className="navigation">
                <span className="userNameDisplay">{`${(currentUser) ? currentUser.displayName : ''}  `}</span>
                <Link className='logo-container' to='/'>
                    Winning Streak
                </Link>

                <div className="nav-links-container">
                    {currentUser ? (
                        <span className='nav-link' onClick={handleLogOut}>
                            SIGN OUT
                        </span>
                    ) : (
                        <Link className='nav-link' to='/signin'>
                            SIGN IN
                        </Link>
                    )}
                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default NavigationBar;
