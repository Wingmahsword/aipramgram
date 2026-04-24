import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import Explore from './pages/Explore';
import Creators from './pages/Creators';
import Reels from './pages/Reels';
import Playground from './pages/Playground';
import Profile from './pages/Profile';

function App() {
  const location = useLocation();
  const isReels = location.pathname === '/reels';

  return (
    <AppProvider>
      <div className="min-h-screen bg-white">
        <Navbar />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/creators" element={<Creators />} />
            <Route path="/reels" element={<Reels />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </AnimatePresence>
        {!isReels && <Footer />}
      </div>
    </AppProvider>
  );
}

export default App;
