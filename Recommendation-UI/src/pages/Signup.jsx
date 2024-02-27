import { React, useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import MovieIcon from "@mui/icons-material/Movie";
import axios from "axios";
import LoadingButton from '@mui/lab/LoadingButton';
import { Alert, AlertTitle } from '@mui/material'
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        MovieDB
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function Signup() {
  
  const [formValid, setFormValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleInputChange = (event) => {
    const formData = new FormData(event.currentTarget);
    // Check if all required fields have values
    const isValid = Array.from(formData.values()).every((value) => value.trim() !== '');
    setFormValid(isValid);
  };
  const [alert, setAlert] = useState(null);
  const [error,setError] = useState(null)
  const [load, setLoad] = useState(false);
  
  const handleClickShowPassword = () => {
    setShowPassword((show) => !show)
  };

  

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
  
    try {
      setLoad(true);
      const response = await axios.post("http://localhost:5000/signup", data);
      console.log(response.data.success);
      if(response.status==201){
        setError('Account already exists. Please Login');
        setAlert(null)
      }
      else{
        setAlert('Account created successfully. You can login now')
        setError(null)

      }
    } catch (error) {
      console.error(error.data);
      setAlert(null);
    } finally {
      setLoad(false);
      setTimeout(()=>{
        setAlert(null)
        setError(null)
      },5000)
    }
  };
  

 
  return (
    <div className="signupkr" >
      <ThemeProvider theme={defaultTheme}>
      {alert && (
            <Alert  severity="success" color="success">
            <AlertTitle>Success</AlertTitle>
            Account created successfully— <strong>You can login now !</strong>
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
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
         
         <img src="./Images/moviedb.png" alt="" height={80} style={{marginBottom:20}} />

          
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            onChange={handleInputChange}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type='email'
                  name="email"
            
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  
                  label="Password"
                  id="password"
                  autoComplete="new-password"
                  
                />
              </Grid>
            </Grid>
          
           
            <LoadingButton
            type='submit'
            fullWidth
            disabled={!formValid}
            sx={{mt:2}}
            variant='contained'
            loading={load} // Set the loading prop based on the state
          >
            Create Account
          </LoadingButton>   

            <Grid container mt={2} justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}
