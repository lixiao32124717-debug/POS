import { Product, Category } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: '美式咖啡', price: 25, category: Category.COFFEE, image: 'https://picsum.photos/200/200?random=1', color: 'bg-amber-100' },
  { id: '2', name: '拿铁', price: 32, category: Category.COFFEE, image: 'https://picsum.photos/200/200?random=2', color: 'bg-orange-100' },
  { id: '3', name: '卡布奇诺', price: 32, category: Category.COFFEE, image: 'https://picsum.photos/200/200?random=3', color: 'bg-orange-50' },
  { id: '4', name: '焦糖玛奇朵', price: 35, category: Category.COFFEE, image: 'https://picsum.photos/200/200?random=4', color: 'bg-amber-50' },
  { id: '5', name: '伯爵红茶', price: 22, category: Category.TEA, image: 'https://picsum.photos/200/200?random=5', color: 'bg-red-50' },
  { id: '6', name: '芝士奶盖绿', price: 28, category: Category.TEA, image: 'https://picsum.photos/200/200?random=6', color: 'bg-green-50' },
  { id: '7', name: '草莓蛋糕', price: 38, category: Category.DESSERT, image: 'https://picsum.photos/200/200?random=7', color: 'bg-pink-50' },
  { id: '8', name: '提拉米苏', price: 42, category: Category.DESSERT, image: 'https://picsum.photos/200/200?random=8', color: 'bg-stone-100' },
  { id: '9', name: '凯撒沙拉', price: 45, category: Category.FOOD, image: 'https://picsum.photos/200/200?random=9', color: 'bg-lime-50' },
  { id: '10', name: '牛肉三明治', price: 55, category: Category.FOOD, image: 'https://picsum.photos/200/200?random=10', color: 'bg-yellow-50' },
  { id: '11', name: '薯条', price: 18, category: Category.SNACK, image: 'https://picsum.photos/200/200?random=11', color: 'bg-yellow-100' },
  { id: '12', name: '炸鸡块', price: 22, category: Category.SNACK, image: 'https://picsum.photos/200/200?random=12', color: 'bg-orange-200' },
];

export const CATEGORIES = Object.values(Category);
