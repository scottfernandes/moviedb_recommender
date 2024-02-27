import * as React from "react";
import './home.scss'
import { motion } from "framer-motion";
import { Button, CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material";
import Cards from "../../components/cards/Cards";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
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
          staggerChildren:1,
      },

  },

  whileHover:{
    scale:1.05
  }



  }
export default function Home() {
  const settings = {
      arrows:true,
      slidesToShow: 2,
      afterChange: function(index) {
        console.log(
          `Slider Changed to: ${index + 1}, background: #222; color: #bada55`
        );
      }
    };
  

  const info =[{
    Title:'Recommendations',
    image:'https://editor.analyticsvidhya.com/uploads/76889recommender-system-for-movie-recommendation.jpg',
    content:'Users can get movie recommendations based on their watchlist, genre, cast, and many more..'
  },{
    Title:'Sentiment Analysis',
    image:'https://cdn.analyticsvidhya.com/wp-content/uploads/2022/02/Sentiment-Analysis.png',
    content:'Movie reviews are marked as positive and negative to give an overview of what the users feel about the movie.'
  },{
    Title:'Filtering',
    image:'https://static.gosquared.com/images/liquidicity/19_09_26_Filtering_users_and_customers/19_09_26_People_Funnel_01@2x.png',
    content:'Movies can be filtered according to your needs and requirements.'
  },
  {
    Title:'Filtering',
    image:'https://static.gosquared.com/images/liquidicity/19_09_26_Filtering_users_and_customers/19_09_26_People_Funnel_01@2x.png',
    content:'Movies can be filtered according to your needs and requirements.'
  },
  {
    Title:'Filtering',
    image:'https://static.gosquared.com/images/liquidicity/19_09_26_Filtering_users_and_customers/19_09_26_People_Funnel_01@2x.png',
    content:'Movies can be filtered according to your needs and requirements.'
  },
  {
    Title:'Filtering',
    image:'https://static.gosquared.com/images/liquidicity/19_09_26_Filtering_users_and_customers/19_09_26_People_Funnel_01@2x.png',
    content:'Movies can be filtered according to your needs and requirements.'
  },

  ]



  
  return (
    <>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline/>
      <motion.div className="header">
        <motion.div  className="txtcontainer" initial='initial' animate='animate' variants={variants}>
          <motion.p className="welcome" variants={variants}  >
            Welcome to <span className="mdb">MovieDB</span>
          </motion.p>
          <motion.div className="btn" variants={variants} >
             <Link to={'/signup'}><motion.button whileTap={{scale:0.9}} class="button-71" role="button">Get Started</motion.button></Link>
              <motion.button whileTap={{scale:0.9}}  class="button-71" role="button">About Us</motion.button>

          </motion.div>

        </motion.div>
      <motion.div className="imgcontainer">
          <img className="cine" src="cinema.svg" width={400}></img>
        </motion.div>
  </motion.div>

      <motion.div className="features" >
        <motion.p className="ft"><span className="line">│</span> Our Features</motion.p>
        <Slider {...settings}>

        <motion.div className="featureCards ">
           {info.map((crd)=>(

                            <Cards Title={crd.Title} image={crd.image} content={crd.content}/>

           ))}
            </motion.div>
            </Slider>


      </motion.div>
      </ThemeProvider>
    </>
  );
}
