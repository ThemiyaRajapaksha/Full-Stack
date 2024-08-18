import React from 'react';
import Cookies from 'js-cookie';
const printCartToConsole = () => {
  const cart = Cookies.get('cart'); 

  if (cart) {
    const cartItems = JSON.parse(cart); 
    console.log('Cart Items:', cartItems); 
  } else {
    console.log('No items in cart.');
  }
};
const addToCart = (productid) => {
  if (!productid) {
    console.error('Product ID is undefined or null, not adding to cart');
    return;
  }
  printCartToConsole();

  let cart = Cookies.get('cart') ? JSON.parse(Cookies.get('cart')) : [];

  const productExists = cart.find((id) => id === productid);

  if (!productExists) {
    cart.push(productid);
  } else {
    console.log('Product already in cart');
  }

  Cookies.set('cart', JSON.stringify(cart), { expires: 7 });
};
const ItemCard = ({ productid,name, price, imageUrl }) => {
  
  return (
    <div className="item-card">
<img src={`http://localhost:5000/uploads/${imageUrl}`} alt={name} className="item-image" />
    <div className="item-content">
      <div className="item-info">
        <h3>{name}</h3>
        <p>{price}</p>
      </div>
      <div className="item-add">
        <button className="add-button" onClick={() => addToCart(name)}>+</button>
      </div>
    </div>
  </div>
  );
};

export default ItemCard;
