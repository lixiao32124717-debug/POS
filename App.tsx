import React, { useState, useEffect } from 'react';
import { CartItem, Product, Tab, Transaction } from './types';
import Sidebar from './components/Sidebar';
import ProductGrid from './components/ProductGrid';
import CartSidebar from './components/CartSidebar';
import History from './components/History';
import PaymentModal from './components/PaymentModal';
import Dashboard from './components/Dashboard';
import Settings from './components/Settings';
import ProductManagement from './components/ProductManagement';
import { generateReceiptMessage } from './services/geminiService';
import { db } from './services/db';
import { ShoppingCart, ChevronUp, Loader2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('pos');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // UI States
  const [isLoading, setIsLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 1. Load Data on Mount
  useEffect(() => {
    const loadData = async () => {
      try {
        const [loadedProducts, loadedTransactions, loadedCart] = await Promise.all([
          db.getProducts(),
          db.getTransactions(),
          db.getCart()
        ]);
        setProducts(loadedProducts);
        setTransactions(loadedTransactions);
        setCart(loadedCart);
      } catch (error) {
        console.error("Failed to load data", error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // 2. Auto-save Cart when it changes
  useEffect(() => {
    if (!isLoading) {
      db.saveCart(cart);
    }
  }, [cart, isLoading]);

  // Product Actions
  const handleAddProduct = async (newProduct: Product) => {
    try {
      await db.saveProduct(newProduct);
      setProducts(prev => [...prev, newProduct]);
    } catch (e) {
      alert("添加商品失败");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm("确定要删除这个商品吗？")) {
      try {
        await db.deleteProduct(id);
        setProducts(prev => prev.filter(p => p.id !== id));
        // Also remove from cart if present
        setCart(prev => prev.filter(item => item.id !== id));
      } catch (e) {
        alert("删除商品失败");
      }
    }
  };

  // Cart Actions
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : item; 
        }
        return item;
      });
    });
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Transaction Actions
  const handleCheckoutClick = () => {
    if (cart.length > 0) {
      setIsPaymentModalOpen(true);
      setIsCartOpen(false);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (window.confirm("确定要删除这条订单记录吗？此操作不可恢复。")) {
      try {
        await db.deleteTransaction(id);
        setTransactions(prev => prev.filter(t => t.id !== id));
      } catch (e) {
        alert("删除订单失败");
      }
    }
  };

  const handlePaymentConfirm = async (method: string) => {
    setIsProcessingPayment(true);
    
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const aiNote = await generateReceiptMessage(cart);

    const newTransaction: Transaction = {
      id: Date.now().toString(),
      items: [...cart],
      total,
      date: new Date().toISOString(),
      paymentMethod: method,
      aiNote: aiNote
    };

    try {
      await db.saveTransaction(newTransaction);
      setTransactions(prev => [...prev, newTransaction]);
      setCart([]);
      setIsPaymentModalOpen(false);
    } catch (e) {
      console.error("Transaction failed", e);
      alert("交易保存失败，请重试");
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50 text-indigo-600 flex-col gap-4">
        <Loader2 className="animate-spin" size={48} />
        <p className="font-medium text-gray-500">正在加载系统数据...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-100 font-sans">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {activeTab === 'pos' && (
        <main className="flex-1 flex overflow-hidden relative">
          <ProductGrid 
            products={products} 
            onAddToCart={addToCart}
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
          />
          <CartSidebar
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            onClearCart={clearCart}
            onCheckout={handleCheckoutClick}
            isOpen={isCartOpen}
            onClose={() => setIsCartOpen(false)}
          />
          
          <div className="md:hidden fixed bottom-16 left-0 right-0 bg-white border-t border-gray-200 p-3 shadow-lg z-30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-600 text-white p-2 rounded-full relative">
                <ShoppingCart id="cart-icon-mobile" size={20} />
                {cartQuantity > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                    {cartQuantity}
                  </span>
                )}
              </div>
              <div className="flex flex-col">
                <span className="text-xs text-gray-500">总计</span>
                <span className="text-lg font-bold text-gray-800">¥{cartTotal.toFixed(2)}</span>
              </div>
            </div>
            <button 
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2 hover:bg-indigo-700 active:scale-95 transition-all"
            >
              <span>{isCartOpen ? '关闭' : '查看'}</span>
              <ChevronUp size={16} className={`transition-transform duration-300 ${isCartOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </main>
      )}

      {activeTab === 'products' && (
        <ProductManagement 
          products={products} 
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
        />
      )}

      {activeTab === 'history' && (
        <History transactions={transactions} onDeleteTransaction={handleDeleteTransaction} />
      )}
      
      {activeTab === 'dashboard' && (
        <Dashboard transactions={transactions} />
      )}
      
      {activeTab === 'settings' && (
        <Settings />
      )}

      <PaymentModal
        isOpen={isPaymentModalOpen}
        total={cartTotal}
        onClose={() => setIsPaymentModalOpen(false)}
        onConfirm={handlePaymentConfirm}
        isProcessing={isProcessingPayment}
      />
    </div>
  );
};

export default App;