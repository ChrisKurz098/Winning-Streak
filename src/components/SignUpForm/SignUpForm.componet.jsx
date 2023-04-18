import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase.utils";
import { useState, useContext } from "react";

import FormInput from '../../components/FormInput/FormInput.component';
import Button from "../Button/Button.component";
import './signUpForm.styles.scss';

const defaultFormInput = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUpForm = () => {
    const [formInput, setFormInput] = useState(defaultFormInput);
    const { displayName, email, password, confirmPassword } = formInput;

    const successfullSignUp = () => {
        setFormInput(defaultFormInput);
        alert('SignUp success!')
    };
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormInput(old => ({ ...old, [name]: value }));
    };

    const submitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        };
        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);
            await createUserDocFromAuth(user, { displayName });
            successfullSignUp();

        } catch (error) {
          if (error.code === 'auth/email-already-in-use') alert('This email already exists as a user');
          if (error.code === 'auth/weak-password') alert('Password must be at least 6 characters long');
          console.log(error);
        };
      

    }

    console.log(formInput);

    return (
        <div className="sign-up-container">
            <h2>Don't have an account</h2>
            <span>Sign up with an email and password</span>
            <form onSubmit={submitHandler}>
            
                <FormInput onChange={handleChange}  label={'Display Name'} required type={'text'} name="displayName" value={displayName} />

                <FormInput onChange={handleChange} label={'Email'} required type={'email'} name="email" value={email} />

                <FormInput onChange={handleChange} label={'Password'} required type={'password'} name="password" value={password} />

                <FormInput onChange={handleChange} label={'Confrim Password'} required type={'password'} name="confirmPassword" value={confirmPassword} />

                <Button type="submit">Sign Up</Button>

            </form>
        </div>
    );
};

export default SignUpForm;