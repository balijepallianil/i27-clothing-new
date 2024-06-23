import React, { useContext, useEffect } from 'react';
import { CartContext } from '../../contexts/cart.context';
import OrderItem from '../../components/order-item/order-item.component';
import { OrderContext } from '../../contexts/Order.context';
import {
  CheckoutContainer,
  CheckoutHeader,
  HeaderBlock,
  Total,
} from './order.styles';

const Order = () => {
  const { cartItems, cartTotal } = useContext(CartContext);
  const { getPreviousOrderDetails, state: { previousOrders } } = useContext(OrderContext);

  useEffect(() => {
    getPreviousOrderDetails();
  }, []);

  useEffect(() => {
    console.log(previousOrders);
  }, [previousOrders]);
  
  const orderTotal = previousOrders.reduce(
    (total, orderItem) => total + orderItem.quantity * orderItem.productPrice,
    0
  );
  return (
    <CheckoutContainer>
      <CheckoutHeader>
        <HeaderBlock>
          <span>Product</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Description</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Quantity</span>
        </HeaderBlock>
        <HeaderBlock>
          <span>Price</span>
        </HeaderBlock>
      </CheckoutHeader>
      {previousOrders.length > 0 ? (
        previousOrders.map((orderItem) => (
          <OrderItem key={orderItem.orderId} orderItem={orderItem} />
        ))
      ) : (
        <p>Loading...</p>
      )}
      <Total>Total: ${orderTotal}</Total>
    </CheckoutContainer>
  );
};

export default Order;
