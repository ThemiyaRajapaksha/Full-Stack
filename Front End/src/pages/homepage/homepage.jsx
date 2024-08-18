import React from 'react';
import './css/HomePage.css'; 
import burgerBackground from './images/burger-background.png';
import NavigationBar from '../../components/navigation';

const HomePage = () => {
    return (
     <>
      <NavigationBar/>
      <div className="home-page">
        <div className="content-wrapper">
          <div className="text-content">
            <h1>Flavors <br/>that  <br/>Satisfy,</h1>
            <h2>Moments <br/> that <br/> Delight</h2>
          </div>
          <div className="image-content">
            <img src={burgerBackground} alt="Delicious Burger" />
          </div>
        </div>
      </div>
      </>
    );
  };
  
  export default HomePage;