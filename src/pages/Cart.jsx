import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { CartContext } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cart, cartTotal, clearCart } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-primary-50 p-6 rounded-full mb-6">
          <ShoppingBag className="w-16 h-16 text-primary-500" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Your cart is empty</h2>
        <p className="text-slate-500 mb-8 max-w-sm text-center">
          Looks like you haven't added anything to your cart yet. Explore our products and find something you love!
        </p>
        <Link 
          to="/" 
          className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-8 rounded-full transition shadow hover:shadow-lg flex items-center gap-2"
        >
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-800 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="hidden sm:flex items-center text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 pb-4 border-b">
              <div className="w-24 shrink-0">Product</div>
              <div className="flex-1 ml-4">Details</div>
              <div className="w-32 text-center">Quantity</div>
              <div className="w-24 text-right">Total</div>
            </div>
            
            <div className="space-y-4">
              {cart.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          
          <button 
            onClick={clearCart}
            className="text-red-500 hover:text-red-700 font-medium hover:underline transition"
          >
            Clear entire cart
          </button>
        </div>
        
        <div className="w-full lg:w-80 shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
            <h2 className="text-xl font-bold text-slate-800 mb-6 pb-4 border-b">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span className="font-medium">Free</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Tax</span>
                <span className="font-medium">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="pt-4 border-t flex justify-between">
                <span className="text-lg font-bold text-slate-800">Total</span>
                <span className="text-lg font-bold text-primary-600">${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
            
            <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-xl transition shadow hover:shadow-lg flex items-center justify-center gap-2">
              Proceed to Checkout
            </button>
            
            <Link to="/" className="w-full block text-center mt-4 text-primary-600 hover:text-primary-700 font-medium transition">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
