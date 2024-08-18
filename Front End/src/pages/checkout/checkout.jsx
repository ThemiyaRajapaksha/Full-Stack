import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './checkout.css'; 
import NavigationBar from '../../components/navigation';

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [email, setEmail] = useState(false);

  useEffect(() => {
    const cart = Cookies.get('cart');

    const user = Cookies.get('userSession');

    if (cart) {
      setCartItems(JSON.parse(cart));
    }

    if (user) {
      setEmail(user);
    }

console.log(user);
  }, []);

  const removeFromCart = (itemName) => {
    const newCartItems = cartItems.filter(item => item !== itemName);
    setCartItems(newCartItems);
    Cookies.set('cart', JSON.stringify(newCartItems));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const orderData = {
      customerName: name,
      deliveryAddress: address,
      orderItems: cartItems,
      email:email
    };

    try {
      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      const responseData = await response.json();
      if (response.ok) {
        setOrderSuccess(true);
        setCartItems([]); 
        Cookies.remove('cart'); 
      } else {
        console.error('Failed to place order', responseData.message);
      }
    } catch (error) {
      console.error('There was an error submitting the form:', error);
    }
  };

  return (
    <>
      <NavigationBar />
      <div className="checkout-container">
        <h1>Checkout</h1>
        {!orderSuccess && (
          <>
            <ul>
              {cartItems.map((itemName, index) => (
                <li key={index} className="checkout-item">
                  <span className="item-name">{itemName}</span>
                  <button onClick={() => removeFromCart(itemName)}>Remove</button>
                </li>
              ))}
            </ul>
            <div className="customer-info-form">
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="continue-button">Place Order</button>
              </form>
            </div>
          </>
        )}
        {orderSuccess && (
          <div className="order-success-message">
            Order placed successfully!
          </div>
        )}
      </div>
    </>
  );
};

export default CheckoutPage;
