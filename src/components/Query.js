import React from 'react';
import "./Query.css"

// query input
export default function Query({handler}) {

return(
  <div className="wrapper-query">
    <input placeholder="Query" type="text" className="query" onChange={handler}></input>
  </div>
)

}