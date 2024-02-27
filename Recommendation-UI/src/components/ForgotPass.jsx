import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Alert, AlertTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import {useNavigate} from 'react-router-dom'
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit">
        MovieDB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme({
  palette:{
    'mode':'dark'
  }
});

export default function ForgotPass() {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [otp,setOtp] = useState(0)
  const [alert, setAlert] = useState(null);
  const [error,setError] = useState(null)
  const [load,setLoad] = useState(false)
  const [validOtp,setValidOtp] = useState(0)
  const [enterOtp,setEnterOtp] = useState(false)
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoad(true);

      if (enterOtp) {
        // User is entering OTP
        const response = await axios.post("http://localhost:5000/forgotpass", { "email": email, "otp": otp },{
          headers: {
            'Content-Type': 'application/json',
          }
          
        });

        console.log(response.data);
        setAlert('OTP matches, You can change your password');
        setValidOtp(otp);
        
          navigate('/changePass')
        
        
      } else {
        // User is requesting OTP
        const response = await axios.post("http://localhost:5000/forgotpass", {"email": email},
        {
          headers: {
            'Content-Type': 'application/json',
          }
        });
        
        setAlert('OTP sent. Please check your mail');
        setEnterOtp(true);
      }
    } catch (error) {
      setError('An error encountered. Please re-enter your email');
      console.error(error);
    } finally {
      setLoad(false);
      setTimeout(() => {
        setAlert(null);
        setError(null);
      }, 5000);
    }
  };

  

  return (
    <ThemeProvider theme={defaultTheme}>
      {alert && (
            <Alert  severity="success" color="success">
            <AlertTitle>Success</AlertTitle>
            {alert}
          </Alert>
          )}
        {error &&(
          <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
        )}
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
          <img src="./Images/moviedb.png" alt="" height={80} style={{marginRight:35}}/>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 5 }}>
       

           
            {enterOtp ?(
              <>
              <TextField
              margin="normal"
              required
              fullWidth
              id="otp"
              label="OTP"
              name="otp"
              autoComplete="otp"
              value={otp}
              onChange={(e) => { setOtp(e.target.value) }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={load}
              disabled={!otp}
            >
              Enter the OTP
            </LoadingButton>
              </>
            ):(
              <>
              <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              
              onChange={(e) => { setEmail(e.target.value) }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={load}
              disabled={!email}
            >
              Get OTP
            </LoadingButton>
              </>
            )}
            
          
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}