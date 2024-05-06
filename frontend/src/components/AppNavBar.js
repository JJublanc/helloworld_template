import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
      <nav>
          <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/main">Main</Link></li>
          </ul>
          <div>
              <button><Link to="/signup">Sign Up</Link></button>
              <button><Link to="/login">Login</Link></button>
          </div>
      </nav>
  );
}

export default Navbar;