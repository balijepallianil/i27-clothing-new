import { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormInput from '../form-input/form-input.component';
import Button from '../button/button.component';
import { useSetState } from 'react-use';
import { SignInContainer, ButtonsContainer, UserErrorMessage } from './sign-in-form.styles';
import { AuthContext } from '../../contexts/Auth.context';

const initialState = {
  email: '',
  password: '',
};

const SignInForm = () => {
  const navigate = useNavigate();
  const { state: ContextState, login } = useContext(AuthContext);
  const{ isLoggedIn, loginError } = ContextState;
  const [formFields, setFormFields] = useSetState(initialState);

  useEffect(() => {
    // Call navigate() when isLoggedIn changes
    if (isLoggedIn) {
      navigate('/');
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = formFields;
    login(email, password);
    setFormFields(initialState);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ [name]: value });
  };

  return (
    <SignInContainer>
      {
        loginError ?(<UserErrorMessage>{loginError}</UserErrorMessage>):(<></>)
      }
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label='Email'
          type='email'
          required
          onChange={handleChange}
          name='email'
          value={formFields.email}
        />

        <FormInput
          label='Password'
          type='password'
          required
          onChange={handleChange}
          name='password'
          value={formFields.password}
        />
        <ButtonsContainer>
          <Button type='submit'>Sign In</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
};

export default SignInForm;
