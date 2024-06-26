import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [user, setUser] = useState({ firstname: '', email: '', id: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/authenticated', { withCredentials: true })
      .then(res => {
        if (res.data.authenticated) {
          setUser(res.data.user);
          // if (res.data.user.role !== 'admin') {
          //   navigate('/');
          // }
        } else {
          navigate('/login');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, [navigate]);


  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome, {user.id}</p>
      <p>Email: {user.email}</p>
      <p>Role: {user.role}</p>
    </div>
  );
}

export default AdminDashboard;
