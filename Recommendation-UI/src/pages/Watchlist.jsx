import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Box, Card, CssBaseline, Grid } from '@mui/material';
import { Typography } from '@mui/material';
import MovieCard from '../components/MovieCard';

const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  
export default function Watchlist() {
    const [movies,setMovies] = useState([])
    const username = localStorage.getItem('username')
    

    useEffect(()=>{

      if(username){
        axios.get(`http://localhost:5000/watchlist?username=${username}`)
        .then((response)=>{
            console.log(response.data.movies)
            setMovies(response.data.movies)
        })
    }
    },[username])
    
  return (
    <ThemeProvider theme={defaultTheme}>
        <CssBaseline/>
        <Typography variant='h3' style={{ fontFamily: "Libre Baskerville, serif" }} mt={5} align='center'>My Watchlist</Typography>
        <Grid container md={15} mt={5} columnSpacing={2} rowGap={8} rowSpacing={2} justifyContent={"space-evenly"}
                  className="cards"
         >
            {movies.map((movie,index)=>(
                <Grid xs='auto'>
                    <MovieCard key={index}  Title={movie.title} img={movie.poster}/>
                </Grid>
            ))}
        </Grid>
    </ThemeProvider>
  )
}
