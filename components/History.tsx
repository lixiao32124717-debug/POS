import React from 'react';
import { Transaction } from '../types';
import { Calendar, Receipt, Trash2 } from 'lucide-react';

interface HistoryProps {
  transactions: Transaction[];
  onDeleteTransaction: (id: string) => void;
}

const History: React.FC<HistoryProps> = ({ transactions, onDeleteTransaction }) => {
  return (
    <div className="flex-1 bg-gray-50 h-screen overflow-hidden flex flex-col pb-16 md:pb-0">
      <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">订单历史</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
             <Receipt size={64} className="mb-4 opacity-50" />
            <p>暂无订单记录</p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl mx-auto">
            {[...transactions].reverse().map((tx) => (
              <div key={tx.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group relative">
                
                <button 
                  onClick={() => onDeleteTransaction(tx.id)}
                  className="absolute top-4 right-4 text-gray-300 hover:text-red-500 p-2 opacity-0 group-hover:opacity-100 transition-all"
                  title="删除订单"
                >
                  <Trash2 size={18} />
                </button>

                <div className="flex justify-between items-start mb-4 border-b border-gray-50 pb-4 pr-10">
                  <div>
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Calendar size={14} />
                      {new Date(tx.date).toLocaleString('zh-CN')}
                    </div>
                    <span className="text-xs font-mono bg-gray-100 px-2 py-0.5 rounded text-gray-600">ID: {tx.id}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-800">¥{tx.total.toFixed(2)}</div>
                    <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700 font-medium">
                      {tx.paymentMethod === 'wechat' ? '微信支付' : 
                       tx.paymentMethod === 'alipay' ? '支付宝' :
                       tx.paymentMethod === 'card' ? '银行卡' : '现金'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {tx.items.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-sm">
                      <span className="text-gray-700">
                        {item.name} <span className="text-gray-400">x{item.quantity}</span>
                      </span>
                      <span className="text-gray-600">¥{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
                
                {tx.aiNote && (
                  <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100 relative">
                     <div className="absolute -top-2 left-4 px-2 bg-indigo-50 text-indigo-500 text-xs font-bold">
                        Gemini 祝福
                     </div>
                     <p className="text-indigo-800 text-sm italic">"{tx.aiNote}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;