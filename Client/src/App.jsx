import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthenticationCheck from './RouteHandling/AuthenticationCheck';
import Login from '../src/pages/Login';
import Register from './pages/Register';
import Navbar from './components/ui/Navbar';
import Home from '../src/pages/Home';
import Accommodation from './pages/Accomodation';
import Details from './pages/Details';
import Footer from './components/ui/Footer';
import AboutUs from './pages/AboutUs';
const App = () => {
  return (
    <Router>
      <AuthenticationCheck>
        <Navbar />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/about-us" element={<AboutUs />} />
          
          {/* Protected Routes */}
          <Route path="/event-details/:eventId" element={<Details />} />
          {/* <Route path="/event-registration/:eventId" element={<EventRegistration />} /> */}
          

          <Route path="*" element={<Home />} />
        </Routes>
        <Footer />
      </AuthenticationCheck>
    </Router>
  );
};

export default App;