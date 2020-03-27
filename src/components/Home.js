import React from 'react';
import './Home.css';
import image from '../Assets/Pizza.jpg';

import Nav from './Nav';

function Home() {
  return (
    <>
    <Nav />
    <div className="Home">
      <div className="Image">
        <img src={image} alt="margarita pizza" />
      </div>
    </div>
  </>
  );
}

export default Home;