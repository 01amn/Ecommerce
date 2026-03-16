import React, { useContext } from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useContext(CartContext);

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-xl shadow-sm mb-4 border border-slate-100">
      <Link to={`/product/${item.id}`} className="w-24 h-24 shrink-0 bg-white p-2 border border-slate-100 rounded-lg">
        <img src={item.image} alt={item.title} className="w-full h-full object-contain" />
      </Link>
      
      <div className="flex-1 text-center sm:text-left">
        <Link to={`/product/${item.id}`} className="hover:text-primary-600 transition block">
          <h3 className="font-medium text-slate-800 line-clamp-2 md:line-clamp-1">{item.title}</h3>
        </Link>
        <p className="text-primary-600 font-bold mt-1">${item.price.toFixed(2)}</p>
      </div>
      
      <div className="flex items-center gap-3 bg-slate-50 p-1 rounded-lg">
        <button 
          onClick={() => updateQuantity(item.id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded disabled:opacity-50 transition"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-8 text-center font-medium text-slate-700">{item.quantity}</span>
        <button 
          onClick={() => updateQuantity(item.id, item.quantity + 1)}
          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-200 rounded transition"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      
      <div className="text-right sm:w-24 mt-2 sm:mt-0">
        <p className="font-bold text-slate-800 mb-2">${(item.price * item.quantity).toFixed(2)}</p>
        <button 
          onClick={() => removeFromCart(item.id)}
          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1.5 rounded-full transition w-fit inline-flex"
          title="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
