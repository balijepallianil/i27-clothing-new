import {
  CheckoutItemContainer,
  ImageContainer,
  BaseSpan,
  Quantity,
  Value
} from './order-item.styles';

const OrderItem = ({ orderItem }) => {
  const { productName, productImageUrl, productPrice, quantity } = orderItem;

  // const { addItemToCart, removeItemToCart } =
  //   useContext(CartContext);
  // const cartItemQuantity =  cartItem.quantity;

  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={productImageUrl} alt={`${productName}`} />
      </ImageContainer>
      <BaseSpan> {productName} </BaseSpan>
      <Quantity>
        <Value>{quantity}</Value>
      </Quantity>
      <BaseSpan> {productPrice}</BaseSpan>
    </CheckoutItemContainer>
    
  );
};

export default OrderItem;
