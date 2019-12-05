import React, { Component } from 'react';
import {Route,Switch,Redirect} from 'react-router-dom';
import Home from './components/home';
import Cart from './components/cart';
import NotFound from './components/error404';

class App extends Component {
  render() {
    return (
      <React.Fragment>
      <div className="container">
        <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/not-found"  component={NotFound}/>
        <Route path="/cart"  component={Cart}/>
        <Redirect to="/not-found"/>
        </Switch>
      </div>
      </React.Fragment>
    );
  }
}

export default App;
