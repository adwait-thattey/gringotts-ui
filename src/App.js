import React from 'react';
import Logo from './components/Logo/Logo';
import './App.scss';
import Nav from "./components/Nav/Nav";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function App() {



  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
        <hr />
        <Route exact path="/" component={Nav} />
        <Route path="/about" component={About} />
      </div>
      {/* <div>
        <header>
          <Nav />
        </header>
        <section>
          <Logo rotate={true} size={'40rem'} />
        </section>
      </div> */}
    </Router>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

export default App;
