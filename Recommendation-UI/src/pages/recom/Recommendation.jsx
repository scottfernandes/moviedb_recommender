import React, { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Box, Button, CssBaseline, Typography } from "@mui/material";
import "./recom.css";
import MovieCard from "../../components/MovieCard";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { TextField } from "@mui/material";
import CastCard from "../../components/CastCard";
import MovieDetail from "../../components/MovieDetail";
import Youtube from "react-youtube";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import StarBorderSharpIcon from '@mui/icons-material/StarBorderSharp';
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { ClipLoader } from "react-spinners";
import { motion } from "framer-motion";

export default function Recommendation() {
  const navigate = useNavigate();
  const { movieName: selectedMovie } = useParams();

  const defaultTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });
  
  const [expandedReviews, setExpandedReviews] = useState([]);

  const toggleExpansion = (index) => {
    const newExpandedReviews = [...expandedReviews];
    newExpandedReviews[index] = !newExpandedReviews[index];
    setExpandedReviews(newExpandedReviews);
  };
  const [input, setInput] = useState("");
  const [movie, setMovie] = useState([]);
  const [poster, setPoster] = useState([]);
  const [details, setDetails] = useState([]);
  const [backdrop, setBackdrop] = useState("");
  const [trailer, setTrailer] = useState("");
  const [name, setName] = useState([]);
  const [char, setChar] = useState([]);
  const [actorposter, setActorposter] = useState([]);
  const [show, setShow] = useState(false);
  const [showForm, setShowForm] = useState(true);
  const [load, setLoad] = useState(false);
  const [review, setReview] = useState([]);
  const[sentiment,setSentiment] = useState([]);
  const [img,setImg]=useState('')
  const handleCastSelection = (castName) => {
    navigate(`/castdetails/${encodeURIComponent(castName)}`);
  };
  const handleMovieSelection = (movieName) => {
    navigate(`/user/recom/${encodeURIComponent(movieName)}`);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/user/recom/${encodeURIComponent(input)}`);
  };
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const cardContainer = document.getElementById('card-container');
    const cardWidth = cardContainer.scrollWidth / 3; // Assuming 3 cards visible at a time
    const newPosition = direction === 'left' ? scrollPosition - cardWidth : scrollPosition + cardWidth;

    cardContainer.scrollTo({
      left: newPosition,
      behavior: 'smooth',
    });

    setScrollPosition(newPosition);
  };
  useEffect(() => {

    if (selectedMovie) {
      setLoad(true)
      if(load){
        setImg('ui//Recommendation-UI//public//Images//moviedb.png')
    
      }
      axios
        .post(
          "http://127.0.0.1:5000/recom",
          { movie_name: selectedMovie },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          console.log(response.data[6])
          setMovie(response.data[0]);
          setPoster(response.data[1]);
          setBackdrop(response.data[2]);
          setDetails(response.data[3]);
          setLoad(true)
          setTrailer(
             response.data[4].find(
              (vid) => vid.name === "Official Trailer" || vid.type === "Trailer"
            )
          );
          setName(response.data[5]['name'])
          setChar(response.data[5]['character'])
          setActorposter(response.data[5]['poster'])
          setLoad(false);
          setReview(response.data[6][0])
          setSentiment(response.data[6][1])
          setShowForm(false);

        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoad(false)
        })
    }
  }, [selectedMovie]);

  
  const showtrailer = () => {
    setShow(true);
  };
  const hide = () => {
    setShow(false);
  };
  const opts = {
    height: "670",
    width: "1545",
  };
  const renderTrailer = () => {
    return <Youtube opts={opts} videoId={trailer.key} />;
  };
  const onChange = (event) => {
    setInput(event.target.value);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body1,
    padding: theme.spacing(2),
    color: theme.palette.text.secondary,
  }));

  return (
    <div className="recommender">

    <ThemeProvider  theme={defaultTheme}>
        <CssBaseline  />
        {showForm && (
          <>
          <div className="headrecom ">
              <div className="recomtitleIcon flex align-center">
              <StarBorderSharpIcon fontSize="large" />
              <h1 className="poppins recomtitle ml-8">MovieDB Recommender</h1>
              </div>
              <p className="recomInfo open-sans ">Add the appropriate movie title and get personalized recommendations.</p>
          </div>
            <div className="ip">
              <Typography variant="h5" fontFamily={'Open Sans'}  mb={"10px"}>Enter a Movie:-</Typography>

              <TextField onChange={onChange} sx={{ width: '50vw' }} />
            </div>
            <Button type="submit"sx={{ mx: "25vw", mt: "1rem" }} variant="contained" color="error" disabled={!input}
              onClick={handleSubmit}>Recommend</Button>
          </>
        )}
         {load ? (
          <div className="overlay">
            <ClipLoader loading={load} ></ClipLoader>
          </div>
         )
           :(
      <>
        {selectedMovie && (
          <>
            <div className="ct">
              <img src={backdrop} className="back" alt="" />
              {show ? (
                <>
                  <div className="yt">{renderTrailer()}</div>
                  <Button color="error" variant="contained" startIcon={<CloseIcon />} onClick={hide}>Close</Button>
                </>
              ) : (
                <div className="det">
                  <MovieDetail src={poster[0]} title={movie[0]} genre={details[0]} overview={details[1]} rels={details[2]}/>

                  <Button startIcon={<PlayCircleIcon />} className="trail" onClick={showtrailer} variant="contained"
                    sx={{ mx: "33rem" }}>Watch Trailer</Button>
                </div>
              )}
            </div>
            <Typography variant="h3" style={{ fontFamily: "Poppins, serif" }} align="center" mt={"10rem"}>
              Top Cast</Typography>

            <div className="casts">
              <Box mx={"15rem"}>
                <Grid container mt={15}   id="castdet"
                  className="cards">

                  {name.map((actor,index)=>(
                    <Grid  key={index}>
                    <CastCard name={actor} img={actorposter[index]} onCastSelect={handleCastSelection}
                      char={char[index]}/>
                  </Grid>
                  ))}
                  
                </Grid>
                <div className="button-container">
        <button onClick={() => handleScroll('left')}>Left</button>
        <button onClick={() => handleScroll('right')}>Right</button>
      </div>
              </Box>
            </div>
            <Typography variant="h3" style={{ fontFamily: "Libre Baskerville, serif" }} align="center" mt={"10rem"}>
              Multiple Matches Found
            </Typography>

            <div className="recoms">
              <Box mx={"15rem"}>
                <Grid container md={15} columnSpacing={2} rowGap={8} rowSpacing={2} justifyContent={"space-around"}
                  className="cards"
                >
                  {movie.map((movies,index)=>(
                    index >0 &&
                      <Grid xs={"auto"} key={index}>
                    <MovieCard Title={movies} onMovieSelect={handleMovieSelection} img = {poster[index]}/>
                  </Grid>
                  ))}
                </Grid>
              </Box>
            </div>

            <Typography variant="h3" style={{ fontFamily: "Libre Baskerville, serif" }} align="center" mt={"10rem"}>
              Reviews
            </Typography>

            <Box sx={{ flexGrow: 1 }}>
      <Grid rowGap={7} m={5} display={'flex'} flexDirection={'column'} alignItems={'center'} >
        
      {review.map((reviewData, index) => (
                      <Grid item xl={8} key={index}>
                        <Item>
                          {/* Use only a portion of the review based on the expanded state */}
                          <Typography>{expandedReviews[index] ? reviewData : reviewData.slice(0, 500)+'....'}</Typography>
                          {reviewData.length > 100 && (
                            <Button onClick={() => toggleExpansion(index)} color="primary">
                              {expandedReviews[index] ? "Read less" : "Read more"}
                            </Button>
                          )}
                          <Typography mt="15px">
                            Sentiment: {sentiment[index]}
                          </Typography>
                          {/* Show "Read more" button only if the review is truncated */}
                          
                        </Item>
                      </Grid>
                    ))}
        </Grid>
    </Box>            
            </> 
        )}
          </>
         )}
    </ThemeProvider>
    </div>

  );
}
