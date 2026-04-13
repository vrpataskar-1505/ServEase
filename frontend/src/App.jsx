import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

import Navbar    from './components/Navbar';
import Footer    from './components/Footer';
import Home      from './pages/Home';
import Services  from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import BookingPage   from './pages/BookingPage';
import MyBookings    from './pages/MyBookings';
import Login     from './pages/Login';
import Register  from './pages/Register';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1 page-enter">
            <Routes>
              <Route path="/"                    element={<Home />} />
              <Route path="/services"            element={<Services />} />
              <Route path="/services/:id"        element={<ServiceDetail />} />
              <Route path="/book/:serviceId"     element={<BookingPage />} />
              <Route path="/my-bookings"         element={<MyBookings />} />
              <Route path="/login"               element={<Login />} />
              <Route path="/register"            element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
