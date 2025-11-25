import React from 'react';
import { Transaction } from '../types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, DollarSign, ShoppingBag } from 'lucide-react';

interface DashboardProps {
  transactions: Transaction[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const Dashboard: React.FC<DashboardProps> = ({ transactions }) => {
  // Calculate basic stats
  const totalSales = transactions.reduce((acc, curr) => acc + curr.total, 0);
  const totalOrders = transactions.length;
  const avgOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;

  // Prepare data for charts
  const categoryData = transactions.reduce((acc: any, tx) => {
    tx.items.forEach(item => {
      acc[item.category] = (acc[item.category] || 0) + (item.price * item.quantity);
    });
    return acc;
  }, {});

  const pieData = Object.keys(categoryData).map(key => ({
    name: key,
    value: categoryData[key]
  }));

  // Simple time-based data (mocking daily data based on tx count for visual)
  const salesData = [
      { name: '10:00', amount: totalSales * 0.1 },
      { name: '12:00', amount: totalSales * 0.4 },
      { name: '14:00', amount: totalSales * 0.2 },
      { name: '16:00', amount: totalSales * 0.2 },
      { name: '18:00', amount: totalSales * 0.1 },
  ];

  return (
    <div className="flex-1 bg-gray-50 h-screen overflow-hidden flex flex-col pb-16 md:pb-0">
       <div className="p-6 bg-white border-b border-gray-200 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-800">销售报表</h1>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-indigo-100 text-indigo-600 rounded-lg">
                    <DollarSign size={24} />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">总销售额</p>
                    <p className="text-2xl font-bold text-gray-800">¥{totalSales.toFixed(2)}</p>
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                    <ShoppingBag size={24} />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">总订单数</p>
                    <p className="text-2xl font-bold text-gray-800">{totalOrders}</p>
                </div>
            </div>
             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
                    <TrendingUp size={24} />
                </div>
                <div>
                    <p className="text-gray-500 text-sm">平均客单价</p>
                    <p className="text-2xl font-bold text-gray-800">¥{avgOrderValue.toFixed(2)}</p>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
                <h3 className="font-bold text-gray-700 mb-4">今日销售趋势</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af'}} />
                        <Tooltip 
                            cursor={{fill: '#f3f4f6'}}
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                        />
                        <Bar dataKey="amount" fill="#6366f1" radius={[4, 4, 0, 0]} barSize={40} />
                    </BarChart>
                </ResponsiveContainer>
            </div>

             <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96">
                <h3 className="font-bold text-gray-700 mb-4">品类销售占比</h3>
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={5}
                            dataKey="value"
                        >
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                    </PieChart>
                </ResponsiveContainer>
                 <div className="flex justify-center gap-4 flex-wrap mt-2">
                    {pieData.map((entry, index) => (
                        <div key={index} className="flex items-center gap-1 text-xs text-gray-500">
                            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                            {entry.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;