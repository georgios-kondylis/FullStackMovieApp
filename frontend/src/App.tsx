import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { Home, Series, Loader, Navbar4Kids, MovieDetails, Navbar, Anime, SignUp, SignIn, Profiles, useGlobalProps, CreateProfile, ViewProfile, EditProfile } from './components/exports'
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
      {location.pathname === '/4kids' ? <Navbar4Kids /> : 
      ['/profiles', '/sign-in', '/sign-up', '/profiles/createProfile', '/viewProfile'].includes(location.pathname) ? '' : <Navbar />}
      <Loader /> {/* HERE AND IN THE SIGN IN IS NEEDED */}
    
      <Routes>
        <Route path="/sign-in" element={<SignIn setUser={setUser} user={user} />} />
        <Route path="/sign-up" element={<SignUp setUser={setUser} user={user} />} />
        <Route path="/profiles" element={<Profiles />} />
        <Route path="/profiles/createProfile" element={<CreateProfile />} />
        <Route path="/profiles/editProfile" element={<EditProfile />} />

        <Route path="/viewProfile" element={<ViewProfile />} />

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
