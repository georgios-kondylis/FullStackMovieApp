// App.tsx
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Home, Series, Loader } from './components/exports'
import { useLocation } from 'react-router-dom'
import Navbar4Kids from './components/Navbar/Navbar4Kids'
import Anime from './components/Anime/Anime'
import MovieDetails from './components/MovieDetails/MovieDetails'

const App = () => {
  const location = useLocation();
  return (
    <>
      {/* <Loader /> */}
      {location.pathname === '/4kids' ? <Navbar4Kids /> : <Navbar />}
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<MovieDetails />} />        {/*  for movies (e.g. /123) */}
        <Route path="/series/:id" element={<MovieDetails />} />  {/* for series (e.g. /series/456) */}
        <Route path="/series" element={<Series />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/pricing" element={<div>Portfolio Page</div>} />
      </Routes>

    </>
  )
}

export default App
