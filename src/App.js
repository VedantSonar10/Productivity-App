import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import Notes from './pages/Notes';
import Weather from './pages/Weather';
import Quotes from './pages/Quotes';

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white transition-colors duration-300 flex flex-col">
            <Navbar />
            <main className="flex-grow container mx-auto px-4 py-6 md:py-8">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/tasks" element={<Tasks />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/quotes" element={<Quotes />} />
              </Routes>
            </main>
            <footer className="bg-white dark:bg-gray-800 shadow-inner py-4 mt-8">
              <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400 text-sm">
                <p>MiniPro Dashboard &copy; {new Date().getFullYear()}</p>
              </div>
            </footer>
          </div>
        </Router>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;