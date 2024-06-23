import { Fragment } from 'react';
import React, {useContext} from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { CartContext } from '../../contexts/cart.context';
import { AuthContext } from '../../contexts/Auth.context';

import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';

import {
  NavigationContainer,
  NavLinks,
  NavLink,
  LogoContainer,
  UserDisplayName
} from './navigation.styles';



const Navigation = () => {
  const navigate = useNavigate();
  // const { currentUser } = useContext(UserContext);
  const { state: ContextState, logout } = useContext(AuthContext);
  const { isCartOpen } = useContext(CartContext);
  const { isLoggedIn,userDisplayName } = ContextState;
const onLogout = (e) => {
  e.preventDefault();
  logout();
  navigate('/');
}
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        <NavLinks>
        {
            isLoggedIn ?(<UserDisplayName>Hey,<span style={{ marginLeft: '8px' }}></span>{userDisplayName}</UserDisplayName>):(<></>)
          }
          {
            isLoggedIn ?(
              <NavLink to='/shop'>SHOP</NavLink>
            ):(
              <NavLink to='/auth'>SHOP</NavLink>
            )
          }
          {isLoggedIn ? (
            <NavLink as='span' onClick={onLogout}>
              SIGN OUT
            </NavLink>
          ) : (
            <NavLink to='/auth'>SIGN IN</NavLink>
          )}
          {
            isLoggedIn ? 
              (<NavLink to='/order'>My Orders</NavLink>)
            :(<></>)
          }
          <CartIcon />
        </NavLinks>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
