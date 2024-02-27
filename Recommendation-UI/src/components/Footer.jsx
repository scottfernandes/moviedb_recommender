import React from 'react';
import { Container, Grid, Typography, Link } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';

const socialMediaLinks = [
  { name: 'Facebook', icon: <FacebookIcon />, url: 'https://www.facebook.com/' },
  { name: 'Twitter', icon: <TwitterIcon />, url: 'https://twitter.com/' },
  { name: 'Instagram', icon: <InstagramIcon />, url: 'https://www.instagram.com/' },
];

const Footer = () => {
  return (
    <footer  style={{ backgroundColor: '#333', color: '#fff', padding: '40px 0' ,marginTop:'25vh'}}>
      <Container>
        <Grid container spacing={5}>
          {/* First Column */}
          <Grid item xs={12} md={4}>
          <img src="./Images/moviedb.png" alt="" height={80} style={{marginBottom:20}} />
            <Typography variant="h6">Always here to make your <br /> movietime enjoyable.</Typography>

          </Grid>
          
          {/* Second Column */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={'bold'}>Quick Links</Typography>
            <Typography pt={2} variant="body1">Home</Typography>
            <Typography pt={1} variant="body1">About Us</Typography>
            <Typography pt={1} variant="body1">Contact Us</Typography>
          </Grid>
          
          {/* Third Column with Social Media Links */}
          <Grid item xs={12} md={4}>
            <Typography variant="h5" fontWeight={'bold'} mx={0.1}>Follow Us</Typography>
            <Grid container mt={1} spacing={1}>
              {socialMediaLinks.map((socialMedia) => (
                <Grid item key={socialMedia.name}>
                  <Link
                    href={socialMedia.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    color="inherit"
                    style={{ marginRight: '10px' }} // Adjust the marginRight for spacing
                  >
                    {socialMedia.icon}
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
  <Typography variant="body2" align="center" style={{ marginTop: '35px' }}>
    &copy; 2023 MovieDB. All rights reserved.
  </Typography>
</Grid>
      </Container>
    </footer>
  );
};

export default Footer;
