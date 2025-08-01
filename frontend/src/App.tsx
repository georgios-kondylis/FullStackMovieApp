import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Home, Series, Loader, Navbar4Kids, MovieDetails, Navbar, Anime, SignUp, SignIn, Profiles, useGlobalProps } from './components/exports'
import { useEffect, useState } from 'react'

const App = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {user, setUser} = useGlobalProps();

  useEffect(() => {
    const isUserEmpty = user.firstName === '';
    const isAuthPage = location.pathname === '/sign-in' || location.pathname === '/sign-up';
  
    if (isUserEmpty && !isAuthPage) {
      navigate('/sign-in');
    }
  }, [user, location.pathname, navigate]);
  
  

  return (
    <>
      {/* <Loader /> */}
      {location.pathname === '/4kids' ? <Navbar4Kids /> : 
      location.pathname === '/profiles' || '/sign-in' || '/sign-up' ? '' : <Navbar />}
    
      <Routes>
        <Route path="/sign-in" element={<SignIn setUser={setUser} user={user} />} />
        <Route path="/sign-up" element={<SignUp setUser={setUser} user={user} />} />
        <Route path="/profiles" element={<Profiles />} />

        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<MovieDetails />} />        {/*  for movies (e.g. /123) */}
        <Route path="/series/:id" element={<MovieDetails />} />  {/* for series (e.g. /series/456) */}
        <Route path="/anime/:id" element={<MovieDetails />} /> 
        <Route path="/series" element={<Series />} />
        <Route path="/anime" element={<Anime />} />
      </Routes>
    </>
  );
};

export default App;
