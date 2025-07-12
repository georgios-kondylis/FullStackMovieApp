import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Home, About } from './components/exports'

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/series" element={<About />} />
        <Route path="/anime" element={<div>Services Page</div>} />
        <Route path="/pricing" element={<div>Portfolio Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
      </Routes>
    </>
  )
}

export default App
