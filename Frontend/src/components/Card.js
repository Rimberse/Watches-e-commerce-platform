import React, { useState, useRef } from 'react';
import '../styles/Card.css';
import { FiEdit } from 'react-icons/fi';
import { BsTrash } from 'react-icons/bs';
import WatchForm from './WatchForm';
import shopService from '../services/shop';

const Card = ({ user, watch, reflectChanges, addToCart }) => {
  const [message, setMessage] = useState('');
  const [edit, setEdit] = useState(false);
  const btnRef = useRef();

  // Formats price to the given currency and region. Used to nicely format price of real estates
  const formatter = new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR'
  });

  const editHandler = () => {
    setEdit(!edit);
  }

  const deleteHandler = () => {
    if (btnRef.current) {
      btnRef.current.setAttribute("disabled", "disabled");
    }

    shopService.removeWatch(watch.IdWatches)
      .then(response => {
        setMessage(response.message);
        setTimeout(() => {
          setMessage('');
          reflectChanges();
          btnRef.current.removeAttribute("disabled");
        }, 3000);
      })
  }

  return (
    <>
      {(message !== '') && <h2 className="status-message success">{message}</h2>}
      {edit && <WatchForm user={'Edit'} watch={ watch } reflectChanges={reflectChanges} />}
      <div className='watch-card-wrapper'>
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
                  {(user !== 'Administrator' && user !== 'Guest') && <button className='watch-card-details-info-cart' onClick={addToCart}>Add to cart</button>}
                </div>
            </div>
          </div>
        </div>
        {user === 'Administrator' && <div>
          <button className="watch-card-edit-btn" onClick={editHandler}><FiEdit /></button>
          <button className="watch-card-delete-btn" ref={btnRef} onClick={deleteHandler}><BsTrash /></button>
        </div>}
      </div>
    </>
  );
};

export default Card;