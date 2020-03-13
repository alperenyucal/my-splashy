import React from 'react';
import logo from './logo.svg';
import './App.css';
import Query from './components/Query';
import Collections from './components/Collections';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Images />
    </div>
  );
}


function NavBar() {

  return (
    <div className="navbar">
      <img src={logo}
        className="app-logo"
        alt="logo" />
      <div className="navbar-query">
        <Query />
      </div>
      <div className="navbar-collection">
        <Collections />
      </div>

      <button className="navbar-search-button">
        SEARCH
      </button>
    </div>
  )
}

function Images() {

  return (
    <div>henlo again</div>
  )
}



export default App;
