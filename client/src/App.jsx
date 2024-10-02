
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headers from './components/Headers';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Signin from './pages/Signin';
import About from './pages/About';
import Projects from './pages/Projects';
import Dashboard from './pages/Dashboard'
import CustomeFooter from './components/CustomeFooter';

const App = () => {
  return (
    <Router>
      <Headers />
     < Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
      <CustomeFooter/>
      
    </Router>
  )
}

export default App;
