import React from 'react';
import Query from './Query';
import Collections from './Collections';
import './Navbar.css'
import logo from './logo.svg';


export default function Navbar({ queryHandler, collectionHandler, onSubmit }) {

  return (
    <div className="navbar">
      <img src={logo}
        className="app-logo"
        alt="logo" />
      <div className="navbar-query">
        <Query handler={queryHandler} />
      </div>
      <div className="navbar-collection">
        <Collections handler={collectionHandler} />
      </div>
      <button onClick={onSubmit} className="navbar-search-button">
        SEARCH
      </button>
    </div>
  )
}