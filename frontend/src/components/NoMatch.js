import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () =>
  <div className="pageNotFound">
    <h2>
      The post you are looking for does not exist or has been deleted. To return to the home page, click <Link to="/">here</Link>.
    </h2>
  </div>;

export default NoMatch;
