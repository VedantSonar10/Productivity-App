
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const Quotes = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await axios.get('https://api.quotable.io/random');
      setQuote(response.data);
    } catch (err) {
      console.error('Error fetching quote:', err);
      setError('Failed to fetch a quote. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // For demo purposes, let's create a mock quote in case the API fails
  useEffect(() => {
    if (error) {
      const mockQuotes = [
        { content: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { content: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { content: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { content: "Success is not final, failure is not fatal: It is the courage to continue that counts.", author: "Winston Churchill" },
        { content: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" }
      ];
      
      const randomIndex = Math.floor(Math.random() * mockQuotes.length);
      setQuote(mockQuotes[randomIndex]);
      setError(null);
    }
  }, [error]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Motivational Quotes</h1>
      
      <div className="card mb-6">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading quote...</p>
          </div>
        ) : error ? (
          <div className="bg-red-100 dark:bg-red-900 border border-red-400 text-red-700 dark:text-red-200 px-4 py-3 rounded relative">
            {error}
          </div>
        ) : quote ? (
          <div className="text-center py-8">
            <blockquote className="text-xl italic font-semibold text-gray-800 dark:text-gray-200">
              <p className="mb-4">"{quote.content}"</p>
              <footer className="text-gray-600 dark:text-gray-400">
                — {quote.author}
              </footer>
            </blockquote>
          </div>
        ) : null}
      </div>
      
      <div className="flex justify-center">
        <button 
          onClick={fetchQuote}
          disabled={loading}
          className="btn btn-primary flex items-center"
        >
          <ArrowPathIcon className={`h-5 w-5 mr-2 ${loading ? 'animate-spin' : ''}`} />
          New Quote
        </button>
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">About This Feature</h2>
        <p className="text-gray-700 dark:text-gray-300">
          This page displays random motivational quotes to inspire you throughout your day. 
          Click the "New Quote" button to fetch a different quote. The quotes are fetched from 
          the Quotable API, with fallback to a local collection if the API is unavailable.
        </p>
      </div>
    </div>
  );
};

export default Quotes;