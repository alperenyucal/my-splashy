import React from 'react';
import "./Query.css"


export default function Query({handler}) {

return(
  <div className="wrapper-query">

    <input type="text" className="query" onChange={handler}></input>

  </div>
)

}