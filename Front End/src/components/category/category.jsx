import React from 'react';
import './css/CategoryMenu.css'
const CategoryMenu = ({ categories, setActiveCategory, activeCategory }) => {
  return (
    <div className="category-menu">
      {categories.map((category) => (
        <button
          key={category.id}
          className={`category-button ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => setActiveCategory(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryMenu;
