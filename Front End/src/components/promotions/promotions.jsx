// PromotionsPage.js
import React, { useState, useEffect } from 'react';
import './css/PromotionsPage.css'; 
import NavigationBar from '../navigation';

const PromotionsPage = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    const fetchPromotions = async () => {
      try {
        const response = await fetch('http://localhost:5000/promotions'); 
        if (!response.ok) {
          throw new Error('Failed to fetch promotions');
        }
        const data = await response.json();
        console.log('Promotions received:', data); 
        setPromotions(data);
      } catch (error) {
        console.error('Error fetching promotions:', error);
       
      }
    };

    fetchPromotions();
  }, []);

  return (
    <>
      <NavigationBar/>
      <div className="promotions-container">
  {promotions.map((promotion) => (
    <div key={promotion._id} className="promotion-card">
<img 
  src={`http://localhost:5000/${promotion.imageUrl}`} 
  alt={`Promotion ${promotion.name}`} 
  className="promotion-image" 
/>
    </div>
  ))}
</div>

    </>
  );
};

export default PromotionsPage;
