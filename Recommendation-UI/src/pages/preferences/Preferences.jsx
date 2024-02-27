import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react'
import './preferences.scss'
import { Button, CssBaseline, createTheme } from '@mui/material'
import { ThemeProvider } from '@emotion/react'
import axios from 'axios'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AuthContext } from '../../auth/Auth'
import { useNavigate } from 'react-router-dom'

export default function Preferences() {

  const navigate = useNavigate()

    const defaultTheme = createTheme({
        palette: {
          mode: "dark",
        },
      });

      const variants={
        initial:{
          x:-500,
          opacity:0
      },
      animate:{
          x:30,
          opacity:1,
          transition:{
              duration:1,
              staggerChildren:0.2,
          },
      }
    }


      const formVariants={
        initial:{
            x:-500,
            opacity:0
        },
        animate:{
            x:300,
            opacity:1,
            transition:{
                duration:0.5,
                staggerChildren:0.2,
            },
        }
      }

    const [go,setGo] = useState(null)
    const [prefdone,setPrefDone] = useState(null)
    const [selectedOptions, setSelectedOptions] = useState([{}]);

  const handleRadioChange = (event, index) => {
    const { value } = event.target;

    // Update the selected options list
    const updatedOptions = [...selectedOptions];
    updatedOptions[index] = value;
    setSelectedOptions(updatedOptions);
  };
  const { user } = useContext(AuthContext); 


  const submitPreferences = async (e) => {
    e.preventDefault();
  
    const username = user ? user.username : null;
  
    if (!username) {
      console.error('User not authenticated');
      return;
    }
  
    try {
      const response = await axios.post(
        'http://localhost:5000/preferences',
        { username: username, selectedOptions: selectedOptions },
        {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response.data);
      setPrefDone(true)
      setGo(false)
    } catch (error) {
      console.error(error);
    }
  };

    const questions_options = [
      {
        "question": "Do you prefer reading fiction or non-fiction books? ",
        "option1": "Imaginative",
        "option2": "Analytical"
      },
      {
        "question": "In a social setting, do you prefer being the center of attention or having one-on-one conversations in a quieter space?",
        "option1": "Introverted",
        "option2": "Extroverted"
      },
      {
        "question": "In a vacation, would you prefer an adventurous trek in the mountains or a relaxing beach resort?",
        "option1": "Adventure Seeker",
        "option2": "Prefer Comfort Zone "
      },
      {
        "question": "How comfortable are you with adopting new technologies?",
        "option1": "Comfortable with and interested in new technologies.",
        "option2": "Prefers traditional or less tech-dependent approaches."
      },
      {
        "question":"Are you more productive and energetic in the morning or at night?",
        "option1":"Morning Person",
        "option2":"Night Owl"
      },
      {
        "question":"Do you prefer cooking meals at home or dining out at restaurants?",
        "option1":"Cooking Meals at Home",
        "option2":"Dining Out"
      },
    ];


    
  return (
    <div>
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline/>
       {!go && !prefdone &&
        <motion.div className="p1" variants={variants} initial='initial'  animate='animate'>
        <motion.div className="prompt" variants={variants}>
        <motion.h1 className='poppins' variants={variants}>Before you move on to getting recommendations, we would like you to answer a few questions.</motion.h1>
        </motion.div>
        <motion.button className='letsgo open-sans' onClick={()=>(setGo(true))}  whileTap={{scale:0.8}} variants={variants} whileHover={{scale:1.1}}>Let's Go &#8594;</motion.button>

    </motion.div>
}
        {go &&
                <motion.div className='forms' variants={formVariants} initial='initial' animate='animate'>
                    <motion.h1 className='poppins'>Kindly Fill up this Form</motion.h1>
                    <motion.p className='open-sans why'>It will help us to get to know you more and provide more personalized recommendations.</motion.p>

                    <motion.div className='f1 flex align-center' >
                        <motion.form onSubmit={submitPreferences}>
                          
                            {questions_options.map((qs_op, index) => (
                              <Accordion key={index}>
                                <AccordionSummary
                                  expandIcon={<ExpandMoreIcon />}
                                  aria-controls={`panel${index + 1}-content`}
                                  id={`panel${index + 1}-header`}
                                >
                                  Question {index + 1}
                                </AccordionSummary>
                                <AccordionDetails>
                                    <label className='lb' htmlFor={`qs${index}`} >{qs_op.question}</label>
                                    <div className="opts mt-15">
                                        <input type="radio" id={`qs${index}-option1`}  value={qs_op.option1} name={`opts${index}`}               onChange={(event) => handleRadioChange(event, index)}
/> 
                                        <span className='op'>{qs_op.option1}</span>
                                        <input type="radio" id={`qs${index}-option2`} value={qs_op.option2} name={`opts${index}`}               onChange={(event) => handleRadioChange(event, index)}/>
                                         <span className='op'>{qs_op.option2}</span>
                                    </div>
                                </AccordionDetails>
                              </Accordion>
                          ))}
                          <Button type='submit' color='error' variant='contained' sx={{mt:5}}>Submit</Button>
                        </motion.form>
                    </motion.div>

                    </motion.div>

        }

        {prefdone && 
         <motion.div className="p1" variants={variants} initial='initial'  animate='animate'>
         <motion.div className="prompt" variants={variants}>
         <motion.h1 className='poppins' variants={variants}>Thank you for filling this form. We hope you enjoy our movie recommendations</motion.h1>
         </motion.div>
         <motion.button className='letsgo open-sans' onClick={()=>(navigate('/user'))}  whileTap={{scale:0.8}} variants={variants} whileHover={{scale:1.1}}>Go to Home &#8594;</motion.button>
         </motion.div>
        }



         </ThemeProvider>
    </div>
  )
}
