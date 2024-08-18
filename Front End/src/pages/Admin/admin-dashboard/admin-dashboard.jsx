
import './admin.css'; 

import React from 'react';
import { NavLink } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-menu">
      <NavLink to="/admin/users" activeClassName="active">USERS</NavLink>
              <NavLink to="/admin/add-menu" activeClassName="active">MENU</NavLink>
              <NavLink to="/admin/orders" activeClassName="active">ORDERS</NavLink>
              <NavLink to="/admin/add-user" activeClassName="active">ADMINS</NavLink>
              <NavLink to="/admin/add-promotion" activeClassName="active">PROMOTION</NavLink>

      </div>
      <div className="admin-actions">
        <button>Add</button>
        <button>Update</button>
        <button>Delete</button>
      </div>
    </div>
  );
};

export default AdminDashboard;
