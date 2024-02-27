import  {React,useState} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAuth } from '../auth/Auth';
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        MovieDB
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});
export default function Login() {
  
  const {login} = useAuth()
  const [user,setUser] = useState({
    name:'',
    password:'',
  })

  const[errormsg,setErrormsg] = useState('')
  const [load,setLoad]= useState(false)  
  // TODO remove, this demo shouldn't need to reset the theme.
  let navigate = useNavigate()
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!user.name || !user.password) {
      setErrormsg('**Please fill in all the fields**');

      setTimeout(() => {
        setErrormsg('')
      }, 3000);
      return; 
    }
    setLoad(true);
    axios.post('http://localhost:5000/login', user, {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then((response) => {


        if (response.status === 200 && response.data.success) {
          login(response.data)
          localStorage.setItem('Logged_In', 'true');
          localStorage.setItem('username', response.data.username);
          console.log(response.data);
          navigate(`/user/preferences`);
        } else {
          // Unsuccessful login
          setErrormsg(response.data.message || 'Login failed'); // Display server-provided error message, if any
          setTimeout(() => {
            setErrormsg('');
          }, 3000);
        }}
      )
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoad(false);
      });
  };
  


  const onChange =(event) =>{
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  
  

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://repository-images.githubusercontent.com/275336521/20d38e00-6634-11eb-9d1f-6a5232d0f84f)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
                      <img src="./Images/moviedb.png" alt="" height={80} style={{marginBottom:20}} />
            {errormsg &&(
                <Typography color={'error'}>{errormsg}</Typography>
                )
            }
            <Typography component="h1" variant="h5">
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="name"
                label="Username"
                name="name"
                autoComplete="name"
                autoFocus
                value={user.name}

                onChange={onChange}
              />
              <TextField
                margin="normal"
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={user.pass}
                onChange={onChange}
              />
              
              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                loading={load}
              >
                Login
              </LoadingButton>
              <Grid container>
                <Grid item xs>
                  <Link href="/forgotpass" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}