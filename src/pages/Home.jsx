import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';
import Sidebar from '../components/Sidebar';

const Home = () => {
  const { products, loading, error } = useContext(ProductContext);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-red-500">
        <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <Sidebar />
      <div className="flex-1">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse flex flex-col p-4 shadow-sm">
                <div className="bg-slate-200 h-48 rounded-lg mb-4"></div>
                <div className="bg-slate-200 h-4 rounded w-3/4 mb-2"></div>
                <div className="bg-slate-200 h-4 rounded w-1/2 mb-auto"></div>
                <div className="bg-slate-200 h-10 rounded mt-4"></div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[50vh] text-slate-500">
            <h2 className="text-xl font-medium mb-2">No products found</h2>
            <p>Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
