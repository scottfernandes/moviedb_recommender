import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import InfoIcon from '@mui/icons-material/Info';
import ListItemText from '@mui/material/ListItemText';
import QueueIcon from '@mui/icons-material/Queue';
import LoginIcon from '@mui/icons-material/Login';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import axios from 'axios';
const drawerWidth = 240;
const defaultTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0, // Set initial marginLeft to 0
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: `${drawerWidth}px`, // Adjust marginLeft when the drawer is open
    }),
  }),
);

  



const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, scrolled }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  ...(scrolled && {
    transform: 'translateY(-100%)',
    transition: theme.transitions.create(['transform'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Navbar() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const handleLogout = () => {
      // Send a GET request to the /logout endpoint using Axios
      axios.get('http://localhost:5000/logout')
      .then((response)=>{
        console.log(response.data)
        localStorage.removeItem('Logged_In')
        window.location.href='/login'
      })
      .catch((error)=>{
        console.log(error)
      });
  
     

  };
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    let timeoutId;
  
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
  
    const debouncedHandleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleScroll, 10); // Adjust the delay here (in milliseconds)
    };
  
    window.addEventListener('scroll', debouncedHandleScroll);
  
    return () => {
      window.removeEventListener('scroll', debouncedHandleScroll);
    };
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
          <AppBar sx={{ bgcolor: '#c51828' }} position='fixed'  open={open} scrolled={scrolled}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{ ...(open && { display: 'none' }) }}
              >
                <MenuIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader sx={{pt:2}}>
          <img src=".\Images\moviedb.png" alt="" height={50} style={{marginRight:35}}/>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </DrawerHeader>
          <Divider sx={{mt:2}}/>
          <List>
          <Link sx={{textDecoration:'none', color:'white'}} href={localStorage.getItem('Logged_In') ? '/user/recom':'/signup'}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{localStorage.getItem('Logged_In')?<FeaturedVideoIcon/>:<AccountCircleIcon/>}</ListItemIcon>
             <ListItemText primary={localStorage.getItem('Logged_In') ? 'Recommender':'Sign Up'} />
            </ListItemButton>
          </ListItem>
          </Link>

          <Link sx={{textDecoration:'none', color:'white'}} href={localStorage.getItem('Logged_In') ? '/user/watchlist':'/login'}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>{localStorage.getItem('Logged_In')?<QueueIcon/>:<LoginIcon/>}</ListItemIcon>
             <ListItemText primary={localStorage.getItem('Logged_In') ? 'View Watchlist':'Login'} />
            </ListItemButton>
          </ListItem>
          </Link>

        
          </List>
          <Divider />
          <List>
          <Link sx={{textDecoration:'none', color:'white'}} href={localStorage.getItem('Logged_In') ? '/user':'/'}>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><HomeIcon/></ListItemIcon>
             <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>
          </Link>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><InfoIcon/></ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
          <Link sx={{textDecoration:'none', color:'white'}} href='/contact'>

          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon><ContactPageIcon/></ListItemIcon>
             <ListItemText primary="Contact Us" />
            </ListItemButton>
          </ListItem>
          </Link>
          </List>
        {localStorage.getItem('Logged_In')&&
          <Link  sx={{textDecoration:'none', color:'white'}}>

          <ListItem disablePadding>
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon><LogoutIcon/></ListItemIcon>
             <ListItemText primary="Logout" />
            </ListItemButton>
          </ListItem>
          </Link>
        }
        </Drawer>
        <Main open={open}>
          <DrawerHeader />
        </Main>
      </Box>
    </ThemeProvider>
  );
}
