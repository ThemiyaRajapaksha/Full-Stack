import React, { useState, useEffect } from 'react';
import CategoryMenu from '../../components/category/category';
import ItemCard from '../../components/ItemsDisplay/ItemCard';
import NavigationBar from '../../components/navigation';

const categories = [
  { id: 'seafood', name: 'Sea food' },
  { id: 'noodles', name: 'Noodles' },
  { id: 'specials', name: 'Specials' },
  { id: 'burgers', name: 'Burgers' },
  { id: 'pizza', name: 'Pizza' },
]
const MenuPage = () => {
  const [activeCategory, setActiveCategory] = useState('seafood'); 
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:5000/menu');
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();

        setItems(data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchItems();
  }, []);


  const processedItems = items.map(item => ({
    id: item._id,
    productid: item._id,
    name: item.name,
    price: item.price + ' LKR', 
    imageUrl: item.image,
    category: item.category,
  }));

  const filteredItems = processedItems.filter(item => item.category === activeCategory);

  return (
    <>
      <NavigationBar />
      <div className="menu-layout">
        <CategoryMenu
          categories={categories} 
          setActiveCategory={setActiveCategory}
          activeCategory={activeCategory}
        />
        <div className="items-container">
          <div className="items-display">
            {filteredItems.length > 0 ? (
              filteredItems.map((item) => <ItemCard key={item.id} {...item} />)
            ) : (
              <p>No items to display</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuPage;
