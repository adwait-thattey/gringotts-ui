import React from 'react';
import './App.scss';
import Homepage from "./containers/homepage/homepage";
import About from "./containers/about/index";
import Dashboard from "./containers/dashboard/dashboard";
import Auth from "./containers/auth/auth";
import { Route, withRouter } from 'react-router-dom';
import KV from "./containers/kv/index";
import AWS from "./containers/aws/index";
import SSH from "./containers/ssh/index";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App(props) {
  return (
      <React.Fragment>
        {/* {props.location.pathname !== "/" ? <header style={{"height":"8vh"}}> <Nav /> </header>: null} */}
        <Route exact path="/" component={Homepage} />
        <Route exact path="/auth" component={Auth} />
        <Route path="/about" component={About} />
        <Route path="/dashboard" component={Dashboard} exact/>
        <Route path="/dashboard/kv" component={KV}/>
        <Route path="/dashboard/aws" component={AWS} />
        <Route path="/dashboard/ssh" component={SSH} />
        <ToastContainer />
      </React.Fragment>
  );
}

export default withRouter(App);
