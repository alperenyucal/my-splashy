
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';


// I'm aware these keys shouldn't be in the client application.
const API_ACCESS_KEY = "yT956ENR5lDItvK5E3z8NQyLTGLoVu3gAuYVpf6Jl00";
const API_SECRET_KEY = "id4NmkZREvWYmdoKaMU-836gBiuUIXuMjERUOne8PhQ";


function App() {

  let [queryValue, setQueryValue] = useState(null);
  let [collectionValue, SetCollectionValue] = useState(null);
  let [imageResults, setImageResults] = useState([]);

  let queryHandler = e => {
    setQueryValue(e.target.value);
  }

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

  return (
    <div className="App">
      <Navbar queryHandler={queryHandler} />
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