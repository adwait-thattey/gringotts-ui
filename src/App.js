import React from 'react';
import Logo from './components/Logo/Logo';
import './App.scss';
import Nav from "./components/Nav/Nav";

function App() {
  return (
    <div >
      <header>
        <Nav />
      </header>
      <section>
        <Logo rotate={true} size={'40rem'}/>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
      </section>
    </div>
  );
}

export default App;
