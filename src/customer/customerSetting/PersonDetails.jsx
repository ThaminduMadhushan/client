// import React, { useEffect, useState } from 'react';
// import FormLabel from '@mui/material/FormLabel';
// import Grid from '@mui/material/Grid';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import Button from '@mui/material/Button';
// import { styled } from '@mui/system';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';

// const FormGrid = styled(Grid)(() => ({
//   display: 'flex',
//   flexDirection: 'column',
// }));

// export default function AddressForm() {
//   const [customer, setCustomer] = useState({
//     id: '', // Ensure ID is included here
//     firstName: '',
//     lastName: '',
//     address: '',
//     telephone: '',
//     nic: '',
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     axios.get('http://localhost:3001/api/auth/authenticated', { withCredentials: true })
//       .then((res) => {
//         if (!res.data.authenticated) {
//           navigate('/login');
//         } else {
//           fetchCustomerDetails(res.data.user.id);
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//         navigate('/login');
//       });
//   }, [navigate]);

//   const fetchCustomerDetails = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:3001/api/customer/${userId}`);
//       if (!response.ok) {
//         throw new Error('Failed to fetch customer details');
//       }
//       const data = await response.json();
//       setCustomer({
//         id: data.customer_id,
//         firstName: data.firstname,
//         lastName: data.lastname,
//         address: data.address,
//         telephone: data.telephone,
//         nic: data.nic,
//       });
//     } catch (error) {
//       console.error('Error fetching customer details:', error);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCustomer((prevCustomer) => ({
//       ...prevCustomer,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await fetch(`http://localhost:3001/api/customer/${customer.id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(customer),
//       });
//       if (!response.ok) {
//         throw new Error('Failed to update customer details');
//       }
//       Swal.fire({
//         icon: 'success',
//         title: 'Success',
//         text: 'Customer details updated successfully',
//       });
//     } catch (error) {
//       console.error('Error updating customer details:', error);
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: 'Failed to update customer details',
//       });
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Grid container spacing={3}>
//         <FormGrid item xs={12} md={6}>
//           <FormLabel htmlFor="first-name" required>
//             First name
//           </FormLabel>
//           <OutlinedInput
//             id="first-name"
//             name="firstName"
//             type="text"
//             autoComplete="first name"
//             required
//             value={customer.firstName}
//             onChange={handleChange}
//           />
//         </FormGrid>
//         <FormGrid item xs={12} md={6}>
//           <FormLabel htmlFor="last-name" required>
//             Last name
//           </FormLabel>
//           <OutlinedInput
//             id="last-name"
//             name="lastName"
//             type="text"
//             autoComplete="last name"
//             required
//             value={customer.lastName}
//             onChange={handleChange}
//           />
//         </FormGrid>
//         <FormGrid item xs={12}>
//           <FormLabel htmlFor="address" required>
//             Address
//           </FormLabel>
//           <OutlinedInput
//             id="address"
//             name="address"
//             type="text"
//             autoComplete="shipping address-line1"
//             required
//             value={customer.address}
//             onChange={handleChange}
//           />
//         </FormGrid>
//         <FormGrid item xs={6}>
//           <FormLabel htmlFor="telephone" required>
//             Telephone Number
//           </FormLabel>
//           <OutlinedInput
//             id="telephone"
//             name="telephone"
//             type="text"
//             autoComplete="telephone"
//             required
//             value={customer.telephone}
//             onChange={handleChange}
//           />
//         </FormGrid>
//         <FormGrid item xs={6}>
//           <FormLabel htmlFor="nic" required>
//             NIC
//           </FormLabel>
//           <OutlinedInput
//             id="nic"
//             name="nic"
//             type="text"
//             autoComplete="nic"
//             required
//             value={customer.nic}
//             onChange={handleChange}
//           />
//         </FormGrid>
//         <Grid item xs={12}>
//           <Button type="submit" variant="contained" color="primary">
//             Save
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// }


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

export default function AddressForm() {
  const [customer, setCustomer] = useState({
    id: '',
    firstName: '',
    lastName: '',
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
          fetchCustomerDetails(res.data.user.id);
        }
      })
      .catch((err) => {
        console.error(err);
        navigate('/login');
      });
  }, [navigate]);

  const fetchCustomerDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/customer/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch customer details');
      }
      const data = await response.json();
      setCustomer({
        id: data.customer_id,
        firstName: data.firstname,
        lastName: data.lastname,
        address: data.address,
        telephone: data.telephone,
        nic: data.nic,
      });
    } catch (error) {
      console.error('Error fetching customer details:', error);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Telephone validation: accept only numbers and limit to 10 characters
    if (name === 'telephone' && !/^\d{0,10}$/.test(value)) return;
  
    // NIC validation: accept exactly 12 numbers
   
  
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };
  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/customer/${customer.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customer),
      });
      if (!response.ok) {
        throw new Error('Failed to update customer details');
      }
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Customer details updated successfully',
      });
    } catch (error) {
      console.error('Error updating customer details:', error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to update customer details',
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
            value={customer.firstName}
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
            value={customer.lastName}
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
            value={customer.address}
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
            value={customer.telephone}
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
            value={customer.nic}
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
