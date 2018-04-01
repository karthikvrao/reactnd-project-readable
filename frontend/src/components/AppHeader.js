import React from 'react';
import { Link } from 'react-router-dom';

const AppHeader = () => (
  <header className="appHeader">
    <h1><Link to="/">Readable</Link></h1>
  </header>
);

export default AppHeader;
