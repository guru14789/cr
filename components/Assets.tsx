
import React, { useState } from 'react';
import { Search, Plus, Filter, Download, MoreVertical, Edit2, Trash2, Calendar, ChevronDown, CheckCircle, Clock, RotateCcw } from 'lucide-react';
import { mockAssets } from '../services/mockData';
import { Asset } from '../types';

export const Assets: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [statusFilter, setStatusFilter] = useState('All');

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          asset.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.assetId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || asset.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Asset['status']) => {
      switch(status) {
          case 'Approved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
          case 'Pending': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800';
          case 'Returned': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
          default: return 'bg-slate-100 text-slate-700 border border-slate-200';
      }
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this asset?')) {
        setAssets(prev => prev.filter(a => a.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Assets</h1>
           <span className="bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold border border-primary-100 dark:border-primary-800">
               Asset List : {assets.length}
           </span>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-sm font-medium">
                <span className="hidden sm:inline">Export</span> <ChevronDown className="w-4 h-4" />
             </button>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-900 hover:bg-indigo-800 text-white rounded-xl shadow-lg shadow-indigo-500/20 transition-all hover:scale-105 font-medium text-sm">
                <Plus className="w-4 h-4 stroke-[3]" /> Add Asset
             </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row justify-between gap-4 items-center">
         <div className="flex-1 w-full flex gap-4">
             <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                   type="text" 
                   placeholder="Search..." 
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                   className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white"
                />
             </div>
             <div className="hidden md:flex items-center gap-2 bg-slate-50 dark:bg-slate-700 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-600">
                 <Calendar className="w-4 h-4 text-slate-400" />
                 <span className="text-sm text-slate-600 dark:text-slate-300">11/27/2025 - 12/03/2025</span>
             </div>
         </div>
         
         <div className="flex gap-3 w-full md:w-auto">
             <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 text-sm font-medium">
                <Filter className="w-4 h-4" /> Filters
             </button>
             <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 bg-white dark:bg-slate-800 text-sm font-medium">
                Sort By : Recent <ChevronDown className="w-4 h-4" />
             </button>
         </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200">
                     <th className="px-6 py-4">Asset ID</th>
                     <th className="px-6 py-4">Asset User</th>
                     <th className="px-6 py-4">Assets</th>
                     <th className="px-6 py-4">Purchase Date</th>
                     <th className="px-6 py-4">Warrenty</th>
                     <th className="px-6 py-4">Warranty End</th>
                     <th className="px-6 py-4">Amount</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredAssets.map(asset => (
                     <tr key={asset.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group">
                        <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-300">
                           {asset.assetId}
                        </td>
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <img src={asset.userImage} alt={asset.user} className="w-8 h-8 rounded-full border border-slate-200 dark:border-slate-600" />
                              <span className="text-sm font-bold text-slate-800 dark:text-white">{asset.user}</span>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                           {asset.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                           {asset.purchaseDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                           {asset.warranty}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                           {asset.warrantyEnd}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                           ${asset.amount}
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${getStatusColor(asset.status)}`}>
                              {asset.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <button className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 rounded transition-colors">
                              <MoreVertical className="w-4 h-4" />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
         
         {/* Pagination Footer */}
         <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800">
            <div className="flex items-center gap-2">
                <span>Row Per Page</span>
                <select className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded px-2 py-1 outline-none focus:border-primary-500">
                    <option>10</option>
                    <option>20</option>
                    <option>50</option>
                </select>
                <span className="ml-2">Entries</span>
            </div>
            <div className="flex items-center gap-2">
                <button className="p-2 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors">
                    <ChevronDown className="w-4 h-4 rotate-90" />
                </button>
                <div className="w-8 h-8 bg-indigo-900 text-white rounded flex items-center justify-center font-medium shadow-sm">
                    1
                </div>
                <button className="p-2 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 transition-colors">
                    <ChevronDown className="w-4 h-4 -rotate-90" />
                </button>
            </div>
         </div>
      </div>
    </div>
  );
};
