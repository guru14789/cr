
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Search, MoreVertical } from 'lucide-react';

interface LeaveType {
  id: string;
  name: string;
  daysAllowed: number;
  status: 'Active' | 'Inactive';
}

export const LeaveTypes: React.FC = () => {
  const [types, setTypes] = useState<LeaveType[]>([
    { id: 'LT-01', name: 'Casual Leave', daysAllowed: 12, status: 'Active' },
    { id: 'LT-02', name: 'Sick Leave', daysAllowed: 10, status: 'Active' },
    { id: 'LT-03', name: 'Maternity Leave', daysAllowed: 180, status: 'Active' },
    { id: 'LT-04', name: 'Paternity Leave', daysAllowed: 5, status: 'Active' },
    { id: 'LT-05', name: 'Unpaid Leave', daysAllowed: 0, status: 'Active' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTypes = types.filter(t => t.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Leave Types</h1>
           <p className="text-slate-500 dark:text-slate-400">Configure leave categories and entitlements.</p>
        </div>
        <button className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-colors">
           <Plus className="w-4 h-4" /> Add Leave Type
        </button>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
         <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-700/50">
             <div className="relative w-72">
                 <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                 <input 
                    type="text" 
                    placeholder="Search leave types..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 text-sm bg-white dark:bg-slate-800 text-slate-800 dark:text-white"
                 />
             </div>
         </div>
         <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                 <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase bg-slate-50 dark:bg-slate-800">
                        <th className="px-6 py-4">Name</th>
                        <th className="px-6 py-4">Days Allowed</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {filteredTypes.map(type => (
                        <tr key={type.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">{type.name}</td>
                            <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{type.daysAllowed} Days</td>
                            <td className="px-6 py-4">
                                <span className={`px-2 py-1 rounded text-xs font-medium ${type.status === 'Active' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600'}`}>
                                    {type.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex justify-end gap-2">
                                    <button className="p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors">
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                        <Trash2 className="w-4 h-4" />
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
