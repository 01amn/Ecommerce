import { Link } from 'react-router-dom';
import { ShoppingCart, Search, Store } from 'lucide-react';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { ProductContext } from '../context/ProductContext';

const Navbar = () => {
  const { cartItemCount } = useContext(CartContext);
  const { searchQuery, setSearchQuery } = useContext(ProductContext);

  return (
    <nav className="bg-white shadow sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition">
          <Store className="w-8 h-8" />
          <span className="font-bold text-xl hidden sm:block">LuxeCart</span>
        </Link>
        
        <div className="flex-1 max-w-md mx-4 relative">
          <input 
            type="text"
            placeholder="Search products..."
            className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary-500 focus:bg-white transition outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-slate-400 w-5 h-5" />
        </div>

        <Link to="/cart" className="relative p-2 text-slate-600 hover:text-primary-600 hover:bg-slate-100 rounded-full transition">
          <ShoppingCart className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center transform translate-x-1 -translate-y-1">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
