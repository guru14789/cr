
import React, { useState } from 'react';
import { 
  Plus, Search, MoreVertical, Edit, Trash2, Users, 
  Activity, HeartPulse, Brain, Bone, Baby, Smile, Sun, Ear, BrainCircuit, Stethoscope, Layers,
  LayoutGrid, List, ChevronDown, Filter, ArrowUpRight
} from 'lucide-react';
import { mockDepartments } from '../services/mockData';
import { Department } from '../types';

export const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'All' | 'Active' | 'Inactive'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Stats Calculations
  const totalDepts = departments.length;
  const activeDocs = departments.reduce((acc, curr) => acc + curr.doctorCount, 0);
  const totalStaff = departments.reduce((acc, curr) => acc + curr.staffCount, 0);

  const getIcon = (iconName: string) => {
    switch(iconName) {
        case 'HeartPulse': return <HeartPulse className="w-6 h-6" />;
        case 'Brain': return <Brain className="w-6 h-6" />;
        case 'Bone': return <Bone className="w-6 h-6" />;
        case 'Baby': return <Baby className="w-6 h-6" />;
        case 'Smile': return <Smile className="w-6 h-6" />;
        case 'Sun': return <Sun className="w-6 h-6" />;
        case 'Ear': return <Ear className="w-6 h-6" />;
        case 'BrainCircuit': return <BrainCircuit className="w-6 h-6" />;
        default: return <Stethoscope className="w-6 h-6" />;
    }
  };

  const getIconColor = (iconName: string) => {
    switch(iconName) {
        case 'HeartPulse': return 'text-rose-500 bg-rose-50 dark:bg-rose-900/20';
        case 'Brain': return 'text-violet-500 bg-violet-50 dark:bg-violet-900/20';
        case 'Bone': return 'text-slate-500 bg-slate-100 dark:bg-slate-700/50';
        case 'Baby': return 'text-pink-500 bg-pink-50 dark:bg-pink-900/20';
        case 'Smile': return 'text-amber-500 bg-amber-50 dark:bg-amber-900/20';
        case 'Sun': return 'text-orange-500 bg-orange-50 dark:bg-orange-900/20';
        case 'Ear': return 'text-cyan-500 bg-cyan-50 dark:bg-cyan-900/20';
        case 'BrainCircuit': return 'text-indigo-500 bg-indigo-50 dark:bg-indigo-900/20';
        default: return 'text-primary bg-primary-50 dark:bg-primary-900/20';
    }
  };

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          dept.headOfDept.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTab = activeTab === 'All' || dept.status === activeTab;
    return matchesSearch && matchesTab;
  });

  const handleDelete = (id: string) => {
     if(window.confirm('Are you sure you want to delete this department?')) {
        setDepartments(prev => prev.filter(d => d.id !== id));
     }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Departments</h1>
           <p className="text-slate-500 dark:text-slate-400">Manage hospital departments, heads, and resources.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:scale-105 font-medium text-sm">
           <Plus className="w-4 h-4 stroke-[3]" /> Add Department
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-primary-200 transition-all relative overflow-hidden">
            <div className="relative z-10">
               <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wide">Total Departments</p>
               <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">{totalDepts}</h3>
               <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-2"><ArrowUpRight className="w-3 h-3" /> +2 New</span>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary group-hover:scale-110 transition-transform">
               <Layers className="w-8 h-8" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-emerald-200 transition-all relative overflow-hidden">
            <div className="relative z-10">
               <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wide">Total Doctors</p>
               <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">{activeDocs}</h3>
               <span className="text-xs font-medium text-emerald-600 flex items-center gap-1 mt-2"><ArrowUpRight className="w-3 h-3" /> +5% Growth</span>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400 group-hover:scale-110 transition-transform">
               <Stethoscope className="w-8 h-8" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-sky-200 transition-all relative overflow-hidden">
            <div className="relative z-10">
               <p className="text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wide">Support Staff</p>
               <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">{totalStaff}</h3>
               <span className="text-xs font-medium text-slate-400 flex items-center gap-1 mt-2">Stable</span>
            </div>
            <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl text-sky-600 dark:text-sky-400 group-hover:scale-110 transition-transform">
               <Users className="w-8 h-8" />
            </div>
         </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800">
         <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
               type="text" 
               placeholder="Search department or head..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-white text-sm transition-all"
            />
         </div>
         
         <div className="flex flex-wrap items-center gap-3">
            <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                {['All', 'Active', 'Inactive'].map((tab) => (
                   <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${
                         activeTab === tab 
                         ? 'bg-white dark:bg-slate-600 text-slate-800 dark:text-white shadow-sm' 
                         : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                      }`}
                   >
                      {tab}
                   </button>
                ))}
            </div>

            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1 hidden md:block"></div>

            <div className="flex bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-1 shadow-sm">
                <button
                   onClick={() => setViewMode('grid')}
                   className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                   <LayoutGrid className="w-4 h-4" />
                </button>
                <button
                   onClick={() => setViewMode('list')}
                   className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-primary-50 dark:bg-primary-900/20 text-primary' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
                >
                   <List className="w-4 h-4" />
                </button>
            </div>
         </div>
      </div>

      {/* View Mode: GRID */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
           {filteredDepartments.map((dept) => (
              <div key={dept.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-xl transition-all group hover:-translate-y-1 duration-300 flex flex-col">
                 {/* Card Header */}
                 <div className="p-6 flex justify-between items-start">
                    <div className="flex gap-4 items-start">
                       <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:rotate-3 ${getIconColor(dept.icon)}`}>
                          {getIcon(dept.icon)}
                       </div>
                       <div>
                          <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary transition-colors">{dept.name}</h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed h-8">
                             {dept.description}
                          </p>
                       </div>
                    </div>
                    <div className="relative">
                       <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                          <MoreVertical className="w-5 h-5" />
                       </button>
                    </div>
                 </div>

                 {/* Head of Dept Section */}
                 <div className="px-6 py-3 mx-6 bg-slate-50/50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-slate-700/50 flex items-center gap-3">
                     <img 
                        src={dept.headImage || `https://ui-avatars.com/api/?name=${dept.headOfDept}`} 
                        alt={dept.headOfDept} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm"
                     />
                     <div className="flex-1 min-w-0">
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Head of Dept</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200 truncate">{dept.headOfDept}</p>
                     </div>
                 </div>

                 {/* Card Footer Stats */}
                 <div className="p-6 mt-auto">
                    <div className="grid grid-cols-2 gap-4">
                       <div className="flex flex-col gap-1">
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                             <Stethoscope className="w-3.5 h-3.5 text-primary" /> Doctors
                          </p>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-primary h-full rounded-full" style={{width: '70%'}}></div>
                          </div>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{dept.doctorCount} <span className="text-[10px] font-normal text-slate-400">Members</span></p>
                       </div>
                       
                       <div className="flex flex-col gap-1">
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1">
                             <Users className="w-3.5 h-3.5 text-sky-500" /> Staff
                          </p>
                          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden">
                             <div className="bg-sky-500 h-full rounded-full" style={{width: '50%'}}></div>
                          </div>
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{dept.staffCount} <span className="text-[10px] font-normal text-slate-400">Members</span></p>
                       </div>
                    </div>
                    
                    <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex justify-between items-center">
                        <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${dept.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-700 dark:text-slate-400'}`}>
                           {dept.status}
                        </span>
                        <button className="text-xs font-bold text-primary hover:text-primary-700 flex items-center gap-1 transition-colors">
                           View Details <ArrowUpRight className="w-3 h-3" />
                        </button>
                    </div>
                 </div>
              </div>
           ))}
        </div>
      )}

      {/* View Mode: LIST */}
      {viewMode === 'list' && (
         <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                  <thead>
                     <tr className="bg-slate-50/50 dark:bg-slate-700/30 border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                        <th className="px-6 py-4">Department Name</th>
                        <th className="px-6 py-4">Head of Department</th>
                        <th className="px-6 py-4">Team Size</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700 text-sm">
                     {filteredDepartments.map((dept) => (
                        <tr key={dept.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors group">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-4">
                                 <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${getIconColor(dept.icon)}`}>
                                    {getIcon(dept.icon)}
                                 </div>
                                 <div>
                                    <h4 className="font-bold text-slate-800 dark:text-white">{dept.name}</h4>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">{dept.id}</p>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <img src={dept.headImage} alt="" className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-600" />
                                 <span className="font-medium text-slate-700 dark:text-slate-200">{dept.headOfDept}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-6">
                                 <div className="flex items-center gap-2" title="Doctors">
                                    <Stethoscope className="w-4 h-4 text-primary" />
                                    <span className="font-bold text-slate-700 dark:text-slate-300">{dept.doctorCount}</span>
                                 </div>
                                 <div className="flex items-center gap-2" title="Staff">
                                    <Users className="w-4 h-4 text-sky-500" />
                                    <span className="font-bold text-slate-700 dark:text-slate-300">{dept.staffCount}</span>
                                 </div>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span className={`text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-full border ${dept.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400' : 'bg-slate-100 text-slate-500 border-slate-200 dark:bg-slate-700 dark:text-slate-400'}`}>
                                 {dept.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                 <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                                    <Edit className="w-4 h-4" />
                                 </button>
                                 <button onClick={() => handleDelete(dept.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">
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
      )}
    </div>
  );
};
