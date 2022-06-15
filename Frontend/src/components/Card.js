import React, { useState } from 'react';
import '../styles/Card.css';

const Card = ({ watch }) => {


  return (
    <>
      <div className='watch-card'>
        <div className='watch-card-image'>
            <img src='https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-3-pro/img/one/huawei-watch-3-pro-kv.png' alt='Watch'></img>
        </div>
        <div className='watch-card-info'>
            <h1 className='watch-card-info-name'>Watch name</h1>
            <h2 className='watch-card-info-brand'>Brand name</h2>
            <h3 className='watch-card-info-description'>Description goes here.</h3>
        </div>
      </div>
    </>
  );
};

export default Card;