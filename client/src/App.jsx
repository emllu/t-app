
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
import PrivateRoutes from './components/PrivateRoutes'
import IsOnlyAdminRoutes from './components/IsOnlyAdminRoutes';
import CreatePost from './components/CreatePost';
const App = () => {
  return (
    <Router>
      <Headers />
     < Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        <Route path='/about' element={<About />} />
        {/* <Route element={<IsOnlyAdminRoutes/>}> */}
        <Route path='/create-post' element={<CreatePost />} />
        {/* </Route> */}
        <Route element={<PrivateRoutes/>}>
        <Route path='/dashboard' element={<Dashboard />} />
        </Route>
       
        <Route path='/projects' element={<Projects />} />
       
      </Routes>
      <CustomeFooter/>
      
    </Router>
  )
}

export default App;
