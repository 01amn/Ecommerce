import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col h-full group">
      <Link to={`/product/${product.id}`} className="block relative p-6 h-64 overflow-hidden bg-white">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-contain group-hover:scale-105 transition duration-300"
        />
        <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-1 rounded-full flex items-center gap-1 text-xs font-medium text-amber-500 shadow-sm border border-slate-100">
          <Star className="w-3 h-3 fill-current" /> {product.rating?.rate}
        </div>
      </Link>
      
      <div className="p-5 flex flex-col flex-grow border-t border-slate-50">
        <span className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-2 line-clamp-1">
          {product.category}
        </span>
        <Link to={`/product/${product.id}`} className="hover:text-primary-600 transition">
          <h3 className="font-medium text-slate-800 line-clamp-2 mb-2" title={product.title}>
            {product.title}
          </h3>
        </Link>
        
        <div className="mt-auto flex items-center justify-between pt-4">
          <span className="font-bold text-xl text-slate-900">${product.price.toFixed(2)}</span>
          <button 
            onClick={() => addToCart(product)}
            className="p-2.5 bg-slate-100 hover:bg-primary-600 text-slate-700 hover:text-white rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            title="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
