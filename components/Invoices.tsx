
import React, { useState } from 'react';
import { Search, Download, Eye, Printer, Plus, Filter, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { mockInvoicesList } from '../services/mockData';

export const Invoices: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Paid': return 'bg-green-100 text-green-700 border-green-200';
      case 'Pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Overdue': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const filteredInvoices = mockInvoicesList.filter(inv => 
    inv.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.items.join(' ').toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Invoices</h1>
          <p className="text-slate-500 dark:text-slate-400">Manage patient billing and payments.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition-colors">
          <Plus className="w-4 h-4" /> Create Invoice
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Invoiced</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">$12,450</h3>
            </div>
            <div className="p-3 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400">
               <Printer className="w-6 h-6" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Received Amount</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">$8,200</h3>
            </div>
            <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
               <CheckCircle className="w-6 h-6" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex items-center justify-between">
            <div>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Amount</p>
               <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">$4,250</h3>
            </div>
            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg text-yellow-600 dark:text-yellow-400">
               <Clock className="w-6 h-6" />
            </div>
         </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-4">
         <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-4">
            <div className="relative w-full md:w-80">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
               <input 
                  type="text" 
                  placeholder="Search invoice # or items..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white"
               />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
               <Filter className="w-4 h-4" /> Filter
            </button>
         </div>

         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                     <th className="px-6 py-4">Invoice ID</th>
                     <th className="px-6 py-4">Date</th>
                     <th className="px-6 py-4">Items</th>
                     <th className="px-6 py-4">Amount</th>
                     <th className="px-6 py-4">Mode</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredInvoices.map((inv, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 font-mono text-sm text-indigo-600 dark:text-indigo-400 font-medium">{inv.id}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{inv.date}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300 max-w-xs truncate">{inv.items.join(', ')}</td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-700 dark:text-slate-200">${inv.amount}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{inv.mode || 'N/A'}</td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(inv.status)}`}>
                              {inv.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                              <button className="p-2 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-slate-700 rounded-lg transition-colors" title="View">
                                 <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors" title="Print">
                                 <Printer className="w-4 h-4" />
                              </button>
                           </div>
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
