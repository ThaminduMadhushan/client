import React, { useEffect, useState } from 'react';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function PersonDetails() {
  const [bailer, setBailer] = useState({
    id: '',
    firstname: '',
    lastname: '',
    address: '',
    telephone: '',
    nic: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/authenticated', { withCredentials: true })
      .then((res) => {
        if (!res.data.authenticated) {
          navigate('/login');
        } else {
          fetchBailerDetails(res.data.user.id);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate('/login');
      });
  }, [navigate]);

  const fetchBailerDetails = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/bailer/${userId}`);
      if (response.status !== 200) {
        throw new Error('Failed to fetch bailer details');
      }
      const data = response.data;
      setBailer({
        id: data.bailer_id,
        firstname: data.firstname,
        lastname: data.lastname,
        address: data.address,
        telephone: data.telephone,
        nic: data.nic,
      });
    } catch (error) {
      console.error('Error fetching bailer details:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // // Telephone validation: accept only numbers and limit to 10 characters
    // if (name === 'telephone' && !/^\d{0,10}$/.test(value)) return;
  
    // // NIC validation: accept exactly 12 numbers
    // if (name === 'nic' && !/^\d{0,12}$/.test(value)) return;
  
    setBailer((prevBailer) => ({
      ...prevBailer,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3001/api/bailer/${bailer.id}`, bailer, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status !== 200) {
        throw new Error('Failed to update bailer details');
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Bailer details updated successfully',
      });
    } catch (error) {
      console.error('Error updating bailer details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update bailer details',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <OutlinedInput
            id="first-name"
            name="firstName"
            type="text"
            autoComplete="first name"
            required
            value={bailer.firstname}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <OutlinedInput
            id="last-name"
            name="lastName"
            type="text"
            autoComplete="last name"
            required
            value={bailer.lastname}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="address" required>
            Address
          </FormLabel>
          <OutlinedInput
            id="address"
            name="address"
            type="text"
            autoComplete="shipping address-line1"
            required
            value={bailer.address}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="telephone" required>
            Telephone Number
          </FormLabel>
          <OutlinedInput
            id="telephone"
            name="telephone"
            type="text"
            autoComplete="telephone"
            required
            value={bailer.telephone}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={6}>
          <FormLabel htmlFor="nic" required>
            NIC
          </FormLabel>
          <OutlinedInput
            id="nic"
            name="nic"
            type="text"
            autoComplete="nic"
            required
            value={bailer.nic}
            onChange={handleChange}
          />
        </FormGrid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
