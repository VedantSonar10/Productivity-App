import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircleIcon, 
  CloudIcon, 
  DocumentTextIcon, 
  LightBulbIcon 
} from '@heroicons/react/24/outline';
import Logo from '../components/Logo';
import PageTransition from '../components/PageTransition';
import DraggableWidget from '../components/DraggableWidget';
import { useToast } from '../contexts/ToastContext';
import { motion } from 'framer-motion';

const Dashboard = () => {
  // Use optional chaining to prevent errors if toast context isn't available
  const { addToast } = useToast() || {};
  const [widgets, setWidgets] = useState([
    { id: 'tasks', title: 'Tasks', icon: CheckCircleIcon, color: 'blue', path: '/tasks', description: 'Manage your to-do list and stay organized' },
    { id: 'weather', title: 'Weather', icon: CloudIcon, color: 'indigo', path: '/weather', description: 'Check your local weather forecast' },
    { id: 'notes', title: 'Notes', icon: DocumentTextIcon, color: 'green', path: '/notes', description: 'Write and save quick notes and ideas' },
    { id: 'quotes', title: 'Quotes', icon: LightBulbIcon, color: 'yellow', path: '/quotes', description: 'Get inspired with motivational quotes' }
  ]);

  const handleDragEnd = (event, info, widgetId) => {
    // Only call addToast if it exists
    if (addToast) {
      addToast('Widget position updated!', 'info');
    }
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };

  return (
    <PageTransition>
      <motion.div 
        className="mb-12 text-center"
        variants={itemVariants}
      >
        <div className="flex justify-center mb-4">
          <Logo size="xl" showText={false} className="animate-pulse-slow" />
        </div>
        <h1 className="welcome-heading bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
          Welcome to MiniPro Dashboard
        </h1>
        <p className="welcome-subtext mx-auto">
          Your all-in-one productivity solution. Organize tasks, check weather updates, capture ideas, and find daily inspiration.
        </p>
        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {widgets.map((widget, index) => (
          <DraggableWidget 
            key={widget.id} 
            id={widget.id}
            onDragEnd={(event, info) => handleDragEnd(event, info, widget.id)}
            className="h-full"
          >
            <Link to={widget.path} className={`card block h-full border-t-4 border-${widget.color}-500`}>
              <div className="flex flex-col items-center h-full">
                <motion.div 
                  className={`bg-${widget.color}-100 dark:bg-${widget.color}-900 p-3 rounded-full mb-4 shadow-md`}
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  <widget.icon className={`h-10 w-10 text-${widget.color}-500 dark:text-${widget.color}-400`} />
                </motion.div>
                <h2 className="text-xl font-semibold mb-2">{widget.title}</h2>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                  {widget.description}
                </p>
              </div>
            </Link>
          </DraggableWidget>
        ))}
      </div>
      
      <motion.div 
        className="mt-12 card border-l-4 border-blue-500 hover:shadow-lg transition-all duration-300"
        variants={itemVariants}
      >
        <div className="flex items-center mb-4">
          <Logo size="sm" />
          <h2 className="section-title text-2xl text-blue-600 dark:text-blue-400 ml-2 mb-0">Getting Started</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4 text-lg">
          Click on any of the cards above to navigate to that section of the dashboard. Here's what you can do:
        </p>
        <ul className="list-disc pl-5 text-gray-600 dark:text-gray-400 space-y-3">
          {[
            { text: "Create, edit, and complete tasks in the Tasks section", color: "blue" },
            { text: "Check the weather for any city in the Weather section", color: "indigo" },
            { text: "Write and save notes in the Notes section", color: "green" },
            { text: "Find inspiration with random quotes in the Quotes section", color: "yellow" }
          ].map((item, i) => (
            <motion.li 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 + (i * 0.1), duration: 0.5 }}
              className={`hover:text-${item.color}-600 dark:hover:text-${item.color}-400 transition-colors duration-200`}
              whileHover={{ x: 5 }}
            >
              {item.text}
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </PageTransition>
  );
};

export default Dashboard;