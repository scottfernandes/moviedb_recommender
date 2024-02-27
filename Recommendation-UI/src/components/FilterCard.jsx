import React from 'react'
import MovieCard from './MovieCard'
import { Box, Grid } from '@mui/material'
import { Navigate, useNavigate } from 'react-router-dom';

export default function FilterCard({item}) {
  const navigate = useNavigate()
  const handleMovieSelection = (movieName) => {
    navigate(`/user/recom/${encodeURIComponent(movieName)}`);
  };
  return (
    <div>
        <Box>
            <Grid container sx={{md:5}} rowGap={5} columnGap={5} px={'15vw'}> 
                {item.map((val)=>(
                    <MovieCard  onMovieSelect={()=>handleMovieSelection(val.title)} key={val.id} img={val.posters} Title={val.title}/>

                ))}
            </Grid>
        </Box>
    </div>
  )
}
