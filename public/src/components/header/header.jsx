import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

function Header() {
  return (
    <header>
      <li><Link to="/auth">auth</Link></li>
      <li><Link to="/">main</Link></li>
    </header>
  );
}

export default Header;