import React from 'react';
import Logo from './components/Logo/Logo';

// import 'materialize-css/dist/css/materialize.min.css'
import './App.scss';
import Nav from "./components/Nav/Nav";
import Homepage from "./containers/homepage/homepage";
import About from "./containers/about/index";

import { BrowserRouter as Router, Route, Link, withRouter } from 'react-router-dom';
import Login from "./containers/login/login";

function App(props) {


  console.log(props);
  return (
      <React.Fragment>

      {props.location.pathname !== "/" ? <header style={{"height":"8vh"}}> <Nav /> </header>: null}

      <Route exact path="/" component={Homepage} />
      <Route exact path="/login" component={Login} />
      <Route path="/about" component={About} />

      </React.Fragment>

  );
}

export default withRouter(App);
