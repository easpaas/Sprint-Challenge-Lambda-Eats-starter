import React from 'react';
import { Link } from 'react-router-dom';

import './Nav.css';

const Nav = () => {
  return ( 
    <div className='Nav'>
      <h1>Lambda EATs</h1>
      <nav> 
        <Link to="/">Home</Link>
        <Link to="/pizza">Order</Link>
      </nav>
    </div>
  );
}

export default Nav;
