
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './admin.css'; 

const AddUsers = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');



  const handleEmailChange = (email, userId) => {
    setUserEdits({ ...userEdits, [userId]: email });
  };


  const handleUpdate = async (userId) => {
    const updatedEmail = userEdits[userId];
    if (!updatedEmail) {
      console.error('No changes made to the email or email is invalid');
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`http://localhost:5000/admin/staff/${userId}`, {
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
      const response = await fetch(`http://localhost:5000/admin/staff/${userId}`, {
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


  const [users, setUsers] = useState([]);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userEdits, setUserEdits] = useState({}); 






  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('http://localhost:5000/admin/staff');
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




  const handleFormSubmit = async (e) => {
    e.preventDefault();

 
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    try {
      const adminData = {
        email: email,
        password: password
      
      };


      const response = await fetch('http://localhost:5000/admin/add/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        
        },
        body: JSON.stringify(adminData),
      });


      const data = await response.json();
      if (response.ok) {
        console.log('Admin added successfully', data);
        setSuccessMessage('Admin added successfully!');
        setEmail('');
        setPassword('');
        window.location.reload()

      } else {
        console.error('Failed to add admin', data.message);
        setSuccessMessage('Failed to add admin');
      }
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;

      default:
        break;
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
            <div className="admin-form-container">
              {}
              <form className="admin-menu-form" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="itemName">Email:</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="itemPrice">Password:</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={handleInputChange}
                    required
                  />
                </div>


                <button type="submit">Add Item</button>
              </form>
              {successMessage && (
                <div className="success-message">
                  {successMessage}
                </div>
              )}
            </div>








          </div>


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










    </>
  );
};

export default AddUsers;
