
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area 
} from 'recharts';
import { TrendingUp, CreditCard, Activity } from 'lucide-react';

export const Income: React.FC = () => {
  const monthlyData = [
    { name: 'Jan', income: 4000, expense: 2400 },
    { name: 'Feb', income: 3000, expense: 1398 },
    { name: 'Mar', income: 2000, expense: 9800 },
    { name: 'Apr', income: 2780, expense: 3908 },
    { name: 'May', income: 1890, expense: 4800 },
    { name: 'Jun', income: 2390, expense: 3800 },
    { name: 'Jul', income: 3490, expense: 4300 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Income Analysis</h1>
          <p className="text-slate-500 dark:text-slate-400">Financial overview and revenue streams.</p>
        </div>
        <div className="px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium text-slate-600 dark:text-slate-300">
           Fiscal Year: 2024-2025
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-emerald-100 text-sm font-medium mb-1">Total Income</p>
            <h2 className="text-3xl font-bold">$128,450</h2>
            <div className="mt-4 flex items-center text-xs text-emerald-100 bg-white/20 w-fit px-2 py-1 rounded">
               <TrendingUp className="w-3 h-3 mr-1" /> +15% vs last month
            </div>
         </div>
         <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-blue-100 text-sm font-medium mb-1">Net Profit</p>
            <h2 className="text-3xl font-bold">$64,200</h2>
            <div className="mt-4 flex items-center text-xs text-blue-100 bg-white/20 w-fit px-2 py-1 rounded">
               <Activity className="w-3 h-3 mr-1" /> 50% Margin
            </div>
         </div>
         <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white shadow-lg">
            <p className="text-purple-100 text-sm font-medium mb-1">Pending Payments</p>
            <h2 className="text-3xl font-bold">$12,100</h2>
            <div className="mt-4 flex items-center text-xs text-purple-100 bg-white/20 w-fit px-2 py-1 rounded">
               <CreditCard className="w-3 h-3 mr-1" /> 18 Invoices
            </div>
         </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm min-w-0">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6">Revenue vs Expenses</h3>
            <div className="h-80 w-full min-w-0">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                     <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        cursor={{fill: 'transparent'}}
                     />
                     <Bar dataKey="income" fill="#10b981" radius={[4, 4, 0, 0]} name="Income" barSize={20} />
                     <Bar dataKey="expense" fill="#ef4444" radius={[4, 4, 0, 0]} name="Expense" barSize={20} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>

         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm min-w-0">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6">Profit Trend</h3>
            <div className="h-80 w-full min-w-0">
               <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyData}>
                     <defs>
                        <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                           <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                           <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                     <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                     <Area type="monotone" dataKey="income" stroke="#3b82f6" fillOpacity={1} fill="url(#colorIncome)" strokeWidth={3} />
                  </AreaChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>
    </div>
  );
};
