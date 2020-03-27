import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className='home'>
      <h1>Lambda EATS</h1>
      <nav> 
        <Link to="/">Home</Link>
        <Link to="/pizza">Order</Link>
      </nav>
    </div>
  );
}

export default Home;