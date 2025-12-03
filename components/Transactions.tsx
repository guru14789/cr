
import React, { useState } from 'react';
import { Search, ArrowUpRight, ArrowDownRight, CreditCard, Filter } from 'lucide-react';
import { mockTransactions } from '../services/mockData';

export const Transactions: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Completed': return 'text-green-600 bg-green-50 border-green-200 dark:bg-green-900/30 dark:text-green-400';
      case 'Failed': return 'text-red-600 bg-red-50 border-red-200 dark:bg-red-900/30 dark:text-red-400';
      case 'Refunded': return 'text-slate-600 bg-slate-100 border-slate-200 dark:bg-slate-700 dark:text-slate-400';
      default: return 'text-slate-600';
    }
  };

  const filteredData = mockTransactions.filter(t => 
    t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Transactions</h1>
          <p className="text-slate-500 dark:text-slate-400">Real-time payment logs and status.</p>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
         <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col md:flex-row gap-4 justify-between bg-slate-50 dark:bg-slate-900">
            <div className="relative w-full md:w-96">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Search transaction ID or name..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
               />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                <Filter className="w-4 h-4" /> Filter Date
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-800">
                     <th className="px-6 py-4">Transaction ID</th>
                     <th className="px-6 py-4">Patient Name</th>
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4">Description</th>
                     <th className="px-6 py-4">Amount</th>
                     <th className="px-6 py-4">Method</th>
                     <th className="px-6 py-4">Status</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredData.map((trx, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-sm text-slate-600 dark:text-slate-400">{trx.id}</td>
                        <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">{trx.patientName}</td>
                        <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">{trx.date}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{trx.description}</td>
                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">${trx.amount}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 flex items-center gap-2">
                           <CreditCard className="w-4 h-4 text-slate-400" /> {trx.method}
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold border ${getStatusColor(trx.status)}`}>
                              {trx.status}
                           </span>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
