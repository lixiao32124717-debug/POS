import React, { useState } from 'react';
import { Search, Plus, X, Trash2, Image as ImageIcon } from 'lucide-react';
import { Product, Category } from '../types';
import { CATEGORIES } from '../constants';

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, onAddToCart, onAddProduct, onDeleteProduct }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Add Product Modal State
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState('');
  const [newProductCategory, setNewProductCategory] = useState<Category>(Category.COFFEE);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === '全部' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName || !newProductPrice) return;

    const colors = ['bg-amber-100', 'bg-orange-100', 'bg-red-50', 'bg-green-50', 'bg-pink-50', 'bg-blue-50', 'bg-purple-50'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const product: Product = {
      id: Date.now().toString(),
      name: newProductName,
      price: parseFloat(newProductPrice),
      category: newProductCategory,
      image: `https://picsum.photos/200/200?random=${Date.now()}`,
      color: randomColor
    };

    onAddProduct(product);
    setIsAddModalOpen(false);
    setNewProductName('');
    setNewProductPrice('');
  };

  return (
    <div className="flex-1 h-screen overflow-hidden flex flex-col bg-gray-50 pb-28 md:pb-0">
      {/* Header / Filter Bar */}
      <div className="p-4 bg-white border-b border-gray-200 shadow-sm z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <h1 className="text-xl font-bold text-gray-800">商品列表</h1>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="搜索商品..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all outline-none text-sm"
            />
          </div>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide w-full">
          <button
            onClick={() => setSelectedCategory('全部')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0
              ${selectedCategory === '全部' 
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
              }`}
          >
            全部
          </button>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0
                ${selectedCategory === cat 
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {/* Changed grid cols to allow more items (smaller items) */}
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          
          {/* Add Product Card */}
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-3 cursor-pointer hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-200 flex flex-col items-center justify-center text-gray-400 hover:text-indigo-500 min-h-[180px] group"
          >
            <div className="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-indigo-100 flex items-center justify-center mb-2 transition-colors">
              <Plus size={20} />
            </div>
            <span className="text-xs font-bold">添加商品</span>
          </button>

          {filteredProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-2 cursor-pointer hover:shadow-md hover:-translate-y-1 transition-all duration-200 active:scale-95 group flex flex-col h-full relative"
            >
               {/* Delete Button (visible on hover) */}
               <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteProduct(product.id);
                  }}
                  className="absolute top-1 right-1 z-20 bg-white/90 p-1.5 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                  title="删除商品"
               >
                 <Trash2 size={14} />
               </button>

              <div 
                onClick={() => onAddToCart(product)}
                className={`h-20 md:h-24 rounded-lg mb-2 overflow-hidden relative ${product.color} flex-shrink-0`}
              >
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover" 
                  loading="lazy"
                />
              </div>
              <div 
                onClick={() => onAddToCart(product)}
                className="flex flex-col flex-1 justify-between"
              >
                <div>
                  <h3 className="font-bold text-gray-800 truncate text-xs md:text-sm">{product.name}</h3>
                  <p className="text-[10px] text-gray-500 mb-1">{product.category}</p>
                </div>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-indigo-600 font-bold text-xs md:text-sm">¥{product.price.toFixed(2)}</span>
                  <div className="w-5 h-5 rounded-full bg-gray-100 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                    <Plus size={12} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400 mt-10">
            <Search size={32} className="mb-2 opacity-50" />
            <p className="text-sm">未找到相关商品</p>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden animate-fade-in-up">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800">添加新商品</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateProduct} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">商品名称</label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  placeholder="例如：冰美式"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">价格 (¥)</label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={newProductPrice}
                  onChange={(e) => setNewProductPrice(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm"
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">分类</label>
                <select
                  value={newProductCategory}
                  onChange={(e) => setNewProductCategory(e.target.value as Category)}
                  className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                 <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all"
                >
                  确认添加
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;