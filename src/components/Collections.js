import React, { useState, useEffect } from 'react';
import './Collections.css';
import icon from './dropdown-icon.svg';
import { API_ACCESS_KEY } from '../settings';



export default function Collections({ handler }) {

  let [isFocused, setFocused] = useState(false);
  let [results, setResults] = useState([]);

  let searchHandler = e => {
    handler(e);

    fetch('https://api.unsplash.com/search/collections?query=' + e.target.value + '&page=1&per_page=5', {
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID ' + API_ACCESS_KEY
      }
    })
      .then(r => r.json())
      .then(data => {
        setResults(data.results.map(item => item.title));
      })

    //setResults(["ali", "veli", "deli"]);

  }

  return (
    <div className="wrapper-collections">
      <div className="collections-shadow"></div>

      <input
        className="collections-input"
        placeholder="Collections"
        style={isFocused ? {
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0"
        } : null}
        onFocus={e => {
          e.preventDefault();
          setFocused(true);
        }}
        onBlur={e => {
          e.preventDefault();
          setFocused(false);
        }}
        onChange={searchHandler}
      >
      </input>

      <img src={icon} className="dropdown-icon" alt="icon" />

      {isFocused ?
        <div className="collections-results">
          {results.map(item => <div className="collections-item">{item}</div>)}

        </div> : null}

    </div>
  )

}