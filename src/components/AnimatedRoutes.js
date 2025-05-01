import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';
import Notes from '../pages/Notes';
import Weather from '../pages/Weather';
import Quotes from '../pages/Quotes';

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/notes" element={<Notes />} />
        <Route path="/weather" element={<Weather />} />
        <Route path="/quotes" element={<Quotes />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;