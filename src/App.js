import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.css';
import Layout from './components/Layout/Layout';
import BitsContainer from './pages/BitsContainer/BitsContainer';
import RandomBit from './pages/RandomBit/RandomBit';
import AddBit from './pages/AddBit/AddBit';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Layout>
          <Route path="/" exact component={BitsContainer} />
          <Switch>
            <Route path="/add" component={AddBit} />
            <Route path="/random" component={RandomBit} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
