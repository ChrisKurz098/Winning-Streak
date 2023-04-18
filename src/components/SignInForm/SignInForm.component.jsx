import {
    auth,
    signInWithGooglePopup,
    signInWithGoogleRedirect,
    createUserDocFromAuth,
    signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import { useState, useContext } from "react";
// import { getRedirectResult } from "firebase/auth";

import FormInput from '../../components/FormInput/FormInput.component';
import Button from "../../components/Button/Button.component";

import './signInForm.styles.scss';
import { useNavigate } from "react-router-dom";

const SignInForm = () => {

    const navigate = useNavigate();

    // useEffect( () => {
    //     async function fetchRedirectResults() {
    //         const response = await getRedirectResult(auth);
    //         if (response) createUserDocFromAuth(response.user);
    //     };
    //     fetchRedirectResults();
    // }, [])
    const [formInput, setFormInput] = useState({ email: '', password: '' });
    const { email, password } = formInput;


    const singInWithGoogle = async () => {
     await signInWithGooglePopup();
     navigate('/');
      
    };

    const signInWithEmailAndPassword = async (event) => {
        event.preventDefault();

        try {
            const { user } = await signInAuthUserWithEmailAndPassword(email, password);
            navigate('/');
        } catch (error) {

            switch (error.code) {
                case 'auth/wrong-password':
                    alert('Email and Password did not match');
                    break;
                case 'auth/user-not-found':
                    alert('No user found');
                    break;
                default: console.log(error);
            }
        }

    };


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInput(old => ({ ...old, [name]: value }));
    };



    return (
        < div className='sign-in-container' >
            <h1>I already have an account</h1>
            <span>Sign in with your email and password</span>

            <form onSubmit={signInWithEmailAndPassword}>
                <FormInput label='Email' required value={email} name='email' onChange={handleChange} />
                <FormInput label='Password' required value={password} name='password' onChange={handleChange} />
                <div className="buttons-container">
                    <Button type='submit'>Sign In</Button>
                    <Button buttonType='google' type='button' onClick={singInWithGoogle}> Google Sign In</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm