
import React, { useState } from 'react';
import { 
  Plus, Search, Filter, Download, MoreVertical, Edit, Trash2, 
  Mail, Phone, Briefcase, User, CheckCircle, XCircle, Clock
} from 'lucide-react';
import { mockStaffs } from '../services/mockData';
import { Staff } from '../types';

export const Staffs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [staffs, setStaffs] = useState<Staff[]>(mockStaffs);

  const roles = ['All', 'Nurse', 'Receptionist', 'Pharmacist', 'Lab Technician', 'Accountant', 'HR', 'Other'];
  const statuses = ['All', 'Active', 'On Leave', 'Resigned'];

  const filteredStaffs = staffs.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          staff.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === 'All' || staff.role === roleFilter;
    const matchesStatus = statusFilter === 'All' || staff.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getStatusColor = (status: Staff['status']) => {
      switch(status) {
          case 'Active': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
          case 'On Leave': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800';
          case 'Resigned': return 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400 border border-rose-200 dark:border-rose-800';
          default: return 'bg-slate-100 text-slate-700 border border-slate-200';
      }
  };

  const handleDelete = (id: string) => {
      if(window.confirm('Are you sure you want to remove this staff member?')) {
          setStaffs(prev => prev.filter(s => s.id !== id));
      }
  };

  // Stats calculation
  const totalStaff = staffs.length;
  const nurses = staffs.filter(s => s.role === 'Nurse').length;
  const activeStaff = staffs.filter(s => s.status === 'Active').length;

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Staff Management</h1>
           <p className="text-slate-500 dark:text-slate-400">Manage hospital staff, roles, and status.</p>
        </div>
        <div className="flex gap-3">
             <button className="flex items-center gap-2 px-4 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-sm font-medium">
                <Download className="w-4 h-4" /> Export
             </button>
             <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:scale-105 font-medium text-sm">
                <Plus className="w-4 h-4 stroke-[3]" /> Add Staff
             </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-primary-200 transition-all">
              <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">Total Staff</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-primary transition-colors">{totalStaff}</h3>
              </div>
              <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary">
                  <Briefcase className="w-8 h-8" />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-rose-200 transition-all">
              <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">Nurses</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-rose-500 transition-colors">{nurses}</h3>
              </div>
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 rounded-xl text-rose-500">
                  <User className="w-8 h-8" />
              </div>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-emerald-200 transition-all">
              <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">Active Now</p>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-emerald-600 transition-colors">{activeStaff}</h3>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600">
                  <CheckCircle className="w-8 h-8" />
              </div>
          </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800">
         <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
               type="text" 
               placeholder="Search staff by name or email..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-white text-sm transition-all"
            />
         </div>
         <div className="flex gap-3 w-full md:w-auto">
             <select 
               value={roleFilter}
               onChange={(e) => setRoleFilter(e.target.value)}
               className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-sm outline-none bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-100 focus:border-primary-300 cursor-pointer"
             >
                {roles.map(r => <option key={r} value={r}>{r === 'All' ? 'All Roles' : r}</option>)}
             </select>
             <select 
               value={statusFilter}
               onChange={(e) => setStatusFilter(e.target.value)}
               className="px-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-sm outline-none bg-white dark:bg-slate-800 focus:ring-2 focus:ring-primary-100 focus:border-primary-300 cursor-pointer"
             >
                {statuses.map(s => <option key={s} value={s}>{s === 'All' ? 'All Status' : s}</option>)}
             </select>
         </div>
      </div>

      {/* Staff Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                     <th className="px-6 py-4">Staff Member</th>
                     <th className="px-6 py-4">Designation</th>
                     <th className="px-6 py-4">Contact</th>
                     <th className="px-6 py-4">Join Date</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {filteredStaffs.map(staff => (
                     <tr key={staff.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <img src={staff.image} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-200 dark:border-slate-700" />
                              <div>
                                 <h4 className="font-bold text-slate-800 dark:text-white group-hover:text-primary transition-colors">{staff.name}</h4>
                                 <p className="text-xs text-slate-500 dark:text-slate-400">{staff.role}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4">
                           <p className="font-medium text-slate-700 dark:text-slate-300">{staff.designation}</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400">{staff.department}</p>
                        </td>
                        <td className="px-6 py-4">
                           <div className="space-y-1">
                              <p className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                 <Phone className="w-3 h-3 text-slate-400" /> {staff.phone}
                              </p>
                              <p className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
                                 <Mail className="w-3 h-3 text-slate-400" /> {staff.email}
                              </p>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300 font-medium">
                           {staff.joinDate}
                        </td>
                        <td className="px-6 py-4">
                           <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(staff.status)}`}>
                              {staff.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors" title="Edit">
                                 <Edit className="w-4 h-4" />
                              </button>
                              <button 
                                onClick={() => handleDelete(staff.id)}
                                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors" 
                                title="Delete"
                              >
                                 <Trash2 className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredStaffs.length === 0 && (
                     <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-500 dark:text-slate-400">
                           <div className="w-12 h-12 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Search className="w-6 h-6 opacity-30" />
                           </div>
                           <p className="font-medium">No staff members found.</p>
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
