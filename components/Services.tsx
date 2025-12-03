
import React, { useState } from 'react';
import { Search, Plus, Filter, Download, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { mockServices } from '../services/mockData';
import { Service } from '../types';

export const Services: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [services, setServices] = useState<Service[]>(mockServices);

  const filteredServices = services.filter(service => 
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    service.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
        setServices(prev => prev.filter(s => s.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Services</h1>
           <span className="bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold border border-primary-100 dark:border-primary-800">
               Total Services : {services.length}
           </span>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-sm font-medium">
                <Download className="w-4 h-4" /> Export
             </button>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:scale-105 font-medium text-sm">
                <Plus className="w-4 h-4 stroke-[3]" /> New Services
             </button>
        </div>
      </div>

      {/* Search & Toolbar */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col md:flex-row justify-between gap-4">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
               type="text" 
               placeholder="Search service..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white transition-all"
            />
         </div>
         <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
            <Filter className="w-4 h-4" /> Filters
         </button>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50 border-b border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                     <th className="px-6 py-4">Service Name</th>
                     <th className="px-6 py-4">Department</th>
                     <th className="px-6 py-4">Price</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {filteredServices.map(service => (
                     <tr key={service.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 text-sm font-medium text-slate-700 dark:text-slate-200">
                           {service.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                           {service.department}
                        </td>
                        <td className="px-6 py-4 text-sm font-bold text-slate-800 dark:text-white">
                           ${service.price}
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2 py-1 rounded text-xs font-bold border ${
                               service.status === 'Active' 
                               ? 'bg-green-100 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' 
                               : 'bg-red-100 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-800'
                           }`}>
                              {service.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                               <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                                  <Edit2 className="w-4 h-4" />
                               </button>
                               <button 
                                 onClick={() => handleDelete(service.id)}
                                 className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                               >
                                  <Trash2 className="w-4 h-4" />
                               </button>
                               <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                                  <MoreVertical className="w-4 h-4" />
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
