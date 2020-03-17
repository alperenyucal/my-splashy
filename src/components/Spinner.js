import React from 'react';
import spinner from './spinner.png';
import './Spinner.css'


// Basic spinner
export default function Spinner({ style }) {

  return (
    <div style={style} className="spinner">
      <img src={spinner} className="spinner-image" />
    </div>
  )
} 
