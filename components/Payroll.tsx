
import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, MoreVertical, FileText, 
  DollarSign, CheckCircle, Clock, ArrowUpRight, ArrowDownRight, ChevronDown
} from 'lucide-react';
import { mockPayrolls } from '../services/mockData';
import { PayrollRecord } from '../types';

export const Payroll: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [payrolls, setPayrolls] = useState<PayrollRecord[]>(mockPayrolls);
  const [sortOrder, setSortOrder] = useState<'Recent' | 'Salary High' | 'Salary Low'>('Recent');

  const filteredPayrolls = payrolls.filter(record => 
    record.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    record.email.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => {
      if (sortOrder === 'Salary High') return b.salary - a.salary;
      if (sortOrder === 'Salary Low') return a.salary - b.salary;
      return new Date(b.joiningDate).getTime() - new Date(a.joiningDate).getTime();
  });

  const getStatusColor = (status: PayrollRecord['status']) => {
      switch(status) {
          case 'Paid': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
          case 'Pending': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800';
          case 'Processing': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
          default: return 'bg-slate-100 text-slate-700 border border-slate-200';
      }
  };

  const handleGenerateSlip = (id: string) => {
      alert(`Generating payslip for ${id}...`);
  };

  // Stats
  const totalPayroll = payrolls.reduce((acc, curr) => acc + curr.salary, 0);
  const totalPaid = payrolls.filter(p => p.status === 'Paid').reduce((acc, curr) => acc + curr.salary, 0);
  const pendingCount = payrolls.filter(p => p.status === 'Pending').length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <div className="flex items-center gap-3">
               <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Payroll Management</h1>
               <span className="bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold border border-primary-100 dark:border-primary-800">
                   Total Records: {payrolls.length}
               </span>
           </div>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:scale-105 font-medium text-sm">
            <Plus className="w-4 h-4 stroke-[3]" /> Add Salary
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-primary-200 transition-all">
              <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">Total Payroll</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-primary transition-colors">${totalPayroll.toLocaleString()}</h3>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
                     <ArrowUpRight className="w-3 h-3" /> +12% vs last month
                  </div>
              </div>
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary">
                  <DollarSign className="w-8 h-8" />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-emerald-200 transition-all">
              <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">Paid Salary</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-emerald-600 transition-colors">${totalPaid.toLocaleString()}</h3>
                  <div className="flex items-center gap-1 text-xs text-emerald-600 mt-2 font-medium">
                     <CheckCircle className="w-3 h-3" /> Disbursed
                  </div>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600">
                  <CheckCircle className="w-8 h-8" />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-rose-200 transition-all">
              <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">Pending Slips</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-rose-500 transition-colors">{pendingCount}</h3>
                  <div className="flex items-center gap-1 text-xs text-rose-500 mt-2 font-medium">
                     <ArrowDownRight className="w-3 h-3" /> Needs Attention
                  </div>
              </div>
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl text-rose-500">
                  <Clock className="w-8 h-8" />
              </div>
          </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800">
         <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
               type="text" 
               placeholder="Search employee..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-white text-sm transition-all"
            />
         </div>
         <div className="flex gap-3 w-full md:w-auto">
             <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm bg-white dark:bg-slate-800 font-medium transition-colors">
                <Filter className="w-4 h-4" /> Filters
             </button>
             <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm bg-white dark:bg-slate-800 font-medium transition-colors">
                    Sort By : {sortOrder} <ChevronDown className="w-4 h-4" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-40 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-xl rounded-xl hidden group-hover:block z-10 p-1">
                    {['Recent', 'Salary High', 'Salary Low'].map((opt) => (
                        <button 
                            key={opt}
                            onClick={() => setSortOrder(opt as any)}
                            className="w-full text-left px-3 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg font-medium transition-colors"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
             </div>
         </div>
      </div>

      {/* Payroll Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                     <th className="px-6 py-4">Employee</th>
                     <th className="px-6 py-4">Email</th>
                     <th className="px-6 py-4">Joining Date</th>
                     <th className="px-6 py-4">Role</th>
                     <th className="px-6 py-4">Salary</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {filteredPayrolls.map(record => (
                     <tr key={record.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <img src={record.image} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                              <div>
                                 <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{record.employeeName}</h4>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                           {record.email}
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                           {record.joiningDate}
                        </td>
                        <td className="px-6 py-4">
                           <span className="px-2 py-1 bg-slate-100 dark:bg-slate-700 rounded text-xs font-bold text-slate-600 dark:text-slate-300">{record.role}</span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">
                           ${record.salary.toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(record.status)}`}>
                              {record.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end items-center gap-2">
                              <button 
                                onClick={() => handleGenerateSlip(record.id)}
                                className="px-3 py-1.5 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-primary dark:hover:text-primary-400 transition-colors"
                              >
                                 Generate Slip
                              </button>
                              <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                 <MoreVertical className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredPayrolls.length === 0 && (
                     <tr>
                        <td colSpan={7} className="text-center py-16 text-slate-500 dark:text-slate-400">
                           <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                              <DollarSign className="w-6 h-6 opacity-30" />
                           </div>
                           <p className="font-medium">No payroll records found.</p>
                        </td>
                     </tr>
                  )}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};
