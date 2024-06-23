import React, { useContext, useEffect } from 'react';
import { useSetState } from 'react-use';
import axios from 'axios';
import { CartContext } from './cart.context';
import { AuthContext } from './Auth.context';
import config from '../config';

export const OrderContext = React.createContext(null);

const initialState = {
  isOrderPending: false,
  orderError: null,
  orderSuccess: false,
  showPreviousOrders: false,
  previousOrders: [],
}

export const OrderProvider = props => {
  const [state, setState] = useSetState(initialState);
  const { clearCart } = React.useContext(CartContext);
  const { state: ContextState } = useContext(AuthContext);
  const { userId } = ContextState;

  const setOrderPending = (isOrderPending) => setState({ isOrderPending });
  const setOrderSuccess = (orderSuccess) => setState({ orderSuccess });
  const setOrderError = (orderError) => setState({ orderError });
  const setShowPreviousOrders = (showPreviousOrders) => setState({ showPreviousOrders });
  const setPreviousOrders = (previousOrders) => setState({ previousOrders });

  const placeOrder = (requestObject) => {
    setOrderPending(true);
    setOrderError(null);
    setOrderSuccess(false);
    placeOrderAxiosCall(requestObject, response => {
      setOrderPending(false);
      if (response.status === 201) {
        setOrderSuccess(true);
        clearCart();
      } else {
        setOrderError(response.message);
      }
    });
  }

  const getPreviousOrderDetails = () =>{
    getPreviousOrderAxiosCall(userId, response=>{
      if(response.status === 200){
        setShowPreviousOrders(true);
        setPreviousOrders(response.data); // set previous orders state using the response data
        console.log(state.previousOrders)
      }else{
        console.log("ERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
      }
    })
  }

  return (
    <OrderContext.Provider
      value={{
        state,
        placeOrder,
        getPreviousOrderDetails
      }}
    >
      {props.children}
    </OrderContext.Provider>
  );
};


const placeOrderAxiosCall = async (requestObject, callback) => {
  try {
    const { emailId, products } = requestObject;
    const response = await axios.post(config.orderPlacingApiUrl, {
      emailId,
      products
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


const getPreviousOrderAxiosCall = async (userId, callback) => {
  try {
    console.log("here")
    const response = await axios.get(`${config.previousOrderDetailsApiUrl}?userId=${userId}`);
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
