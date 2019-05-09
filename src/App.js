import React, { Component } from 'react';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import './App.css';
import Layout from './components/Layout/Layout';
import Explore from './pages/Explore/Explore';
import Random from './pages/Random/Random';
import Add from './pages/Add/Add';
import Bit from './pages/Bit/Bit';
import Auth from './pages/Auth/Auth';
import Logout from './pages/Logout/Logout';
import * as actions from './store/actions';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSingup();
  }

  render() {

    let routes = null;
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/" exact component={Explore} />
          <Route path="/add" component={Add} />
          <Route path="/random" component={Random} />
          <Route path="/bit" component={Bit} />
          <Route path="/logout" component={Logout} />
          <Redirect to={"/"} />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/" exact component={Explore} />
          <Route path="/random" component={Random} />
          <Route path="/bit" component={Bit} />
          <Route path="/auth" component={Auth} />
          <Redirect to={"/"} />
        </Switch>
      );
    }

    return (
      <div className="App">
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSingup: () => dispatch(actions.authCheckState()),
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));