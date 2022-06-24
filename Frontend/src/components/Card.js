import React from 'react';
import '../styles/Card.css';

const Card = ({ watch }) => {
  // Formats price to the given currency and region. Used to nicely format price of real estates
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  });

  return (
    <>
      <div className='watch-card'>
        <div className='watch-card-image'>
            <img src={ watch.Image } alt='Watch'></img>
        </div>
        <div className='watch-card-details'>
          <div className='watch-card-details-info'>
              <h2 className='watch-card-details-info-name'>{ watch.Name }</h2>
              <h3 className='watch-card-details-info-brand'><span>{ watch.Brand }</span></h3>
              <p className='watch-card-details-info-description'>{ watch.Description }</p>
              <div className='watch-card-details-info-bottom'>
                <h3 className='watch-card-details-info-price'>{ formatter.format(watch.Price) }</h3>
                <button className='watch-card-details-info-cart'>Add to cart</button>
              </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Card;