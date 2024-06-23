import React from 'react';
import { useSetState } from 'react-use';
import axios from 'axios';
import { CartContext } from './cart.context'; // import CartContext here
import config from '../config';

export const AuthContext = React.createContext(null);

const initialState = {
  isLoggedIn: false,
  isLoginPending: false,
  loginError: null,
  signUpError: null,
  userDisplayName: '',
  userEmailId: '',
  userId: ''
}

export const ContextProvider = props => {
  const [state, setState] = useSetState(initialState);
  const { clearCart } = React.useContext(CartContext); // get clearCart function from CartContext

  const setLoginPending = (isLoginPending) => setState({ isLoginPending });
  const setLoginSuccess = (isLoggedIn) => setState({ isLoggedIn });
  const setLoginError = (loginError) => setState({ loginError });
  const setSignUpError = (signUpError) => setState({ signUpError });
  const setUserName = (userDisplayName) => setState({ userDisplayName });
  const setUserEmailId = (userEmailId) => setState({ userEmailId });
  const setUserId = (userId) => setState({ userId });

  const login = (email, password) => {
    setLoginPending(true);
    setLoginError(null);
    setUserName('');

    userLogIn(email, password, response => {
      setLoginPending(false);
      if (200 === response.status) {
        setLoginSuccess(true);
        setUserName(response.data.firstName);
        setUserEmailId(response.data.email);
        setUserId(response.data.id);

      } else {
        console.log(response)
        setLoginError(response.message);
      }
    })
  }

  const signUp = (firstName, lastName, email, password) => {
    setLoginPending(true);
    setLoginError(null);
    setUserName('');
    userSignUp(firstName, lastName, email, password, response => {
      setLoginPending(false);
      if (200 === response.status) {
        setLoginSuccess(true);
        setUserName(response.data.firstName);
        setUserEmailId(response.data.email);
        setUserId(response.data.id);
      } else {
        setSignUpError(response);
      }
    })
  }

  const logout = () => {
    setLoginPending(false);
    setLoginSuccess(false);
    setLoginError(null);
    clearCart(); // clear cart when user logs out
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        signUp,
        login,
        logout,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

const userLogIn = async (email, password, callback) => {
  try {
    const response = await axios.get(`${config.userLoginApiUrl}?email=${email}&password=${password}`);
    if (callback) {
      console.log(response);
      callback(response);
    }
    return response.data;
  } catch (error) {
    console.log(error)
    if (error.response.data.message) {
      return callback(new Error(error.response.data.message));
    } else {
      return callback(new Error(error.message));
    }
  }
};

const userSignUp = async (firstName, lastName, email, password, callback) => {
  try {
    const response = await axios.post(config.userSignupApiUrl, {
      firstName,
      lastName,
      email,
      password,
    });
    if (callback) {
      callback(response);
    }
    return response.data;
  } catch (error) {
    if (error.response.data.message) {
      return callback(error.response.data.message);
    } else {
      return callback(new Error(error.message))
    }
  }
};
