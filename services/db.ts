import { Product, CartItem, Transaction } from '../types';
import { MOCK_PRODUCTS } from '../constants';

// 数据库接口定义：为了方便未来切换到 Firebase/Supabase 等云端数据库
interface DatabaseService {
  getProducts(): Promise<Product[]>;
  getTransactions(): Promise<Transaction[]>;
  saveTransaction(transaction: Transaction): Promise<void>;
  getCart(): Promise<CartItem[]>;
  saveCart(cart: CartItem[]): Promise<void>;
  clearCart(): Promise<void>;
}

const STORAGE_KEYS = {
  PRODUCTS: 'easypos_products_v1',
  TRANSACTIONS: 'easypos_transactions_v1',
  CART: 'easypos_cart_v1',
};

// 本地存储实现 (模拟云端数据库行为)
export const db: DatabaseService = {
  getProducts: async () => {
    // 模拟网络延迟，让体验更真实
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const stored = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (stored) {
      return JSON.parse(stored);
    }
    // 如果没有数据，初始化默认商品数据
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(MOCK_PRODUCTS));
    return MOCK_PRODUCTS;
  },

  getTransactions: async () => {
    const stored = localStorage.getItem(STORAGE_KEYS.TRANSACTIONS);
    return stored ? JSON.parse(stored) : [];
  },

  saveTransaction: async (transaction) => {
    // 获取当前所有订单，添加新订单，然后保存
    const transactions = await db.getTransactions();
    transactions.push(transaction);
    localStorage.setItem(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(transactions));
  },

  getCart: async () => {
    const stored = localStorage.getItem(STORAGE_KEYS.CART);
    return stored ? JSON.parse(stored) : [];
  },

  saveCart: async (cart) => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  },
  
  clearCart: async () => {
    localStorage.removeItem(STORAGE_KEYS.CART);
  }
};