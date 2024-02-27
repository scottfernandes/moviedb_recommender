import * as React from 'react';
import './card.scss'
export default function Cards({Title,image,content}) {
  return (
   <div>
    <div className='card'>
      <div className="card-top">
        <img src={image}></img>
      </div>

      <div className="card-body">
        <div className="card-head">
          <h2>{Title}</h2>
          <p className='card-content'>{content}</p>
        </div>
      </div>
    </div>
   </div>
  );
}
