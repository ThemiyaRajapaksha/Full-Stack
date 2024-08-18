
import React, { useState, useEffect } from 'react';
import './view.css'; 
import { NavLink } from 'react-router-dom';

const AdminUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userEdits, setUserEdits] = useState({}); 

  const handleEmailChange = (email, userId) => {
    setUserEdits({ ...userEdits, [userId]: email });
  };




  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/admin/users');
        if (!response.ok) {
          throw new Error('Could not fetch users');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message);
      }
      setIsLoading(false);
    };

    fetchUsers();
  }, []);

  const handleUpdate = async (userId) => {
    const updatedEmail = userEdits[userId];
    if (!updatedEmail) {
      console.error('No changes made to the email or email is invalid');
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/admin/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: updatedEmail }),
      });
      if (!response.ok) {
        throw new Error('Could not update user email');
      }
     
      setUsers(users.map((user) => (user._id === userId ? { ...user, email: updatedEmail } : user)));
   
      setUserEdits((prevEdits) => {
        const updatedEdits = { ...prevEdits };
        delete updatedEdits[userId];
        return updatedEdits;
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };
  const handleDelete = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user?')) {
      return;
    }
  
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/admin/users/${userId}`, {
        method: 'DELETE',
      });
  
      if (!response.ok) {
        throw new Error('Could not delete the user');
      }
  
    
      setUsers(users.filter((user) => user._id !== userId));
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
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
            <div className="admin-users-container">
              {error && <div className="error">{error}</div>}
              {isLoading ? (
                <div>Loading users...</div>
              ) : (
                <table className="admin-users-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
      {users.map((user) => (
        <tr key={user._id}>
          <td>
            <input
              type="text"
              value={userEdits[user._id] || user.email}
              onChange={(e) => handleEmailChange(e.target.value, user._id)}
            />
          </td>
          <td>
            <button onClick={() => handleUpdate(user._id)}>Update</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminUsersPage;
