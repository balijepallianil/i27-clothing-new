import { useContext } from 'react';

import { CartContext } from '../../contexts/cart.context';
import { OrderContext } from '../../contexts/Order.context';
import { AuthContext } from '../../contexts/Auth.context';
// import Button from '../button/button.component';
import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Arrow,
  Value,
  RemoveButton,
  Button,
  OuterContainer,
} from './checkout-item.styles';

const CheckoutItem = ({ cartItem }) => {
  const { name, imageUrl, price, quantity } = cartItem;

  const { clearItemFromCart, addItemToCart, removeItemToCart, clearCart, cartItems } =
    useContext(CartContext);
    const { state: ContextState } = useContext(AuthContext);
    const { userEmailId } = ContextState;
  const { placeOrder } = useContext(OrderContext);
  const clearItemHandler = () => clearItemFromCart(cartItem);
  const addItemHandler = () => addItemToCart(cartItem);
  const removeItemHandler = () => removeItemToCart(cartItem);
  const cartItemQuantity = cartItem.quantity;

  const handlePlaceOrder = () => {
    const requestObject = {
      emailId: userEmailId,
      products: cartItems.map(item => ({
        productId: item.id,
        productImageUrl: item.imageUrl,
        productName: item.name,
        productPrice: item.price,
        quantity: item.quantity,
      }))
    };

    placeOrder(requestObject);
  };


  return (
    <OuterContainer>
      <CheckoutItemContainer>
        <ImageContainer>
          <img src={imageUrl} alt={`${name}`} />
        </ImageContainer>
        <BaseSpan> {name} </BaseSpan>
        <Quantity>
          <Arrow onClick={removeItemHandler}>&#10094;</Arrow>
          <Value>{cartItemQuantity}</Value>
          <Arrow onClick={addItemHandler}>&#10095;</Arrow>
        </Quantity>
        <BaseSpan> {price}</BaseSpan>
        <RemoveButton onClick={clearItemHandler}>&#10005;</RemoveButton>
      </CheckoutItemContainer>
      {
        cartItemQuantity > 0 ? (<Button type='submit' onClick={handlePlaceOrder}>Place Order</Button>) : (<></>)
      }

    </OuterContainer>

  );
};

export default CheckoutItem;
