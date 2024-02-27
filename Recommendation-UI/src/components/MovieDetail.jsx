import React from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper } from '@mui/material';
import './styles/moviedetail.css';
export default function MovieDetail({src,title,genre,overview,rels}) {

    const defaultTheme = createTheme({
        palette:{
            mode:'dark',
            
        }
      });


  return (
    <div>
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline/>
        <Box>
            <Grid container mt={8}  >
                <Grid xs={'auto'} mx={15}  >
                   <img  src={src} id='movp' className='cast' height={400} alt="" />
                </Grid>
                <Grid xs={7} >
                    <Paper  elevation={0} sx={{padding:2, bgcolor:'transparent'}}>
                        <Typography variant='h4' style={{'fontFamily':'Libre Baskerville, serif'}}> {title}</Typography> <br />
                        <Typography className='bio' variant='body1'>Synopsis: {overview}</Typography> <br />
                        <Typography variant='h5'>Genre: {genre}</Typography> <br />
                        <Typography variant='h5'>Release Date: {rels}</Typography> <br />

                    </Paper>
                   

                </Grid>
            </Grid>
            
            
        </Box>
        </ThemeProvider>
    </div>
  )
}
