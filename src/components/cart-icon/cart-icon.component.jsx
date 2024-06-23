import { Fragment, useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../contexts/cart.context';
import { AuthContext } from '../../contexts/Auth.context';
import { CartIconContainer, ItemCount } from './cart-icon.styles';
import { useNavigate } from 'react-router-dom';

const CartIcon = () => {
  const navigate = useNavigate();
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);
  const { state: ContextState } = useContext(AuthContext);
  const { isLoggedIn } = ContextState;

  const toggleIsCartOpen = () => setIsCartOpen(!isCartOpen);

  const handleClick = () => {
    if (isLoggedIn) {
      toggleIsCartOpen();
    } else {
      navigate('/auth');
    }
  };

  return (
    <Fragment>
      <CartIconContainer onClick={handleClick}>
        <ShoppingIcon className='shopping-icon' />
        <ItemCount>{cartCount}</ItemCount>
      </CartIconContainer>
    </Fragment>
  );
};

export default CartIcon;
