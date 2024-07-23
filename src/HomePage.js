// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      {/* Add content for the home page */}
      <Link to="/about">Go to About Page</Link>
    </div>
  );
};

export default HomePage;