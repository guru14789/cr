
import React from 'react';
import { FileText, Download, Filter, Calendar } from 'lucide-react';
import { mockReports } from '../services/mockData';

export const Reports: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Reports Center</h1>
          <p className="text-slate-500 dark:text-slate-400">Generate and download clinical and operational reports.</p>
        </div>
      </div>

      {/* Report Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
         {['Financial', 'Clinical', 'Operational', 'HR'].map((cat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:border-indigo-200 dark:hover:border-indigo-800 cursor-pointer transition-colors group">
               <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-3 group-hover:scale-110 transition-transform">
                  <FileText className="w-5 h-5" />
               </div>
               <h3 className="font-bold text-slate-800 dark:text-white">{cat} Reports</h3>
               <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">View all {cat.toLowerCase()} analytics</p>
            </div>
         ))}
      </div>

      {/* Recent Reports Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
         <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-white">Generated Reports</h3>
            <div className="flex gap-2">
               <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                  <Calendar className="w-3 h-3" /> Date Range
               </button>
               <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700">
                  <Filter className="w-3 h-3" /> Filter
               </button>
            </div>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50 dark:bg-slate-700/50 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase">
                     <th className="px-6 py-4">Report Name</th>
                     <th className="px-6 py-4">Category</th>
                     <th className="px-6 py-4">Generated Date</th>
                     <th className="px-6 py-4">Format</th>
                     <th className="px-6 py-4">Size</th>
                     <th className="px-6 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {mockReports.map((rpt, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">{rpt.name}</td>
                        <td className="px-6 py-4">
                           <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-medium text-slate-600 dark:text-slate-300">{rpt.category}</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{rpt.generatedDate}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400 uppercase">{rpt.format}</td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{rpt.size}</td>
                        <td className="px-6 py-4 text-right">
                           <button className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 flex items-center justify-end gap-1 text-sm font-medium">
                              <Download className="w-4 h-4" /> Download
                           </button>
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
