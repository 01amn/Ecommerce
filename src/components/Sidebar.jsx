import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';

const Sidebar = () => {
  const { categories, activeCategory, setActiveCategory, sortOption, setSortOption } = useContext(ProductContext);

  return (
    <aside className="w-full md:w-64 bg-white rounded-xl shadow-sm p-5 h-fit sticky top-24">
      <div className="mb-6">
        <h3 className="font-bold text-lg text-slate-800 mb-3 border-b pb-2">Categories</h3>
        <ul className="space-y-2">
          {categories.map(category => (
            <li key={category}>
              <button
                className={`w-full text-left px-3 py-2 rounded-lg transition ${
                  activeCategory === category 
                    ? 'bg-primary-50 text-primary-700 font-medium' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
                onClick={() => setActiveCategory(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="font-bold text-lg text-slate-800 mb-3 border-b pb-2">Sort By</h3>
        <select 
          className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Default</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
      </div>
    </aside>
  );
};

export default Sidebar;
