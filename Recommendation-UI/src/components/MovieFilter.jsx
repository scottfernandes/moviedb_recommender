import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Data from './Data';
import FilterCard from './FilterCard';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';

const MovieFilter = () => {
  const [items, setItems] = useState([]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedRuntimes, setSelectedRuntimes] = useState([]);
  const defaultTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  useEffect(() => {
    // Extract all genres from Data and create a unique set of genres
    const allGenres = Data.flatMap((item) => item.genres.split(', '));
    const uniqueGenres = [...new Set(allGenres)];
    setGenres(uniqueGenres);
  }, []);

  const filterData = () => {
    const filteredData = Data.filter((newval) => {
      const isRuntimeMatch =
        selectedRuntimes.length === 0 || selectedRuntimes.includes(getRuntimeCategory(newval.runtime));

      const isGenresMatch =
        selectedGenres.length === 0 || selectedGenres.some((genre) => newval.genres.includes(genre));

      return isRuntimeMatch && isGenresMatch;
    });

    // Shuffle the filtered data and then slice to show only the first 12 items
    const shuffledData = shuffleArray(filteredData).slice(0, 6);
    setItems(shuffledData);
  };

  const getRuntimeCategory = (runtime) => {
    if (runtime < 60) {
      return 'Below 1hr';
    } else if (runtime >= 60 && runtime <= 120) {
      return '1hr - 2hr';
    } else {
      return 'Above 2hr';
    }
  };

  // Function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  useEffect(() => {
    filterData(); // Call filterData initially to load the data
  }, [selectedRuntimes, selectedGenres]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box display={'flex'} justifyContent={'space-around'} >
        <Box mt={5}>
          <Typography variant='body1'>Select Runtime</Typography>
          <Select
            multiple
            value={selectedRuntimes}
            onChange={(e) => setSelectedRuntimes(e.target.value)}
            style={{ minWidth: '15vw',minHeight:'2vh' }}
          >
            <MenuItem value={'Below 1hr'}>
              <Checkbox checked={selectedRuntimes.includes('Below 1hr')} />
              Below 1hr
            </MenuItem>
            <MenuItem value={'1hr - 2hr'}>
              <Checkbox checked={selectedRuntimes.includes('1hr - 2hr')} />
              1hr - 2hr
            </MenuItem>
            <MenuItem value={'Above 2hr'}>
              <Checkbox checked={selectedRuntimes.includes('Above 2hr')} />
              Above 2hr
            </MenuItem>
          </Select>
        </Box>
        <Box mt={5}>
          <Typography variant='body1'>Select Genre:</Typography>
          <Select
            multiple
            value={selectedGenres}
            onChange={(e) => setSelectedGenres(e.target.value)}
            style={{ minWidth: '15vw' }}
          >
            {genres.map((genre) => (
              <MenuItem key={genre} value={genre}>
                <Checkbox checked={selectedGenres.includes(genre)} />
                {genre}
              </MenuItem>
            ))}
          </Select>
        </Box>
        
      </Box>
      <Box mt={15}>
          <FilterCard item={items}></FilterCard>
        </Box>
    </ThemeProvider>
  );
};

export default MovieFilter;
