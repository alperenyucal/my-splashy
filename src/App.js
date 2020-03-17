
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { API_ACCESS_KEY } from './settings';


function App() {

  let [queryValue, setQueryValue] = useState("");
  let [collectionValue, SetCollectionValue] = useState("");
  let [imageResults, setImageResults] = useState([]);

  let queryHandler = e => {
    setQueryValue(e.target.value);
  }

  let collectionHandler = e => {
    SetCollectionValue(e.target.value);
  }

  let submitHandler = e => {
    e.preventDefault();
    let url = 'https://api.unsplash.com/search/photos?query=' + queryValue + '&page=1&per_page=12';


    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID ' + API_ACCESS_KEY
      }
    })
      .then(r => r.json())
      .then(data => {

        setImageResults(data.results.map(item => item.urls.small));
      })
  }
  /*
    useEffect(() => {
      fetch('https://api.unsplash.com/photos?page=1&per_page=12 ', {
        method: 'GET',
        headers: {
          'Authorization': 'Client-ID ' + API_ACCESS_KEY
        }
      })
        .then(r => r.json())
        .then(data => {
  
          setImageResults(data.map(item => item.urls.small));
        })
  
    }, []);
  */
  return (
    <div className="App">
      <Navbar queryHandler={queryHandler} collectionHandler={collectionHandler} onSubmit={submitHandler} />
      <Images imageUrls={imageResults} />
    </div>
  );
}


function Images({ imageUrls = [] }) {

  let imagesBetween = (start, end) => imageUrls.slice(start, end).map(
    (url, i) => <img className="image" key={start + i} src={url} />)


  return (
    <div className="image-container">
      <div className="column">
        {imagesBetween(0, 4)}
      </div>
      <div className="column">
        {imagesBetween(4, 8)}
      </div>
      <div className="column">
        {imagesBetween(8, 12)}
      </div>
    </div>
  )
}



export default App;