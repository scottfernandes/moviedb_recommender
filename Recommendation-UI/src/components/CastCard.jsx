import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Box, Button} from '@mui/material';

export default function CastCard({img,name,char,onCastSelect}) {

    const showCastDetails = (castName) =>{
        onCastSelect(castName)
      }
  return (
    <div>
    <Card sx={{height:600, borderRadius:0 , width:325, padding:'0.8rem'}} >
      <img src={img} height={400} width={300} alt="" />
      <CardContent>
        <Box display={'flex'} justifyContent={'space-between'}>
        <Typography 
         sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            wordWrap: 'break-word',
            maxHeight: '4em', // Adjust the max height based on your design
          }}
           gutterBottom variant="h5" component="div">
          {name} as  {char}         
        </Typography>
        </Box>
        <Button variant='outlined' onClick={()=>showCastDetails(name)} sx={{mt:2}} color='error'>Know More</Button>

      </CardContent>
      
    </Card>
    </div>
  )
}
