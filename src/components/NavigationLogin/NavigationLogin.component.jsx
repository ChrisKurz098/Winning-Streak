import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

import "./navigationLogin.css";

const NavigationLogin = () => {

    const { currentUser, setCurrentUser } = useContext(UserContext)
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        setCurrentUser({ userName: email });
        console.log(event.target[0].value, event.target[1].value)
    }

    return (currentUser.userName) ? (<button type="button" className="navButton" >LogOut</button>) : (

        <form className="login-form" onSubmit={handleSubmit}>
            <div className="input-feild">
                <label className="login-form-lable" htmlFor="email-input">Email</label>
                <input id="email-input" type="text"></input>
            </div>

            <div className="input-feild">
                <label className="login-form-lable" htmlFor="password-input">Password</label>
                <input id="password-input" type="password"></input>
       
            </div>
            <button typeof="submit" className="navButton">Login</button>
        </form>

    )
};

export default NavigationLogin;