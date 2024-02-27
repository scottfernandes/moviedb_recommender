import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Box, FormControl, FormLabel } from '@mui/material';
import axios from 'axios';

export default function AccordionForm() {
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
  ];

  const [selectedOptions, setSelectedOptions] = React.useState([]);

  const submitPreferences = () => {
    axios.post('http://localhost:5000/preferences', { selectedOptions },{
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(() => {
        console.log(selectedOptions);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <Box component={'form'} noValidate onSubmit={submitPreferences}>
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
              <FormControl>
                <FormLabel id={`demo-row-radio-buttons-group-label-${index}`} sx={{ color: 'white' }}>{qs_op.question}</FormLabel>
                <div className="opts mt-15">
                  <RadioGroup
                    row
                    aria-labelledby={`demo-row-radio-buttons-group-label-${index}`}
                    name={`row-radio-buttons-group-${index}`}
                    value={selectedOptions[index]}
                    onChange={(e) => {
                      const newOptions = [...selectedOptions];
                      newOptions[index] = e.target.value;
                      setSelectedOptions(newOptions);
                    }}
                  >
                    <FormControlLabel value='option1' name='options1'  required control={<Radio />} label={qs_op.option1} />
                    <FormControlLabel value='option2' name='options2'  required control={<Radio />} label={qs_op.option2} />
                  </RadioGroup>
                </div>
              </FormControl>
            </AccordionDetails>
          </Accordion>
        ))}
        <Button type='submit' color='error' variant='contained' sx={{ mt: 5 }}>Submit</Button>
        </Box>
    </div>
  );
}
