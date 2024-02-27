import React, { useContext, useEffect, useState } from "react";
import './userHome.scss'
import { motion } from "framer-motion";
import { Box, Button, CssBaseline, Grid } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import Cards from "../../components/cards/Cards";
import { AuthContext } from "../../auth/Auth";
import axios from "axios";
import MovieCard from "../../components/MovieCard";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";


const defaultTheme = createTheme({
    palette:{
        mode:'dark',
        
    }
  });


  const variants={
    initial:{
      x:-500,
      opacity:0
  },
  animate:{
      x:75,
      opacity:1,
      transition:{
          duration:1,
          staggerChildren:0.2,
      },
  },



  }

  const cardVariants={
    initial:{
      opacity:0
  },
  animate:{
      opacity:1,
      transition:{
          duration:1,
          staggerChildren:0.5,
      },

  },

  whileHover:{
    scale:1.05
  }



  }
export default function UserHome() {

    const [movies,setMovies] =useState([])
    const [posters,setPosters] = useState([])
    const [load,setLoad] = useState(false)

  useEffect(()=>{
    const username = localStorage.getItem('username')
  setLoad(true)
    if (!username) {
      console.error('User not authenticated');
      return;
    }
  
      axios.get(
        `http://localhost:5000/user?username=${username}`,
        
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      ).then((response)=>{
        setLoad(false)
        setMovies(response.data.recommendations)
        setPosters(response.data.posters)
      })
  
    
    
  
  },[])


  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline/>
      {load ? (
        <>
            <div className="loading-overlay">
              <div className="loader">
                <ClipLoader color="black" ></ClipLoader>
              </div>
            </div>
        </>
      ):(
        <>
              <motion.div className="header">
        <motion.div  className="txtcontainer" initial='initial' animate='animate' variants={variants}>
          <motion.p className="welcome" variants={variants}  >
            Welcome to <span className="mdb">MovieDB</span>
          </motion.p>
          <motion.div className="btn" variants={variants} >
             <Link to={'/user/recom'}><motion.button whileTap={{scale:0.9}} class="button-71" role="button">Get Recommendations</motion.button></Link>
             <Link to={'/user/watchlist'}><motion.button whileTap={{scale:0.9}}  class="button-71" role="button">Watchlist</motion.button></Link>

          </motion.div>

        </motion.div>
        <motion.div className="imgcontainer">
          <img className="cine" src="cinema.svg" width={400}></img>
        </motion.div>
  </motion.div>

      <motion.div className="features"  >
        <motion.p className="ft"><span className="line">│</span>Top Picks for you</motion.p>
        <motion.div className="featureCards" variants={cardVariants} initial='initial' animate='animate' >
        <div className="recoms">
              <Box mx={"15rem"}>
                <Grid container md={15} columnSpacing={2} rowGap={8} rowSpacing={2} justifyContent={"space-around"}
                  className="cards"
                >
                  {movies.map((movie,index)=>(
                    index >0 &&
                      <Grid xs={"auto"} key={index}>
                    <MovieCard Title={movie}  img = {posters[index]}/>
                  </Grid>
                  ))}
                </Grid>
              </Box>
            </div> 
        </motion.div>
      </motion.div>
        </>
                 )}
      </ThemeProvider>
    </>
  );
}
