import React from 'react';
import './App.scss';
import Homepage from "./containers/homepage/homepage";
import About from "./containers/about/index";
import Dashboard from "./containers/dashboard/dashboard";
import Auth from "./containers/auth/auth";
import { Route, withRouter } from 'react-router-dom';
import Engine from "./containers/kv/index";
import WebCamOpen from './containers/temp-webcam';

function App(props) {
  return (
      <React.Fragment>
        {/* {props.location.pathname !== "/" ? <header style={{"height":"8vh"}}> <Nav /> </header>: null} */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/auth" component={Auth} />
        <Route path="/about" component={About} />
        <Route path="/dashboard" component={Dashboard} exact/>
        <Route path="/dashboard/kv" component={Engine}/>
        <Route path="/webcam" component={WebCamOpen} />
      </React.Fragment>
  );
}

export default withRouter(App);
