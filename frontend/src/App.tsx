// App.tsx
import { Routes, Route, useLocation } from 'react-router-dom'
import { Home, Series, Loader, Navbar4Kids, MovieDetails, Navbar, Anime, SignUp } from './components/exports'
import { useState } from 'react'

const App = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    isGuest: false,
    profiles: [], // later use this to add profiles like Netflix
  });
  
  const location = useLocation();

  return (
    <>
      {/* <Loader /> */}
      {!user?.isGuest && <SignUp setUser={setUser} />}
      {/* {location.pathname === '/4kids' ? <Navbar4Kids /> : <Navbar />} */}
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<MovieDetails />} />        {/*  for movies (e.g. /123) */}
        <Route path="/series/:id" element={<MovieDetails />} />  {/* for series (e.g. /series/456) */}
        <Route path="/anime/:id" element={<MovieDetails />} /> 
        <Route path="/series" element={<Series />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/pricing" element={<div>Portfolio Page</div>} />
      </Routes>

    </>
  )
}

export default App
