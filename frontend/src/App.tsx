import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Home, Series, Loader } from './components/exports'
import { useLocation } from 'react-router-dom'
import Navbar4Kids from './components/Navbar/Navbar4Kids'
import Anime from './components/Anime/Anime'

const App = () => {
  const location = useLocation();
  return (
    <>
      {/* <Loader /> */}
      {location.pathname === '/4kids' ? <Navbar4Kids /> : <Navbar />}
    
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/series" element={<Series />} />
        <Route path="/anime" element={<Anime />} />
        <Route path="/pricing" element={<div>Portfolio Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
      </Routes>
    </>
  )
}

export default App
