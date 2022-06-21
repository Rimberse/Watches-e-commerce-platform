import './App.css';
import Card from './components/Card';
import React from 'react';
import Navbar from './components/Navbar/Navbar'



function App() {
  const watch1 = {
    name: 'Watch name',
    brand: 'Watch brand',
    description: 'Watch description goes here...',
    image: 'https://consumer-img.huawei.com/content/dam/huawei-cbg-site/common/mkt/pdp/wearables/watch-3-pro/img/one/huawei-watch-3-pro-kv.png',
    price: '249,99 €'
  }

  const watch2 = {
    name: 'Golden metal',
    brand: 'Rolex',
    description: 'Watch made from golden metal. Very expensive...',
    image: 'https://images.hbjo-online.com/images/rolex/detail2/watch_assets_front_facing/m128238-0069_modelpage_front_facing_landscape.png',
    price: '599 999,99 €'
  }

  const watch3 = {
    name: 'G-shock',
    brand: 'Casio',
    description: 'Very good looking casual watch.',
    image: 'https://static.wixstatic.com/media/2cd43b_70674f11a01e43f19366ee72aee4b8bb~mv2.png/v1/fill/w_320,h_507,q_90/2cd43b_70674f11a01e43f19366ee72aee4b8bb~mv2.png',
    price: '99,99 €'
  }

  const watch4 = {
    name: 'Coutourier',
    brand: 'Tissot',
    description: 'Great watch. Great build & quality.',
    image: 'https://www.tissotwatches.com/media/catalog/product/cache/aaadd316e453df5b08f7f4246fad1a9c/T/0/T035.627.16.051.00_R_1.png',
    price: '599,99 €'
  }

  const watch5 = {
    name: 'Frog watch',
    brand: 'Watch brand',
    description: 'Watch description goes here...',
    image: 'https://cdn.laredoute.com/products/c/1/4/c14af5a8bda51f67220beb43b47ad506.jpg?imgopt=twic&twic=v1/cover=1200x1200',
    price: '5 €'
  }

  return (

    <body>
    <div>
    <Navbar></Navbar>
    </div>
    
    <div className="App">
      <Card watch={ watch1 } />
      <Card watch={ watch2 } />
      <Card watch={ watch3 } />
      <Card watch={ watch4 } />
      <Card watch={ watch5 } />
    </div>
    </body>
  );
}

export default App;
