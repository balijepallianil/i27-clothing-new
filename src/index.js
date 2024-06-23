import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { CategoriesProvider } from './contexts/categories.context';
import { CartProvider } from './contexts/cart.context';
import { ContextProvider } from './contexts/Auth.context';

import './index.scss';
import { OrderContext, OrderProvider } from './contexts/Order.context';

const rootElement = document.getElementById('root');

render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <ContextProvider>
          <OrderProvider>
            <CategoriesProvider>
              <App />
            </CategoriesProvider>
          </OrderProvider>
        </ContextProvider>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
