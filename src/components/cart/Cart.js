import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { CartState } from '../../context/ContextProvider';

function Cart({ cartItems }) {

  const {cartState: {cart}} = CartState()
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart-style" >
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cart.map((item) => (
            <Card className="mb-2" key={item.id}>
              <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>
                  Price: ${item.price} <br />
                  Quantity: {item.quantity}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          <h3>Total: ${totalPrice}</h3>
          <Button variant="success">Checkout</Button>
        </div>
      )}
    </div>
  );
}

export default Cart;
