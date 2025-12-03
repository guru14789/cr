
import React, { useState } from 'react';
import { 
  Plus, Search, MoreVertical, Edit, Trash2, Users, 
  Activity, HeartPulse, Brain, Bone, Baby, Smile, Sun, Ear, BrainCircuit, Stethoscope, Layers
} from 'lucide-react';
import { mockDepartments } from '../services/mockData';
import { Department } from '../types';

export const Departments: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState<'Active' | 'Inactive' | 'All'>('All');

  const getIcon = (iconName: string) => {
    switch(iconName) {
        case 'HeartPulse': return <HeartPulse className="w-6 h-6 text-rose-500" />;
        case 'Brain': return <Brain className="w-6 h-6 text-violet-500" />;
        case 'Bone': return <Bone className="w-6 h-6 text-slate-500" />;
        case 'Baby': return <Baby className="w-6 h-6 text-sky-500" />;
        case 'Smile': return <Smile className="w-6 h-6 text-amber-500" />;
        case 'Sun': return <Sun className="w-6 h-6 text-orange-500" />;
        case 'Ear': return <Ear className="w-6 h-6 text-teal-500" />;
        case 'BrainCircuit': return <BrainCircuit className="w-6 h-6 text-indigo-500" />;
        default: return <Stethoscope className="w-6 h-6 text-emerald-500" />;
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
           <p className="text-slate-500 dark:text-slate-400">Manage hospital departments and their heads.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:scale-105 font-medium text-sm">
           <Plus className="w-4 h-4 stroke-[3]" /> Add Department
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-primary-200 transition-all">
            <div>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">Total Departments</p>
               <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-primary transition-colors">{departments.length}</h3>
            </div>
            <div className="p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl text-primary">
               <Layers className="w-8 h-8" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-emerald-200 transition-all">
            <div>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">Active Doctors</p>
               <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-emerald-600 transition-colors">
                  {departments.reduce((acc, curr) => acc + curr.doctorCount, 0)}
               </h3>
            </div>
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-600 dark:text-emerald-400">
               <Stethoscope className="w-8 h-8" />
            </div>
         </div>
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex items-center justify-between group hover:border-sky-200 transition-all">
            <div>
               <p className="text-slate-500 dark:text-slate-400 text-sm font-bold uppercase tracking-wide">Total Staff</p>
               <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1 group-hover:text-sky-600 transition-colors">
                  {departments.reduce((acc, curr) => acc + curr.staffCount, 0)}
               </h3>
            </div>
            <div className="p-4 bg-sky-50 dark:bg-sky-900/20 rounded-xl text-sky-600 dark:text-sky-400">
               <Users className="w-8 h-8" />
            </div>
         </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col md:flex-row justify-between gap-4 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800">
         <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
               type="text" 
               placeholder="Search department..." 
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-white text-sm transition-all"
            />
         </div>
         <div className="flex gap-2">
            {['All', 'Active', 'Inactive'].map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`px-4 py-2 text-sm font-bold rounded-lg transition-colors ${
                     activeTab === tab 
                     ? 'bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-400 border border-primary-100 dark:border-primary-800' 
                     : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
               >
                  {tab}
               </button>
            ))}
         </div>
      </div>

      {/* Department Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {filteredDepartments.map((dept) => (
            <div key={dept.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-soft hover:shadow-lg transition-all group hover:-translate-y-1 duration-300">
               {/* Card Header */}
               <div className="p-5 border-b border-slate-50 dark:border-slate-700/50 flex justify-between items-start">
                  <div className="flex gap-4 items-center">
                     <div className="w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-700/50 flex items-center justify-center shrink-0 shadow-sm">
                        {getIcon(dept.icon)}
                     </div>
                     <div>
                        <h3 className="font-bold text-lg text-slate-800 dark:text-white group-hover:text-primary transition-colors">{dept.name}</h3>
                        <div className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded-full inline-block mt-1 border ${dept.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-700 dark:text-slate-400'}`}>
                           {dept.status}
                        </div>
                     </div>
                  </div>
                  <div className="relative">
                     <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                        <MoreVertical className="w-5 h-5" />
                     </button>
                  </div>
               </div>

               {/* Card Body */}
               <div className="p-5 space-y-5">
                  <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 min-h-[40px] leading-relaxed">
                     {dept.description}
                  </p>
                  
                  <div className="flex items-center gap-3 bg-slate-50/50 dark:bg-slate-700/30 p-3 rounded-xl border border-slate-100 dark:border-slate-700/50">
                     <img 
                        src={dept.headImage || `https://ui-avatars.com/api/?name=${dept.headOfDept}`} 
                        alt={dept.headOfDept} 
                        className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-600 shadow-sm"
                     />
                     <div>
                        <p className="text-[10px] text-slate-400 uppercase tracking-wide font-bold">Head of Dept</p>
                        <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{dept.headOfDept}</p>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="text-center p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Doctors</p>
                        <p className="text-xl font-bold text-primary dark:text-primary-400 mt-1">{dept.doctorCount}</p>
                     </div>
                     <div className="text-center p-3 rounded-xl border border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Support Staff</p>
                        <p className="text-xl font-bold text-sky-600 dark:text-sky-400 mt-1">{dept.staffCount}</p>
                     </div>
                  </div>
               </div>
            </div>
         ))}
      </div>
    </div>
  );
};
