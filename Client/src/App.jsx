import React from 'react'
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import Login from '../src/pages/Login';
import Register from './pages/Register';
import Navbar from './components/ui/Navbar';
import Home from '../src/pages/Home';
import Accommodation from './pages/Accomodation';
import Details from './pages/Details';
import Footer from './components/ui/Footer';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event-details/:eventId" element={<Details />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;