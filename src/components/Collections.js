import React, { useState, useEffect } from 'react';
import './Collections.css';
import icon from './dropdown-icon.svg';
import { API_ACCESS_KEY } from '../settings';


// Collections component
export default function Collections({ handler }) {

  // focus state of collection input field.
  let [isFocused, setFocused] = useState(false);
  
  // collection search results
  let [results, setResults] = useState([]);
  
  // inserted value
  let [value, setValue] = useState("");

  // selected value from results
  let [selected, setSelected] = useState(null);

  // if inserted value is empty string, clears selected state
  useEffect(() => {
    if (value === "") {
      setSelected(null);
      handler(selected);
    }
  })

  // fetches the search results
  let searchHandler = e => {
    setValue(e.target.value);

    fetch('https://api.unsplash.com/search/collections?query=' + e.target.value + '&page=1&per_page=5', {
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID ' + API_ACCESS_KEY
      }
    })
      .then(r => r.json())
      .then(data => {
        setResults(data.results.map(item => { return { id: item.id, title: item.title } }));
      })

  }

  // render
  return (
    <div className="wrapper-collections">
      <div className="collections-shadow"></div>

      <input
        className="collections-input"
        value={value}
        placeholder="Collections"
        style={isFocused && results.length !== 0 ? {
          borderBottomLeftRadius: "0",
          borderBottomRightRadius: "0"
        } : null}
        onFocus={e => {
          e.preventDefault();
          setFocused(true);
        }}
        onBlur={e => {
          e.preventDefault();
          // a little hack to make results clickable.
          setTimeout(() => { setFocused(false) }, 120);
        }}
        onChange={searchHandler}
      >
      </input>

      <img src={icon} className="dropdown-icon" alt="icon" />

      {isFocused ?
        <div className="collections-results">
          {results.map((item, i) => (
            <div
              key={i}
              onClick={() => {
                setValue(item.title);
                setSelected(item);
                setFocused(false);
                handler(item);
              }}
              className="collections-item">
              {item.title}
            </div>)
          )}
        </div> : null}

    </div>
  )

}