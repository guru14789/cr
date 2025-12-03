
import React, { useState } from 'react';
import { 
  Search, Filter, ArrowLeft, Clock, Activity, AlertCircle, Droplet, 
  ArrowUpDown, User, FileText, Phone, Download,
  CheckCircle, X, MoreVertical, CreditCard, Calendar, Stethoscope, MessageCircle,
  Plus, ChevronDown, Eye, Mail, MapPin, Edit, Trash2, Pill, File
} from 'lucide-react';
import { mockPatients } from '../services/mockData';
import { Patient, TagType, PatientStatus } from '../types';

interface PatientListProps {
  onAddPatient?: () => void;
}

const TABS = ['overview', 'timeline', 'documents', 'billing'] as const;
type TabType = typeof TABS[number];

export const PatientList: React.FC<PatientListProps> = ({ onAddPatient }) => {
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('All');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [sortConfig, setSortConfig] = useState<{ key: keyof Patient; direction: 'asc' | 'desc' } | null>(null);

  const getTagColor = (tag: TagType) => {
    switch (tag) {
      case TagType.VIP: return 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/30 dark:text-amber-400';
      case TagType.Chronic: return 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-900/30 dark:text-rose-400';
      case TagType.Insurance: return 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400';
      case TagType.Corporate: return 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400';
      default: return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-700 dark:text-slate-300';
    }
  };

  const getStatusColor = (status: PatientStatus) => {
    switch (status) {
      case PatientStatus.Active: return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800';
      case PatientStatus.Discharged: return 'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-600';
      case PatientStatus.IPD_Admitted: return 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400 border border-violet-200 dark:border-violet-800';
      case PatientStatus.Lead: return 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 border border-sky-200 dark:border-sky-800';
      default: return 'bg-slate-100 text-slate-600';
    }
  };

  const handlePatientClick = (patient: Patient) => {
    setSelectedPatient(patient);
    setViewMode('detail');
    setActiveTab('overview');
  };

  const handleBackToList = () => {
    setViewMode('list');
    setSelectedPatient(null);
  };

  const handleSort = (key: keyof Patient) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const filteredPatients = mockPatients.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            p.phone.includes(searchTerm);
      const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
      const matchesTag = selectedTag === 'All' || p.tags.includes(selectedTag as TagType);
      return matchesSearch && matchesStatus && matchesTag;
  }).sort((a, b) => {
    if (!sortConfig) return 0;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortConfig.direction === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }
    return 0;
  });

  // --- DETAIL VIEW ---
  if (viewMode === 'detail' && selectedPatient) {
    return (
      <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-10">
        <button onClick={handleBackToList} className="flex items-center gap-2 text-slate-500 hover:text-primary mb-4 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to List
        </button>

        <div className="flex flex-col xl:flex-row gap-6">
          {/* Left Sidebar Profile */}
          <div className="w-full xl:w-80 space-y-6">
             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 text-center relative overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-50 to-teal-50 dark:from-primary-900/20 dark:to-slate-800"></div>
                 <div className="relative inline-block mt-4">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${selectedPatient.name}&background=0d9488&color=fff&size=128`} 
                      alt={selectedPatient.name} 
                      className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white dark:border-slate-800 shadow-md"
                    />
                    <span className={`absolute bottom-1 right-1 w-5 h-5 rounded-full border-4 border-white dark:border-slate-800 ${selectedPatient.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                 </div>
                 <h2 className="text-xl font-bold text-slate-800 dark:text-white">{selectedPatient.name}</h2>
                 <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{selectedPatient.id} • {selectedPatient.age} Yrs • {selectedPatient.gender}</p>
                 
                 <div className="mt-6 flex gap-3 justify-center">
                    <button className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2.5 rounded-xl bg-primary-50 dark:bg-primary-900/20 text-primary hover:bg-primary hover:text-white transition-all shadow-sm">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                 </div>
             </div>

             <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 space-y-5">
                 <h3 className="font-bold text-slate-800 dark:text-white text-sm uppercase tracking-wide border-b border-slate-100 dark:border-slate-700 pb-2">Patient Details</h3>
                 <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                       <span className="text-slate-500 dark:text-slate-400">Phone</span>
                       <span className="font-medium text-slate-700 dark:text-slate-200">{selectedPatient.phone}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-slate-500 dark:text-slate-400">Email</span>
                       <span className="font-medium text-slate-700 dark:text-slate-200 truncate max-w-[150px]" title={selectedPatient.email}>{selectedPatient.email}</span>
                    </div>
                     <div className="flex justify-between items-start">
                       <span className="text-slate-500 dark:text-slate-400 shrink-0">Address</span>
                       <span className="font-medium text-slate-700 dark:text-slate-200 text-right max-w-[150px]">{selectedPatient.address}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-slate-500 dark:text-slate-400">City</span>
                       <span className="font-medium text-slate-700 dark:text-slate-200">{selectedPatient.city}</span>
                    </div>
                    <div className="flex justify-between items-center">
                       <span className="text-slate-500 dark:text-slate-400">Blood Type</span>
                       <span className="font-bold text-slate-800 dark:text-white flex items-center gap-1 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded"><Droplet className="w-3 h-3" /> {selectedPatient.bloodType}</span>
                    </div>
                    <div className="pt-2">
                       <span className="text-slate-500 dark:text-slate-400 block mb-2 text-xs uppercase font-bold">Tags</span>
                       <div className="flex flex-wrap gap-2">
                          {selectedPatient.tags.map(tag => (
                            <span key={tag} className={`text-[10px] px-2 py-1 rounded border ${getTagColor(tag)}`}>{tag}</span>
                          ))}
                       </div>
                    </div>
                 </div>
             </div>
          </div>

          {/* Right Main Content */}
          <div className="flex-1 min-w-0 bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex flex-col">
              {/* Tabs */}
              <div className="border-b border-slate-100 dark:border-slate-700 px-6 pt-2 flex gap-8 overflow-x-auto">
                 {TABS.map(tab => (
                   <button
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`py-4 text-sm font-bold capitalize transition-all relative ${activeTab === tab ? 'text-primary' : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'}`}
                   >
                     {tab}
                     {activeTab === tab && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary rounded-t-full"></span>}
                   </button>
                 ))}
              </div>

              {/* Tab Content */}
              <div className="p-6 md:p-8">
                 {activeTab === 'overview' && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2">
                       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                             <div className="flex items-center gap-2 mb-2">
                                <Activity className="w-4 h-4 text-blue-500" />
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Condition</span>
                             </div>
                             <p className="text-slate-800 dark:text-white font-bold">{selectedPatient.condition}</p>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                             <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-4 h-4 text-red-500" />
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Allergies</span>
                             </div>
                             <div className="flex flex-wrap gap-2">
                                {selectedPatient.allergies?.map((a, i) => (
                                   <span key={i} className="text-xs bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 px-2 py-1 rounded text-slate-700 dark:text-slate-200 font-medium">{a}</span>
                                )) || <span className="text-slate-500 text-sm">None</span>}
                             </div>
                          </div>
                          <div className="bg-slate-50 dark:bg-slate-700/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                             <div className="flex items-center gap-2 mb-2">
                                <Pill className="w-4 h-4 text-green-500" />
                                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">Medications</span>
                             </div>
                             <div className="flex flex-wrap gap-2">
                                {selectedPatient.medications?.map((m, i) => (
                                   <span key={i} className="text-xs bg-white dark:bg-slate-600 border border-slate-200 dark:border-slate-500 px-2 py-1 rounded text-slate-700 dark:text-slate-200 font-medium">{m}</span>
                                )) || <span className="text-slate-500 text-sm">None</span>}
                             </div>
                          </div>
                       </div>
                       
                       <div>
                          <h4 className="font-bold text-slate-800 dark:text-white mb-4 text-sm uppercase tracking-wide">Upcoming Appointments</h4>
                          <div className="bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl p-4 flex items-center gap-4 hover:shadow-md transition-all shadow-sm">
                             <div className="p-3 bg-primary-50 dark:bg-primary-900/20 text-primary rounded-xl">
                                <Calendar className="w-6 h-6" />
                             </div>
                             <div>
                                <h5 className="font-bold text-slate-800 dark:text-white">General Checkup</h5>
                                <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Dr. Anjali Desai • Tomorrow at 10:00 AM</p>
                             </div>
                             <button className="ml-auto px-4 py-2 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors">Reschedule</button>
                          </div>
                       </div>
                    </div>
                 )}

                 {activeTab === 'timeline' && (
                    <div className="space-y-8 pl-4 animate-in fade-in slide-in-from-bottom-2">
                       {selectedPatient.timeline?.map((event, idx) => (
                          <div key={idx} className="relative pl-8 border-l-2 border-slate-100 dark:border-slate-700 last:border-0 pb-2">
                             <div className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 border-white dark:border-slate-800 shadow-sm ${
                                event.type === 'Visit' ? 'bg-primary' : 
                                event.type === 'Lab' ? 'bg-purple-500' :
                                event.type === 'Surgery' ? 'bg-rose-500' : 'bg-emerald-500'
                             }`}></div>
                             <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 mb-1.5">
                                <h4 className="font-bold text-slate-800 dark:text-white text-sm">{event.title}</h4>
                                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-700 px-2 py-0.5 rounded border border-slate-100 dark:border-slate-600">{event.date}</span>
                             </div>
                             <p className="text-sm text-slate-600 dark:text-slate-300 mb-1 leading-relaxed">{event.description}</p>
                             {event.performedBy && <p className="text-xs text-slate-400 italic">By: {event.performedBy}</p>}
                          </div>
                       )) || <p className="text-slate-500 text-center py-8">No timeline events recorded.</p>}
                    </div>
                 )}

                 {activeTab === 'documents' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2">
                       {selectedPatient.documents?.map((doc, idx) => (
                          <div key={idx} className="border border-slate-100 dark:border-slate-700 rounded-xl p-4 flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group bg-slate-50/50 dark:bg-slate-800/50">
                              <div className="p-3 bg-white dark:bg-slate-700 text-orange-500 shadow-sm rounded-lg border border-slate-100 dark:border-slate-600">
                                  <FileText className="w-6 h-6" />
                              </div>
                              <div className="flex-1 min-w-0">
                                  <h5 className="font-bold text-slate-800 dark:text-white text-sm truncate">{doc.name}</h5>
                                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{doc.date} • {doc.size}</p>
                              </div>
                              <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors">
                                 <Download className="w-4 h-4" />
                              </button>
                          </div>
                       )) || <p className="text-slate-500 col-span-2 text-center py-8">No documents available.</p>}
                       
                       <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center text-slate-400 hover:border-primary hover:text-primary transition-all cursor-pointer min-h-[80px] bg-slate-50/50 dark:bg-slate-800/50">
                           <Plus className="w-6 h-6 mb-1" />
                           <span className="text-sm font-medium">Upload Document</span>
                       </div>
                    </div>
                 )}

                 {activeTab === 'billing' && (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                            <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl border border-emerald-100 dark:border-emerald-800">
                                <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wide">Total Paid</p>
                                <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-300 mt-1">$2,300</h3>
                            </div>
                            <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl border border-rose-100 dark:border-rose-800">
                                <p className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wide">Outstanding</p>
                                <h3 className="text-2xl font-bold text-rose-700 dark:text-rose-300 mt-1">$200</h3>
                            </div>
                        </div>

                        <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl overflow-hidden border border-slate-100 dark:border-slate-700">
                           <table className="w-full text-left text-sm">
                               <thead className="bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300 font-bold uppercase text-xs">
                                   <tr>
                                       <th className="p-4">Invoice ID</th>
                                       <th className="p-4">Date</th>
                                       <th className="p-4">Items</th>
                                       <th className="p-4">Status</th>
                                       <th className="p-4 text-right">Amount</th>
                                   </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                                   {selectedPatient.invoices?.map((inv, idx) => (
                                       <tr key={idx} className="hover:bg-white dark:hover:bg-slate-700 transition-colors">
                                           <td className="p-4 font-mono text-primary font-medium">{inv.id}</td>
                                           <td className="p-4 text-slate-600 dark:text-slate-300">{inv.date}</td>
                                           <td className="p-4 text-slate-600 dark:text-slate-300">{inv.items.join(', ')}</td>
                                           <td className="p-4">
                                               <span className={`px-2.5 py-1 rounded-full text-xs font-bold border ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : inv.status === 'Pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                                                   {inv.status}
                                               </span>
                                           </td>
                                           <td className="p-4 text-right font-bold text-slate-700 dark:text-white">${inv.amount}</td>
                                       </tr>
                                   ))}
                               </tbody>
                           </table>
                        </div>
                        {(!selectedPatient.invoices || selectedPatient.invoices.length === 0) && (
                            <p className="text-slate-500 text-center py-8">No invoices found.</p>
                        )}
                    </div>
                 )}
              </div>
          </div>
        </div>
      </div>
    );
  }

  // --- LIST VIEW ---
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Header Stats & Action */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Patients</h1>
            <span className="bg-primary-50 dark:bg-primary-900/30 text-primary dark:text-primary-400 px-3 py-1 rounded-full text-xs font-bold border border-primary-100 dark:border-primary-800">
               {mockPatients.length} Active
            </span>
        </div>
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm font-medium text-sm">
                <Download className="w-4 h-4" /> <span className="hidden sm:inline">Export</span>
            </button>
            <button 
                onClick={onAddPatient}
                className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:scale-105 font-medium text-sm"
            >
                <Plus className="w-4 h-4 stroke-[3]" /> Add Patient
            </button>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-4 flex flex-col md:flex-row gap-4 justify-between items-center">
         <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search by name, ID or phone..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 bg-slate-50/50 dark:bg-slate-900/50 text-slate-800 dark:text-white transition-all text-sm"
            />
         </div>
         
         <div className="flex gap-3 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
             <div className="relative">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 cursor-pointer"
                >
                    <option value="All">All Status</option>
                    {Object.values(PatientStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
             </div>

             <div className="relative">
                <select 
                  value={selectedTag}
                  onChange={(e) => setSelectedTag(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-medium text-slate-600 dark:text-slate-300 outline-none focus:border-primary-300 focus:ring-2 focus:ring-primary-100 cursor-pointer"
                >
                    <option value="All">All Types</option>
                    {Object.values(TagType).map(t => <option key={t} value={t}>{t}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
             </div>
         </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                     <th className="p-4 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('name')}>
                        <div className="flex items-center gap-1">Patient Name <ArrowUpDown className="w-3 h-3" /></div>
                     </th>
                     <th className="p-4 cursor-pointer hover:text-primary transition-colors" onClick={() => handleSort('id')}>
                        <div className="flex items-center gap-1">ID <ArrowUpDown className="w-3 h-3" /></div>
                     </th>
                     <th className="p-4">Contact</th>
                     <th className="p-4">Last Visit</th>
                     <th className="p-4">Status</th>
                     <th className="p-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
                  {filteredPatients.map(patient => (
                     <tr key={patient.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30 transition-colors group">
                        <td className="p-4">
                           <div className="flex items-center gap-4">
                              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center font-bold text-slate-500 dark:text-slate-300 shrink-0 border border-slate-200 dark:border-slate-600">
                                 {patient.name.charAt(0)}
                              </div>
                              <div className="min-w-0">
                                 <p 
                                   className="font-bold text-slate-800 dark:text-white cursor-pointer hover:text-primary transition-colors truncate"
                                   onClick={() => handlePatientClick(patient)}
                                 >
                                    {patient.name}
                                 </p>
                                 <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">{patient.age} Yrs, {patient.gender}</p>
                              </div>
                           </div>
                        </td>
                        <td className="p-4 font-mono text-slate-600 dark:text-slate-300 text-xs font-medium bg-slate-50 dark:bg-slate-800/50 w-fit rounded px-2 py-1 h-fit my-auto">
                           {patient.id}
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">
                           <p className="flex items-center gap-2"><Phone className="w-3 h-3 text-slate-400" /> {patient.phone}</p>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">
                           <p className="font-medium">{patient.lastVisit}</p>
                           <p className="text-xs text-slate-400 truncate max-w-[100px]" title={patient.condition}>{patient.condition}</p>
                        </td>
                        <td className="p-4">
                           <div className="flex flex-col gap-1.5 items-start">
                              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusColor(patient.status)}`}>
                                 {patient.status}
                              </span>
                              <div className="flex gap-1">
                                {patient.tags.slice(0, 2).map(t => (
                                    <span key={t} className={`w-2 h-2 rounded-full ring-1 ring-white dark:ring-slate-800 ${getTagColor(t).split(' ')[0]}`} title={t}></span>
                                ))}
                              </div>
                           </div>
                        </td>
                        <td className="p-4 text-right">
                           <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={() => handlePatientClick(patient)}
                                className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"
                                title="View Details"
                              >
                                 <Eye className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg transition-colors" title="Message">
                                 <MessageCircle className="w-4 h-4" />
                              </button>
                              <button className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 dark:hover:text-white rounded-lg transition-colors" title="More">
                                 <MoreVertical className="w-4 h-4" />
                              </button>
                           </div>
                        </td>
                     </tr>
                  ))}
                  {filteredPatients.length === 0 && (
                     <tr>
                        <td colSpan={6} className="text-center py-12 text-slate-500 dark:text-slate-400">
                           <div className="bg-slate-50 dark:bg-slate-800/50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                              <Search className="w-8 h-8 opacity-20" />
                           </div>
                           <p className="font-medium">No patients found matching your criteria.</p>
                           <button onClick={() => {setSearchTerm(''); setStatusFilter('All');}} className="text-primary hover:underline mt-2 text-sm font-bold">Clear Filters</button>
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
