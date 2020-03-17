import React, { useRef, useState } from 'react';
import './Images.css';


export default function Images({ imageUrls = [], loadHandler, style }) {

  // counter for loaded images
  let counter = useRef(0);

  // returns the dom elements of images in the given interval.
  let imagesBetween = (start, end) => imageUrls.slice(start, end).map(
    (url, i) => (
      <a
        href={url[1]}
        key={start + i}
        target="_blank">
        <img
          src={url[0]}
          className="image"
          onLoad={() => {
            counter.current += 1;
            if (counter.current >= imageUrls.length)
              loadHandler();
          }}
        />
      </a>)
  )

  // render with masonry columns
  return (
    <div className="image-container" style={style}>
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

