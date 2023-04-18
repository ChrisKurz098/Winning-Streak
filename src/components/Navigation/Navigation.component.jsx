import { useContext } from "react";
import { UserContext } from "../../contexts/user.context.jsx"

import './navigation.css';
import NavigationLogin from "../NavigationLogin/NavigationLogin.component.jsx";

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    console.log(currentUser);

    return (
        <div className="navigationContainer">
            <a className='navLogo' href='#'>WINNING STREAK</a>
            <NavigationLogin/>
        </div>
    )
};

export default Navigation