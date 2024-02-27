import React, { useState,useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Paper } from '@mui/material';
import MovieCard from '../components/MovieCard';
import './styles/castdetails.css'
import axios from 'axios';
import {ClipLoader} from "react-spinners"

import { useNavigate, useParams } from 'react-router-dom';
export default function CastDetails() {
  const navigate = useNavigate()
    const defaultTheme = createTheme({
        palette:{
            mode:'dark',
        }
      });
      const {castName:selectedcast} = useParams();

      const [bio,setBio] = useState('')
      const [name,setName] = useState('')
      const [dob,setDob] = useState('')
      const [pob,setPob] = useState('')
      const [title,setTitle] = useState([])
      const [movposter,setMovieposter]= useState([])
      const [ actorposter,setActorposter] = useState('')
      const [load,setLoad] = useState(false)

      const handleMovieSelection = (movieName) => {
        setLoad(false)
        navigate(`/recom/${encodeURIComponent(movieName)}`);
      };

      useEffect(() => {
        if(selectedcast){
          setLoad(true)
            axios
              .post(
                "http://127.0.0.1:5000/castdetails",
                 {'castname':selectedcast} ,
                {
                  headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Content-Type":'application/json'
                  },
                }
              )
              .then((response) => {
                console.log(response.data)
                setBio(response.data['bio'])
                setName(response.data['name'])
                setDob(response.data['dob'])
                setPob(response.data['pob'])
                setActorposter(response.data['actor_poster'])
                setTitle(response.data['movies'])
                setMovieposter(response.data['movie_poster'])
                setLoad(false)
  
                
              })
              .catch((error) => {
                console.error("Error fetching data:", error);
              });
          }
  }, [selectedcast]);

  return (
    <div>
        <ThemeProvider theme={defaultTheme}>
        <CssBaseline/>
        {load ? (
          <>
          <div className="loading-overlay">
                <div className="loading-spinner">
               <ClipLoader color="black" loading={load} size={150} />
             </div>
               </div>
          </>
        ):(
        <Box>
            <Typography variant='h2' align='center' mt={5} >Cast Details</Typography>
            <Grid container mt={8}  >
                <Grid xs={'auto'} mx={15}  >
                   <img  src={actorposter} className='cast' height={400} alt="" />
                </Grid>
                <Grid xs={7} >
                    <Paper elevation={2} sx={{padding:4, mt:7}}>
                        <Typography variant='h5'>Name: {name}</Typography> <br />
                        <Typography variant='h5'>Place of Birth: {pob}</Typography> <br />
                        <Typography variant='h5'>Date of Birth: {dob}</Typography> <br />

                    </Paper>
                   

                </Grid>
            </Grid>
            <Typography variant='h4' style={{'fontFamily':'Libre Baskerville, serif'}} align='center' mt={'10rem'} >Biography</Typography>
            <Paper elevation={2} sx={{m:15,p:3}}>
                <Typography variant='body1'  lineHeight={'2.1rem'}>{bio}</Typography> <br />


            </Paper>           

            <Typography variant='h4' style={{'fontFamily':'Libre Baskerville, serif'}} align='center' mt={'10rem'} >Recommended Movies of {name}</Typography>

            <Box mx={'15rem' } >
                <Grid container md={12} mt={15} justifyContent={'space-around'} >
                    <Grid xs={'auto'}>
                        <MovieCard img={movposter[0]} onMovieSelect={handleMovieSelection} Title={title[0]} />
                    </Grid>
                    <Grid xs={'auto'}>
                        <MovieCard img={movposter[1]} onMovieSelect={handleMovieSelection} Title={title[1]} />                    
                    </Grid>                
                    <Grid xs={'auto'}>
                        <MovieCard img={movposter[2]} onMovieSelect={handleMovieSelection} Title={title[2]} />                    
                    </Grid>
                </Grid>
            </Box>
            
        </Box>)}
        </ThemeProvider>
    </div>

  )
}
