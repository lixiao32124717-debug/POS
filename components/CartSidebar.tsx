import React, { useMemo } from 'react';
import { Trash2, Plus, Minus, ShoppingCart, CreditCard, X, ChevronDown } from 'lucide-react';
import { CartItem } from '../types';

interface CartSidebarProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onCheckout: () => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onCheckout,
  isOpen = true,
  onClose
}) => {
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.price * item.quantity, 0), [cart]);
  const totalQuantity = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);
  const tax = subtotal * 0.0; // Assuming tax included or 0 for simplicity in this demo
  const total = subtotal + tax;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className={`md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />
      
      {/* Sidebar Content */}
      <div className={`
        fixed inset-x-0 bottom-0 top-16 md:top-0 md:relative md:w-96 md:h-screen 
        bg-white shadow-2xl flex flex-col border-l border-gray-200 z-50 
        transition-transform duration-300 ease-in-out transform
        ${isOpen ? 'translate-y-0 md:translate-x-0' : 'translate-y-full md:translate-x-0'}
        md:transform-none rounded-t-2xl md:rounded-none
      `}>
        {/* Header */}
        <div className="p-4 md:p-6 border-b border-gray-100 bg-white flex justify-between items-center rounded-t-2xl md:rounded-none">
          <div>
            <div className="flex justify-between items-center gap-2">
              <h2 className="text-xl font-bold flex items-center gap-2 text-gray-800">
                <ShoppingCart className="text-indigo-600" />
                当前订单
              </h2>
            </div>
            <p className="text-xs text-gray-400 mt-1">订单号: #{Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}</p>
          </div>
          
          <div className="flex items-center gap-3">
             <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded text-xs font-bold whitespace-nowrap">
                {totalQuantity} 件商品
             </span>
             {/* Mobile Close Button */}
             <button 
                onClick={onClose}
                className="md:hidden p-2 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <ChevronDown size={24} />
              </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24 md:pb-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 opacity-60">
              <ShoppingCart size={64} className="mb-4" />
              <p>购物车是空的</p>
              <p className="text-sm mt-2">请从左侧选择商品</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 bg-gray-50 p-3 rounded-xl border border-gray-100 hover:border-indigo-100 transition-colors">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover bg-white" />
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                      <div className="text-xs text-gray-500 mt-0.5">
                        ¥{item.price.toFixed(2)} / 份
                      </div>
                    </div>
                    <div className="text-right">
                       <span className="text-xs text-gray-400 block mb-0.5">小计</span>
                       <span className="font-bold text-gray-800">¥{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex items-center gap-2 bg-white rounded-lg border border-gray-200 p-1">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 md:w-6 md:h-6 rounded flex items-center justify-center hover:bg-gray-100 text-gray-600"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-semibold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 md:w-6 md:h-6 rounded flex items-center justify-center hover:bg-gray-100 text-gray-600"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-red-400 hover:text-red-600 p-2 md:p-1"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Calculation */}
        <div className="p-6 bg-gray-50 border-t border-gray-200 absolute bottom-0 w-full md:relative">
          <div className="space-y-2 mb-4 hidden md:block">
            <div className="flex justify-between text-gray-500 text-sm">
              <span>商品数量</span>
              <span>{totalQuantity} 件</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>小计</span>
              <span>¥{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-500 text-sm">
              <span>税费 (0%)</span>
              <span>¥{tax.toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-between text-gray-800 font-bold text-xl pt-2 border-t border-gray-200 mb-4 md:mb-4">
            <span>总计</span>
            <span className="text-indigo-600">¥{total.toFixed(2)}</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
              <button
                  onClick={onClearCart}
                  disabled={cart.length === 0}
                  className="py-3 px-4 border border-red-200 text-red-500 rounded-xl font-semibold hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                  <Trash2 size={18} />
                  清空
              </button>
              <button
                  onClick={onCheckout}
                  disabled={cart.length === 0}
                  className="py-3 px-4 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                  <CreditCard size={18} />
                  结算
              </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;