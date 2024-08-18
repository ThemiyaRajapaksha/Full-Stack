import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import './dashboard.css';

const OrderDetailsPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      setError(null);
      const userEmail = Cookies.get('userSession');
      console.log(userEmail);
      try {
        const response = await fetch('http://localhost:5000/api/orders/');
        if (response.ok) {
          const allOrders = await response.json();
          const userOrders = allOrders.filter(order => order.email === userEmail);
          if (userOrders.length > 0) {
            setOrders(userOrders);
          } else {
            setError('No orders found for your account.');
          }
        } else {
          setError('Failed to fetch orders.');
        }
      } catch (e) {
        setError('There was an error accessing the orders.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <ul className="nav-links">
          <li><a href="/" className="nav-link">Home</a></li>
          <li><a href="/logout" className="nav-link">Logout</a></li>
        </ul>
      </nav>

      <div className="order-details-container">
        <h1>Order Details</h1>
        {/* Conditional Content */}
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : orders.length > 0 ? (
          <div className="orders-grid">
            {orders.map(order => (
              <div key={order._id} className="order-card">
                <h2>Order ID: {order._id}</h2>
                <p><strong>Customer Name:</strong> {order.customerName}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>Delivery Address:</strong> {order.deliveryAddress}</p>
                <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleDateString()}</p>
                <p><strong>Items:</strong></p>
                <ul>
                  {order.orderItems.map((item, index) => (
                    <li key={index}>
                      {item.itemName}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-orders">
            <p>No orders found for your account.</p>
            <p>It seems like you haven't placed any orders yet. Why not explore our products?</p>
            <button
              onClick={() => window.location.href = '/products'}
              className="explore-btn"
            >
              Explore Products
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
