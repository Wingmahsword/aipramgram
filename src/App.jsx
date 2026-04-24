import React, { Suspense, lazy } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AppProvider } from './AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const Courses = lazy(() => import('./pages/Courses'));
const Explore = lazy(() => import('./pages/Explore'));
const Creators = lazy(() => import('./pages/Creators'));
const Reels = lazy(() => import('./pages/Reels'));
const Playground = lazy(() => import('./pages/Playground'));
const Profile = lazy(() => import('./pages/Profile'));

const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
  </div>
);

function App() {
  const location = useLocation();
  const isReels = location.pathname === '/reels';

  return (
    <ErrorBoundary>
      <AppProvider>
        <div className="min-h-screen bg-white">
          <Navbar />
          <Suspense fallback={<LoadingFallback />}>
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
          </Suspense>
          {!isReels && <Footer />}
        </div>
      </AppProvider>
    </ErrorBoundary>
  );
}

export default App;
