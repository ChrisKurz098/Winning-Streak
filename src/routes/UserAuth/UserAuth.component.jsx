import './UserAuth.styles.scss'
import SignInForm from "../../components/SignInForm/SignInForm.component";
import SignUpForm from "../../components/SignUpForm/SignUpForm.componet";
const UserAuth = () => {

    return (
        <div className="authentication-container">
        <SignInForm/>
        <SignUpForm/>
        </div>
    )
};

export default UserAuth;