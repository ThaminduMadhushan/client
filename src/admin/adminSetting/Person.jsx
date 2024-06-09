import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Box, Divider, Grid, IconButton, Stack, TextField, Typography, Paper, CircularProgress } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';

export default function Person() {
  const [user, setUser] = useState({ firstname: '', lastname: '', email: '', id: '' });
  const [adminId, setAdminId] = useState('');
  const [adminFirstname, setAdminFirstname] = useState('');
  const [adminLastname, setAdminLastname] = useState('');
  const [aboutText, setAboutText] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/authenticated', { withCredentials: true })
      .then(res => {
        if (res.data.authenticated) {
          setUser(res.data.user);
          fetchAdminDetails(res.data.user.id);
        } else {
          navigate('/login');
        }
      })
      .catch(err => {
        setError('Failed to fetch user details');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const fetchAdminDetails = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3001/api/admin/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch admin details');
      }
      const data = await response.json();
      setAdminId(data.admin_id);
      setAdminFirstname(data.firstname);
      setAdminLastname(data.lastname);
      setAboutText(data.about);
    } catch (error) {
      setError('Failed to fetch admin details');
    }
  };

  const handleSaveAbout = async () => {
    try {
      setLoading(true);
      await axios.put(`http://localhost:3001/api/admin/edit/about/${user.id}`, { about: aboutText });
      setIsEditing(false);
    } catch (error) {
      setError('Failed to save about');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={3} sx={{ width: '100%', padding: 2, backgroundColor: '#f9f9f9', borderRadius: '10px', margin: 'auto', marginTop: '10px' }}>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      {!loading && !error && (
        <Stack spacing={2}>
          <Typography variant="h5" align="center" gutterBottom>
            User Details
          </Typography>
          <Divider />
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
              <Stack spacing={1}>
                <Typography variant="subtitle1" color="textSecondary">
                  First Name:
                </Typography>
                <Typography variant="body1">{adminFirstname}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <Typography variant="subtitle1" color="textSecondary">
                  Last Name:
                </Typography>
                <Typography variant="body1">{adminLastname}</Typography>
              </Stack>
            </Grid>
            <Grid item xs={12}>
              <Stack spacing={1}>
                <Typography variant="subtitle1" color="textSecondary">
                  Email:
                </Typography>
                <Typography variant="body1">{user.email}</Typography>
              </Stack>
            </Grid>
          </Grid>
          <Divider />
          <Box mt={2}>
            <Typography variant="h5" align="center" gutterBottom>
              About
              {!isEditing && (
                <IconButton onClick={() => setIsEditing(true)}>
                  <EditIcon color="primary" />
                </IconButton>
              )}
            </Typography>
            {isEditing ? (
              <TextField
                multiline
                fullWidth
                rows={4}
                value={aboutText}
                onChange={(e) => setAboutText(e.target.value)}
                variant="outlined"
              />
            ) : (
              <Typography color="text.secondary">{aboutText}</Typography>
            )}
            {isEditing && (
              <IconButton onClick={handleSaveAbout}>
                <SaveIcon color="primary" />
              </IconButton>
            )}
            <Box height={50} />
          </Box>
        </Stack>
      )}
    </Paper>
  );
}
