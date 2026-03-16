import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart, Check, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { ProductContext } from '../context/ProductContext';
import { CartContext } from '../context/CartContext';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, loading } = useContext(ProductContext);
  const { addToCart, cart } = useContext(CartContext);
  
  const [product, setProduct] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const found = products.find(p => p.id === parseInt(id));
      if (found) setProduct(found);
    } else if (!loading) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
        .catch(err => console.error(err));
    }
  }, [id, products, loading]);

  if (loading || !product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const isInCart = cart.some(item => item.id === product.id);

  return (
    <div className="max-w-6xl mx-auto">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition mb-6 group w-fit"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        Back to shopping
      </button>

      <div className="bg-white rounded-2xl shadow-sm p-6 md:p-10">
        <div className="flex flex-col md:flex-row gap-10 lg:gap-16">
          <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-slate-50 rounded-2xl">
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-h-[400px] object-contain hover:scale-105 transition duration-500"
            />
          </div>

          <div className="w-full md:w-1/2 flex flex-col">
            <span className="text-sm font-semibold text-primary-600 uppercase tracking-widest mb-2">
              {product.category}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4 leading-tight">
              {product.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1.5 rounded-full font-medium text-sm">
                <Star className="w-4 h-4 fill-current" />
                {product.rating?.rate} 
                <span className="text-amber-600/70 ml-1 border-l border-amber-200 pl-2">
                  {product.rating?.count} reviews
                </span>
              </div>
            </div>

            <div className="text-4xl font-bold text-slate-900 mb-8 border-b border-slate-100 pb-8">
              ${product.price.toFixed(2)}
            </div>

            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            <button
              onClick={handleAddToCart}
              className={`w-full py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-lg hover:shadow-xl ${
                isAdded 
                  ? 'bg-emerald-500 text-white shadow-emerald-500/30'
                  : 'bg-primary-600 hover:bg-primary-700 text-white shadow-primary-600/30'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-6 h-6" /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart className="w-6 h-6" /> Add to Cart
                </>
              )}
            </button>

            {isInCart && !isAdded && (
              <p className="text-center mt-3 text-sm text-slate-500">
                This item is already in your cart. <Link to="/cart" className="text-primary-600 font-medium hover:underline">View Cart</Link>
              </p>
            )}

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-100">
              <div className="flex items-start gap-3">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">Free Shipping</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Orders over $50</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg shrink-0">
                  <RotateCcw className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">30 Day Returns</h4>
                  <p className="text-xs text-slate-500 mt-0.5">No questions asked</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-slate-900">Secure Payment</h4>
                  <p className="text-xs text-slate-500 mt-0.5">100% secure</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
