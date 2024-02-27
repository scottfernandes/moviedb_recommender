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
export default function ChangePass() {
    
    const [pass,setPass] = useState('')
    const [alert, setAlert] = useState(null);
    const [error,setError] = useState(null)
    const [load,setLoad] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          setLoad(true);
    
            // User is entering OTP
            const response = await axios.post("http://localhost:5000/forgotpass", {"pass":pass },{
              headers: {
                'Content-Type': 'application/json',
              }
              
            });
    
            console.log(response.data);
            setAlert('Password Changed');
          
            
          
        } catch (error) {
          setError('An error encountered');
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
       

           
              <TextField
              margin="normal"
              required
              fullWidth
              label="New Password"
              name="pass"
              type='password'
              autoComplete="pass"
              value={pass}
              
              onChange={(e) => { setPass(e.target.value) }}
            />
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              loading={load}
              disabled={!pass}
            >
              Change Password
            </LoadingButton>
            
          
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
