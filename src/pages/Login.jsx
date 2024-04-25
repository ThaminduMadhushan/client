import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

export default function Login() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  // const handleSubmit = async (event) => {
  //   event.preventDefault();

  //   const { email, password } = values;

  //   try {
  //     const response = await axios.post('http://localhost:3001/api/auth/login', { email, password });
  //     const token = response.data.token;
  //     navigate('/home');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  useEffect(() => {
    axios.get('http://localhost:3001/api/auth/authenticated')
      .then(res => {
        if (res.data.authenticated) {
          navigate('/');
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  

  axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   axios.get('http://localhost:3001')
  //   .then (res => {
  //     if(res.data.valid) {
  //       navigate('/')
  //     } else {
  //       navigate('/login')
  //     }
  // })
  // .catch(err => {
  //   console.log(err)
  // })
  // }, [])
  const handleSubmit = async (event) => {
    event.preventDefault();
    axios.post('http://localhost:3001/api/auth/login', values)
    .then((response) => {
      if (response.data.Login) {
        navigate('/');
      } else {
        alert("Email or Password is incorrect");
      }
      console.log(response);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange('email')}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange('password')}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
