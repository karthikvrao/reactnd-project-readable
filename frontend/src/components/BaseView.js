import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';


class BaseView extends Component {
  render() {
    return (
      <div className="base">
        <AppHeader />
        <main>
          <Sidebar />
          <div className="content">
          </div>
        </main>
      </div>
    );
  }
}

export default BaseView;
