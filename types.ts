export enum Category {
  COFFEE = '咖啡',
  TEA = '茶饮',
  DESSERT = '甜点',
  FOOD = '轻食',
  SNACK = '零食'
}

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  color: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Transaction {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  paymentMethod: string;
  aiNote?: string; // AI generated thank you note
}

export type Tab = 'pos' | 'history' | 'dashboard' | 'settings';