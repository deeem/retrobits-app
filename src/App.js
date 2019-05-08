import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import Explore from './pages/Explore/Explore';
import Random from './pages/Random/Random';
import Add from './pages/Add/Add';
import Bit from './pages/Bit/Bit';
import Auth from './pages/Auth/Auth';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={Explore} />
          <Switch>
            <Route path="/add" component={Add} />
            <Route path="/random" component={Random} />
            <Route path="/bit" component={Bit} />
            <Route path="/auth" component={Auth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
