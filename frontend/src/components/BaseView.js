import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppHeader from './AppHeader';

class BaseView extends Component {
  render() {
    return (
      <div className="base">
        <AppHeader />
        <main>

        </main>
      </div>
    );
  }
}

export default BaseView;
