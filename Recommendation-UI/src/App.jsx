import './App.css'
import React, { useState } from 'react'
import Login from './pages/Login'
import Navbar from './components/Navbar'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import  { BrowserRouter,Navigate,Route, Routes } from 'react-router-dom'
import CssBaseline from "@mui/material/CssBaseline";

import CastDetails from './pages/CastDetails'
import Recommendation from './pages/recom/Recommendation'
import MovieDetail from './components/MovieDetail'
import MovieFilter from './components/MovieFilter'
import Signup from './pages/Signup'
import Home from './pages/home/Home';

import Watchlist from './pages/Watchlist';
import Contact from './pages/Contact';
import ForgotPass from './components/ForgotPass';
import ChangePass from './components/ChangePass';
import UserHome from './pages/userHome/UserHome';
import Preferences from './pages/preferences/preferences';
import { AuthProvider, useAuth } from './auth/Auth';
import Swiper from './components/swiper/SwiperCard';


function App() {


 
  

  return (
    <>

<AuthProvider>

      <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route>
          <Route path='/forgotpass' element={<ForgotPass/>}></Route>
          <Route path='/changePass' element={<ChangePass/>}></Route>
          <Route path='/user' element={<UserHome/>}></Route>

          <Route path="/user" element={<UserHome />} />
          <Route path="/user/recom" element={<Recommendation />} />
          <Route path="/user/recom/:movieName" element={<Recommendation />} />
          <Route path="/castdetails" element={<CastDetails />} />
          <Route path="/castdetails/:castName" element={<CastDetails />} />
          <Route path="/user/watchlist" element={<Watchlist />} />
          <Route path="/user/preferences" element={<Preferences />} />

          <Route path='/user/recom/:movieName' element={<Recommendation/>}></Route>
          <Route path='/castdetails' element={<CastDetails/>}></Route>
          <Route path='/castdetails/:castName' element={<CastDetails/>}></Route>
          <Route path='/user/watchlist' element={<Watchlist/>}></Route>
          <Route path='/swiper' element={<Swiper/>}></Route>
          <Route path='/user/preferences' element={<Preferences/>}></Route>
        </Routes>

      </BrowserRouter>
       </div>
                 </AuthProvider>

       </>

    
  )
}

export default App


