import React from 'react';
import '../styles/Card.css';

const Card = ({ watch }) => {


  return (
    <>
      <div className='watch-card'>
        <div className='watch-card-image'>
            <img src={ watch.image } alt='Watch'></img>
        </div>
        <div className='watch-card-details'>
          <div className='watch-card-details-info'>
              <h2 className='watch-card-details-info-name'>{ watch.name }</h2>
              <h3 className='watch-card-details-info-brand'><span>{ watch.brand }</span></h3>
              <p className='watch-card-details-info-description'>{ watch.description }</p>
              <div className='watch-card-details-info-bottom'>
                <h3 className='watch-card-details-info-price'>{ watch.price }</h3>
                <button className='watch-card-details-info-cart'>Add to cart</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;