import React from 'react';
import Query from './Query';
import Collections from './Collections';
import './Navbar.css'
import logo from './logo.svg';

// Top navigation bar
export default function Navbar({ queryHandler, collectionHandler, onSubmit }) {

  return (
    <form onSubmit={onSubmit} className="navbar">
      <img src={logo}
        className="app-logo"
        alt="logo" />
      <div className="navbar-query">
        <Query handler={queryHandler} />
      </div>
      <div className="navbar-collection">
        <Collections handler={collectionHandler} />
      </div>
      <button className="navbar-search-button">
        SEARCH
      </button>
    </form>
  )
}