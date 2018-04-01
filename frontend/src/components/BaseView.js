import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppHeader from './AppHeader';
import Sidebar from './Sidebar';
import AllPosts from './AllPosts';
import CreatePost from './CreatePost';


class BaseView extends Component {
  render() {
    return (
      <div className="base">
        <AppHeader />
        <main>
          <Sidebar />
          <div className="content">
            <Switch>
              <Route exact path="/" component={AllPosts} />
              <Route exact path="/posts/create" component={CreatePost} />
            </Switch>
          </div>
        </main>
      </div>
    );
  }
}

export default BaseView;
