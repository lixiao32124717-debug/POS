import React from 'react';
import { Database, Cloud, Wifi, Smartphone, Server } from 'lucide-react';

const Settings: React.FC = () => {
  return (
    <div className="flex-1 bg-gray-50 h-screen overflow-hidden flex flex-col pb-16 md:pb-0">
      <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">系统设置</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-2xl mx-auto space-y-6">
          
          {/* Database Configuration Section */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Database className="text-indigo-600" size={20} />
              数据存储
            </h2>
            
            <div className="flex items-center gap-4 p-4 bg-green-50 border border-green-100 rounded-lg mb-6">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Smartphone size={20} />
              </div>
              <div>
                <h3 className="font-bold text-green-800">本地持久化模式</h3>
                <p className="text-sm text-green-600">数据已保存在当前浏览器中，刷新不会丢失。</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-100 rounded-lg opacity-60 cursor-not-allowed bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-200 rounded text-gray-500">
                    <Cloud size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-700">云端同步 (Firebase)</h4>
                    <p className="text-xs text-gray-500">将数据实时同步到云端服务器</p>
                  </div>
                </div>
                <button disabled className="px-3 py-1 bg-gray-200 text-gray-500 text-xs rounded font-medium">
                  即将推出
                </button>
              </div>
            </div>
          </div>

          {/* System Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
             <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Server className="text-gray-600" size={20} />
              系统信息
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500 block mb-1">版本号</span>
                <span className="font-mono font-medium">v1.2.0</span>
              </div>
              <div className="p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-500 block mb-1">运行环境</span>
                <span className="font-mono font-medium">Web Client</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;