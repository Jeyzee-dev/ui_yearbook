import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AlumniProvider } from './contexts/AlumniContext';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import About from './components/About/About';
import Features from './components/Features/Features';
import Contact from './components/Contact/Contact';
import Footer from './components/Footer/Footer';
import AdminSidebar from './pages/AdminSidebar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AlumniDashboard from './pages/AlumniDashboard';
import AlumniDirectoryPage from './pages/AlumniDirectoryPage';
import AlumniProfilePage from './pages/AlumniProfilePage';
import MessagingPage from './pages/MessagingPage';
import EventsPage from './pages/EventsPage';
import NewsPage from './pages/NewsPage';
import './App.css';

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Features />
      <Contact />
      <Footer />
    </>
  );
};

const AlumniPortal = () => {
  return (
    <AlumniProvider>
      <Routes>
        <Route path="/dashboard" element={<AlumniDashboard />} />
        <Route path="/directory" element={<AlumniDirectoryPage />} />
        <Route path="/profile" element={<AlumniProfilePage />} />
        <Route path="/messaging" element={<MessagingPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/" element={<AlumniDashboard />} />
      </Routes>
    </AlumniProvider>
  );
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin/*" element={<AdminSidebar />} />
          <Route path="/alumni/*" element={<AlumniPortal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;