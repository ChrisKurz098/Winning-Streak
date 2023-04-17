import { useContext } from "react";
import { UserContext } from "../../contexts/user.context";

const NavigationLogin = () => {

    const {currentUser, setCurrentUser} = useContext(UserContext)
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = event.target[0].value;
        setCurrentUser({userName: email});
        console.log(event.target[0].value,event.target[1].value)
        }

    return (

        <form onSubmit={handleSubmit}>
            <label htmlFor="email-input">Email: </label>
            <input id="email-input" type="text"></input>

            <label htmlFor="password-input">Password: </label>
            <input id="password-input" type="password"></input>

            <button typeof="button">Login</button>
        </form>
        
    )
};

export default NavigationLogin;