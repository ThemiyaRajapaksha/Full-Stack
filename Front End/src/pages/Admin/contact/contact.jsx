import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const MessagesPage = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
 
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:5000/api/messages');
        const data = await response.json();
        setMessages(data);
      } catch (error) {
        console.error('Error:', error);
      }
      setLoading(false);
    };

    fetchMessages();
  }, []);

  const updateMessage = async (id, updatedEmail) => {
    try {
    
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: updatedEmail }),
      });
      
      if (!response.ok) {
      
        throw new Error('Could not update message.');
      }
  
   
      setMessages((prevMessages) =>
        prevMessages.map((message) =>
          message._id === id ? { ...message, email: updatedEmail } : message
        )
      );
      alert('Email updated successfully.');
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Failed to update email.');
    }
  };
  
  const deleteMessage = async (id) => {
    try {
  
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
      
        throw new Error('Could not delete message.');
      }
  

      setMessages((prevMessages) =>
        prevMessages.filter((message) => message._id !== id)
      );
      alert('Message deleted successfully.');
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Failed to delete message.');
    }
  };
  

  return (







<div className="admin-dashboard-container">
        <div className="admin-dashboard">
          <h1>Admin Dashboard</h1>
          <div className="admin-content">
            <div className="admin-menu">
              <NavLink to="/admin/users" activeClassName="active">USERS</NavLink>
              <NavLink to="/admin/add-menu" activeClassName="active">MENU</NavLink>
              <NavLink to="/admin/orders" activeClassName="active">ORDERS</NavLink>
              <NavLink to="/admin/add-user" activeClassName="active">ADMINS</NavLink>
              <NavLink to="/admin/add-promotion" activeClassName="active">PROMOTION</NavLink>

              <NavLink to="/admin/message" activeClassName="active">MESSAGE</NavLink>

            </div>
            <div className="admin-form-container">
             




    
            <div className="messages-container">
      <h1>Messages</h1>
      {loading ? (
        <p>Loading messages...</p>
      ) : (
        <ul>
          {messages.map((message) => (
            <li key={message._id} className="message-item">
              <p><strong>Name:</strong> {message.name}</p>
              <input 
                type="text" 
                defaultValue={message.email} 
                onBlur={(e) => updateMessage(message._id, e.target.value)}
              />
              <p><strong>Message:</strong> {message.message}</p>
              <button onClick={() => updateMessage(message._id)}>Update</button>
              <button onClick={() => deleteMessage(message._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>





            </div>








          </div>




        </div>
      </div>










  );
};

export default MessagesPage;
