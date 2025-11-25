import React, { useState } from 'react';
import { CheckCircle, X, Loader2 } from 'lucide-react';

interface PaymentModalProps {
  total: number;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (method: string) => Promise<void>;
  isProcessing: boolean;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  total,
  isOpen,
  onClose,
  onConfirm,
  isProcessing
}) => {
  const [method, setMethod] = useState('wechat');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-fade-in-up">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xl font-bold text-gray-800">支付确认</h3>
          <button onClick={onClose} disabled={isProcessing} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="p-8 flex flex-col items-center">
          <span className="text-gray-500 text-sm mb-1">支付金额</span>
          <span className="text-4xl font-bold text-indigo-600 mb-8">¥{total.toFixed(2)}</span>

          <div className="grid grid-cols-2 gap-4 w-full mb-8">
            <button
              onClick={() => setMethod('wechat')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                ${method === 'wechat' ? 'border-green-500 bg-green-50 text-green-700' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
            >
              <div className="w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center font-bold">W</div>
              <span className="font-medium">微信支付</span>
            </button>
            <button
              onClick={() => setMethod('alipay')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                ${method === 'alipay' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
            >
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">A</div>
              <span className="font-medium">支付宝</span>
            </button>
            <button
              onClick={() => setMethod('card')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                ${method === 'card' ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
            >
               <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold">C</div>
              <span className="font-medium">银行卡</span>
            </button>
            <button
              onClick={() => setMethod('cash')}
              className={`p-4 rounded-xl border-2 flex flex-col items-center gap-2 transition-all
                ${method === 'cash' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-100 hover:border-gray-200 text-gray-600'}`}
            >
               <div className="w-8 h-8 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold">￥</div>
              <span className="font-medium">现金</span>
            </button>
          </div>

          <button
            onClick={() => onConfirm(method)}
            disabled={isProcessing}
            className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
          >
            {isProcessing ? (
                <>
                    <Loader2 className="animate-spin" />
                    正在处理...
                </>
            ) : (
                <>
                    确认支付
                </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal;