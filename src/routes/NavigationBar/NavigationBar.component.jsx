import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { signOutUser, updateRemoteUserData } from "../../utils/firebase/firebase.utils";
import { mockGoals } from "../../utils/userData/userDataFunctions";

import './navigation.styles.scss';

const NavigationBar = () => {
    const { currentUser, setCurrentUser, userAuthId } = useContext(UserContext);
    const navigate = useNavigate();
  
    const handleLogOut = () => {
        signOutUser();
        navigate("/");
    }

    const changeUserData = (event) => {
        event.preventDefault()
        console.log(mockGoals)
        const newPoints = currentUser.userData.points+100;
        setCurrentUser(old => ({...old, userData: {
            points: newPoints,
            rank: "C",
            goals: mockGoals,

        }}))
    }

    const testUpdate = (event) => {
        event.preventDefault()
        updateRemoteUserData(userAuthId, currentUser.userData );
    }


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

                <button onClick={testUpdate}>Test Update Data</button>
                <button onClick={changeUserData}>Change Data</button>
            </nav>

            <Outlet />
        </>
    )
}

export default NavigationBar;
