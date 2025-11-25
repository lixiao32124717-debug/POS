import React, { useState } from 'react';
import { Product, Category } from '../types';
import { Search, Plus, Trash2, Tag, Filter, X, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../constants';

interface ProductManagementProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (id: string) => void;
}

const ProductManagement: React.FC<ProductManagementProps> = ({ products, onAddProduct, onDeleteProduct }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Form State
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
    <div className="flex-1 bg-gray-50 h-screen overflow-hidden flex flex-col pb-16 md:pb-0">
      {/* Header */}
      <div className="p-6 bg-white border-b border-gray-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
             <Tag className="text-indigo-600" />
             商品管理
           </h1>
           <p className="text-gray-500 text-sm mt-1">管理系统中的所有商品项</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 shadow-lg shadow-indigo-200 transition-all"
        >
          <Plus size={18} />
          添加商品
        </button>
      </div>

      {/* Filters */}
      <div className="p-4 bg-white border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center">
        <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="搜索商品名称..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-lg bg-gray-100 border-transparent focus:bg-white focus:ring-2 focus:ring-indigo-500 outline-none text-sm transition-all"
            />
        </div>
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
            <Filter size={16} className="text-gray-400 flex-shrink-0" />
            <div className="flex gap-2">
                <button
                    onClick={() => setSelectedCategory('全部')}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                    ${selectedCategory === '全部' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                    全部
                </button>
                {CATEGORIES.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors
                        ${selectedCategory === cat ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs text-gray-500 uppercase tracking-wider">
                        <th className="p-4 font-medium">商品信息</th>
                        <th className="p-4 font-medium">分类</th>
                        <th className="p-4 font-medium text-right">单价</th>
                        <th className="p-4 font-medium text-center w-24">操作</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {filteredProducts.length === 0 ? (
                        <tr>
                            <td colSpan={4} className="p-8 text-center text-gray-400">
                                未找到匹配的商品
                            </td>
                        </tr>
                    ) : (
                        filteredProducts.map(product => (
                            <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                                <td className="p-4">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 ${product.color}`}>
                                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-800 text-sm">{product.name}</p>
                                            <p className="text-xs text-gray-400 font-mono">ID: {product.id}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="p-4">
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                        {product.category}
                                    </span>
                                </td>
                                <td className="p-4 text-right font-mono text-sm font-medium text-gray-600">
                                    ¥{product.price.toFixed(2)}
                                </td>
                                <td className="p-4 text-center">
                                    <button 
                                        onClick={() => onDeleteProduct(product.id)}
                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                        title="删除"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
      </div>

      {/* Add Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Plus size={20} className="text-indigo-600" />
                添加新商品
              </h3>
              <button onClick={() => setIsAddModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleCreateProduct} className="p-6 space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">商品名称</label>
                <input
                  type="text"
                  required
                  value={newProductName}
                  onChange={(e) => setNewProductName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-gray-50 focus:bg-white"
                  placeholder="例如：焦糖玛奇朵"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">价格 (¥)</label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={newProductPrice}
                      onChange={(e) => setNewProductPrice(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-gray-50 focus:bg-white"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wide">分类</label>
                    <select
                      value={newProductCategory}
                      onChange={(e) => setNewProductCategory(e.target.value as Category)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all text-sm bg-white"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
              </div>
              
              <div className="p-3 bg-blue-50 text-blue-700 text-xs rounded-lg flex items-start gap-2">
                 <ImageIcon size={16} className="mt-0.5 flex-shrink-0" />
                 <p>图片将根据商品名称随机生成。后续版本将支持自定义图片上传。</p>
              </div>

              <div className="pt-2">
                 <button
                  type="submit"
                  className="w-full py-3.5 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all transform active:scale-95"
                >
                  确认添加商品
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;