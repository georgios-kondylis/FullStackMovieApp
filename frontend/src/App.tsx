import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/services" element={<div>Services Page</div>} />
        <Route path="/portfolio" element={<div>Portfolio Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
      </Routes>
    </>
  )
}

export default App
