import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex-1 h-screen overflow-hidden flex flex-col bg-gray-50 pb-28 md:pb-0">
      {/* Header / Filter Bar */}
      <div className="p-4 md:p-6 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 md:mb-6 gap-4">
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">商品列表</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-sm"
            />
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full">
          <button
            onClick={() => setSelectedCategory('全部')}
            className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0
              ${selectedCategory === '全部' 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
          >
            全部
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 md:px-5 py-1.5 md:py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0
                ${selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
          {filteredProducts.map(product => (
            <div
              key={product.id}
              onClick={() => onAddToCart(product)}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-3 cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-all duration-200 active:scale-95 group flex flex-col h-full"
            >
              <div className={`h-28 md:h-32 rounded-lg mb-3 overflow-hidden relative ${product.color} flex-shrink-0`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="flex flex-col flex-1 justify-between">
                <div>
                  <h3 className="font-bold text-gray-800 truncate text-sm md:text-base">{product.name}</h3>
                  <p className="text-xs text-gray-500 mb-2">{product.category}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-indigo-600 font-bold text-sm md:text-base">¥{product.price.toFixed(2)}</span>
                  <button className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Search size={48} className="mb-4 opacity-50" />
            <p>未找到相关商品</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductGrid;