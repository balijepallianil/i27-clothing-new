import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/Auth.context.jsx';
import { useSetState } from 'react-use';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { SignUpContainer, UserErrorMessage } from './sign-up-form.styles';

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { state: ContextState, signUp } = useContext(AuthContext);
  const { isLoggedIn, signUpError } = ContextState;
  const [state, setState] = useSetState(initialState);

  useEffect(() => {
    // Call navigate() when isLoggedIn changes
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleChange = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password } = state;
    signUp(firstName, lastName, email, password);
    setState(initialState);
  }

  return (
    <SignUpContainer>
      {
        signUpError ? (<UserErrorMessage>{signUpError}</UserErrorMessage>) : (<></>)
      }
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleChange}>
        <FormInput
          label='First Name'
          type='text'
          required
          onChange={(e) => setState({ firstName: e.target.value })}
          name='firstName'
          value={state.firstName}
        />
        <FormInput
          label='Last Name'
          type='text'
          required
          onChange={(e) => setState({ lastName: e.target.value })}
          name='lastName'
          value={state.lastName}
        />
        <FormInput
          label='Email'
          type='email'
          required
          onChange={(e) => setState({ email: e.target.value })}
          name='email'
          value={state.email}
        />
        <FormInput
          label='Password'
          type='password'
          required
          onChange={(e) => setState({ password: e.target.value })}
          name='password'
          value={state.password}
        />
        <Button type='submit'>Sign Up</Button>
      </form>
    </SignUpContainer>
  );
};

export default SignUpForm;
