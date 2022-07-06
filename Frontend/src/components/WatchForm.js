import React, { useState, useEffect } from 'react';
import config from '../config';
import shopService from '../services/shop';
import '../styles/WatchForm.css';

const WatchForm = ({ user, watch, reflectChanges }) => {
  const baseUrl = config.backend.baseUrl + '/shop';
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user === 'Edit')
      setShowForm(true);
  }, []);

  const displayPropertyForm = () => {
    if (user === 'Administrator' || user === 'Edit') {
      setShowForm(!showForm);
    }
  };

  // Event handler for form submit
  const handleSubmit = e => {
    e.preventDefault();

    if (!e.target.Name.value || !e.target.Type.value || !e.target.Price.value || !e.target.Brand.value || !e.target.Weight.value || 
        !e.target.MaterialType.value || !e.target.Color.value || !e.target.WristSize.value || !e.target.DialWatchType.value || 
        !e.target.CollectionName.value || !e.target.Mechanism.value || !e.target.Stock.value || !e.target.Image.value || !e.target.Description.value) {
        setMessage('Please fill in the form correctly!');
        setTimeout(() => setMessage(''), 3000);
        return;
    }

    const data = {
        Name: e.target.Name.value,
        Type: e.target.Type.value,
        Price: e.target.Price.value,
        Brand: e.target.Brand.value,
        Weight: e.target.Weight.value,
        MaterialType: e.target.MaterialType.value,
        Color: e.target.Color.value,
        WristSize: e.target.WristSize.value,
        DialWatchType: e.target.DialWatchType.value,
        CollectionName: e.target.CollectionName.value,
        Mechanism: e.target.Mechanism.value,
        Stock: e.target.Stock.value,
        Image: e.target.Image.value,
        Description: e.target.Description.value
    }

    if (user !== 'Edit') {
      shopService.addWatch(data)
        .then(response => {
          setMessage(response.message);
          setTimeout(() => setMessage(''), 3000);
        })
    } else {
      shopService.modifyWatch(watch.IdWatches, data)
        .then(response => {
          setMessage(response.message);
          setTimeout(() => setMessage(''), 3000);
          reflectChanges();
        })
    }

    displayPropertyForm();
  };

  return (
    <div className="watch-form">
      {(message !== '') &&
        <h2 className={"status-message " + (message !== "Please fill in the form correctly!" ? "success" : "error")}>{message}</h2>}
      {(!showForm && user === 'Administrator') && <button onClick={displayPropertyForm} className="new-watch-btn"></button>}
      {showForm &&
        <form action={baseUrl} method="POST" className="new-watch-form" onSubmit={handleSubmit}>
          <div className="new-watch-form-column">
            <div className="new-watch-form-column-item">
              <label htmlFor="Name">Name: </label>
              <input name="Name" id="Name" defaultValue={watch ? watch.Name : "Name..."} type="text"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="Type">Type: </label>
              <input name="Type" id="Type" defaultValue={watch ? watch.Type : "Type..."} type="text"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="Price">Price: </label>
              <input name="Price" id="Price" defaultValue={watch ? watch.Price : "Price..."} type="number" min="0"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="Brand">Brand: </label>
              <input name="Brand" id="Brand" defaultValue={watch ? watch.Brand : "Brand..."} type="text"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="Weight">Weight: </label>
              <input name="Weight" id="Weight" defaultValue={watch ? watch.Weight : "Weight..."} type="number" min="0"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="MaterialType">Material Type: </label>
              <input name="MaterialType" id="MaterialType" defaultValue={watch ? watch.MaterialType : "Material type..."} type="text"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="Color">Color: </label>
              <input name="Color" id="Color" defaultValue={watch ? watch.Color : "Color..."} type="text"></input>
            </div>
          </div>
          <div className="new-watch-form-column">
            <div className="new-watch-form-column-item">
              <label htmlFor="WristSize">Wrist size: </label>
              <input name="WristSize" id="WristSize" defaultValue={watch ? watch.WristSize : "Wrist size..."} type="number" min="0"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="DialWatchType">Watch dial type: </label>
              <input name="DialWatchType" id="DialWatchType" defaultValue={watch ? watch.DialWatchType : "Watch dial type..."} type="text"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="CollectionName">Collection name: </label>
              <input name="CollectionName" id="CollectionName" defaultValue={watch ? watch.CollectionName : "Collection name..."} type="text"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="Mechanism">Mechanism: </label>
              <input name="Mechanism" id="Mechanism" defaultValue={watch ? watch.Mechanism : "Mechanism..."} type="text"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="Stock">Stock: </label>
              <input name="Stock" id="Stock" defaultValue={watch ? watch.Stock : "Stock..."} type="number" min="0"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="Image">Image: </label>
              <input name="Image" id="Image" defaultValue={watch ? watch.Image : "Image..."} type="text"></input>
            </div>
            <div className="new-watch-form-column-item">
              <label htmlFor="Description">Description: </label>
              <input name="Description" id="Description" defaultValue={watch ? watch.Description : "Description..."} type="text"></input>
            </div>
            <div>
              <button className="new-watch-form-btn">{user === 'Administrator' ? "Add" : "Modify"}</button>
            </div>
            {user !== 'Edit' && <div>
              <button className="new-watch-cancel-btn" type="button" onClick={displayPropertyForm}></button>
            </div>}
          </div>
        </form>}
    </div>
  );
};

export default WatchForm;