import  {React,useEffect,useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button} from '@mui/material';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import './styles/moviecard.css'
import axios from 'axios';
export default function MovieCard({Title,img,onMovieSelect}) {
  const handleRecommendedMovieClick = (movieName) => {
    onMovieSelect(movieName);

  };

  const [saved,setSaved] = useState(false)
  document.addEventListener("DOMContentLoaded", function () {
    const cards = document.querySelectorAll(".card");
  
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.2}s`; // Adjust the delay duration for each card
      card.classList.add("show");
    });
  });
  
const handleSaveClick = async (movieName,movie_poster) => {
  const username = localStorage.getItem('username') 

  
  
  try {
    const response = await axios.post('http://localhost:5000/watchlist', {
    username: username,
    title: movieName,
    poster: movie_poster,
  }).then((response)=>{
    console.log(response.data)
    setSaved(true)
  }
  );
  
   
  } catch (error) {
    console.error('Error saving movie', error);
  }
};

  return (
    <Card className='card show' sx={{height:570,width:325, borderRadius:0 , padding:'0.8rem'}} >
      <img src={img} height={400} width={300} alt="" />

      <div className='btns'>
      <Button variant='contained'  className='getmore' onClick={()=>handleRecommendedMovieClick(Title)} sx={{mt:2}} color='error'>View Details</Button>
        <Button variant='contained' className='getmore' onClick={()=>handleSaveClick(Title,img)} sx={{mt:2,mx:3}}>{saved ? "Saved" : "Save"}</Button>
      </div>

      <CardContent>
        <Box display={'flex'} justifyContent={'space-between'}>
        <Typography  sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            wordWrap: 'break-word',
            maxHeight: '4em', // Adjust the max height based on your design
          }} gutterBottom variant="h5" component="div">
          {Title}         
        </Typography>
        

        </Box>
        
      </CardContent>
      
    </Card>
  );
}
