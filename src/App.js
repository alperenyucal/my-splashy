
import React, { useState, useEffect } from 'react';

import Navbar from './components/Navbar';
import Images from './components/Images';
import Spinner from './components/Spinner';

import { API_ACCESS_KEY } from './settings';
import './App.css';

// The main react application
function App() {

  // States for several cases
  const STATES = {
    RESULT: "RESULT",
    NO_RESULT: "NO_RESULT",
    ERROR: "ERROR"
  }

  // query value is the value of query input
  let [queryValue, setQueryValue] = useState("");
  
  // collection state holds collection id and title
  let [collection, setCollection] = useState(null);

  // a list of fetched image urls
  let [imageResults, setImageResults] = useState([]);

  // states for page rendering.
  let [loading, setLoading] = useState(true);
  let [pageState, setPageState] = useState(STATES.RESULT);

  // Event handler for query and collection inputs.
  let queryHandler = e => { setQueryValue(e.target.value); }

  let collectionHandler = col => { setCollection(col); }

  // controls the loading state
  let loadHandler = () => { setTimeout(() => { setLoading(false) }, 200); }

  // fetch results on search submit
  let submitHandler = e => {
    e.preventDefault();
    setPageState(STATES.RESULT);
    setLoading(true);
    let url = 'https://api.unsplash.com/search/photos?query=' + queryValue + '&page=1&per_page=12';

    // if collection is selected add that to query
    if (collection != null)
      url = url + "&collections=" + collection.id.toString();

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID ' + API_ACCESS_KEY
      }
    })
      .then(res => {
        if (!res.ok)
          throw Error(res.statusText);
        return res.json()
      })
      .then(data => {
        let temparr = data.results.map(item => [item.urls.small, item.links.html]);
        if (temparr.length === 0)
          setPageState(STATES.NO_RESULT);
        else {
          if (JSON.stringify(temparr) == JSON.stringify(imageResults))
            setLoading(false);
          else
            setImageResults(temparr);

        }
      })
      .catch(err => {
        setPageState(STATES.ERROR);
      })
  }

  // renders accroding to selected state
  let getBody = () => {

    switch (pageState) {
      case STATES.RESULT:
        return (
          <div>
            <Spinner style={{ display: loading ? "block" : "none" }} />
            <Images style={{ display: loading ? "none" : "block" }} imageUrls={imageResults} loadHandler={loadHandler} />
          </div>)
      case STATES.NO_RESULT:
        return <div className="message">Hmmmm, looks like we don't have any result.</div>
      case STATES.ERROR:
        return <div className="message">Oops, something went wrong.</div>
      default:
        return null;
    }
  }

  // onload fetch
  useEffect(() => {
    setPageState(STATES.RESULT);
    setLoading(true);
    let url = 'https://api.unsplash.com/search/photos?query=istanbul&page=1&per_page=12';

    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Client-ID ' + API_ACCESS_KEY
      }
    })
      .then(res => {
        if (!res.ok)
          throw Error(res.statusText);
        return res.json()
      })
      .then(data => {
        let temparr = data.results.map(item => [item.urls.small, item.links.html]);

        if (temparr.length === 0)
          setPageState(STATES.NO_RESULT);
        else
          setImageResults(temparr);
      })
      .catch(err => {
        setPageState(STATES.ERROR);
      })
  }, [])

  // render
  return (
    <div className="app">
      <Navbar queryHandler={queryHandler} collectionHandler={collectionHandler} onSubmit={submitHandler} />
      <div className="app-body">
        {getBody()}
      </div>
    </div>
  );
}



export default App;
