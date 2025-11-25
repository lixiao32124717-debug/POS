import React from 'react';
import { LayoutGrid, History, Settings, LogOut, Store, Package } from 'lucide-react';
import { Tab } from '../types';

interface SidebarProps {
  activeTab: Tab;
  setActiveTab: (tab: Tab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'pos', icon: Store, label: '收银台' },
    { id: 'products', icon: Package, label: '商品' },
    { id: 'history', icon: History, label: '订单' },
    { id: 'dashboard', icon: LayoutGrid, label: '报表' },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex w-20 bg-slate-900 flex-col items-center py-6 h-screen sticky top-0 shadow-xl z-20">
        <div className="mb-8 text-white bg-indigo-600 p-2 rounded-xl">
          <Store size={28} />
        </div>
        
        <nav className="flex-1 w-full flex flex-col gap-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex flex-col items-center justify-center py-3 transition-all duration-200 relative group
                ${activeTab === item.id 
                  ? 'text-indigo-400 bg-slate-800 border-l-4 border-indigo-400' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
            >
              <item.icon size={24} />
              <span className="text-xs mt-1 font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 w-full">
           <div className="flex flex-col items-center mb-2" title="数据存储: 本地">
              <div className="w-2 h-2 rounded-full bg-green-500 mb-1 animate-pulse"></div>
              <span className="text-[10px] text-slate-500">已保存</span>
           </div>

           <button 
              onClick={() => setActiveTab('settings')}
              className={`w-full flex flex-col items-center justify-center py-3 transition-colors
                ${activeTab === 'settings' ? 'text-indigo-400 bg-slate-800' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
            >
              <Settings size={24} />
              <span className="text-xs mt-1">设置</span>
            </button>
            <button className="w-full flex flex-col items-center justify-center py-3 text-red-400 hover:text-red-300 hover:bg-slate-800 transition-colors">
              <LogOut size={24} />
              <span className="text-xs mt-1">退出</span>
            </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 h-16 flex justify-around items-center z-40 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as Tab)}
            className={`flex flex-col items-center justify-center w-full h-full transition-colors
              ${activeTab === item.id 
                ? 'text-indigo-400 bg-slate-800/50' 
                : 'text-slate-400'
              }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] mt-1 font-medium">{item.label}</span>
          </button>
        ))}
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex flex-col items-center justify-center w-full h-full transition-colors
            ${activeTab === 'settings' ? 'text-indigo-400 bg-slate-800/50' : 'text-slate-400'}`}
        >
           <Settings size={20} />
           <span className="text-[10px] mt-1">设置</span>
        </button>
      </div>
    </>
  );
};

export default Sidebar;