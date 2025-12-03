
import React, { useState } from 'react';
import { 
  Check, X, Filter, Search, Calendar, ChevronDown, CheckCircle, AlertCircle,
  Plus, LayoutGrid, List, FileText, User, Clock, ArrowUpRight, ArrowDownRight
} from 'lucide-react';
import { mockLeaveRequests } from '../services/mockData';
import { LeaveRequest } from '../types';

export const LeaveManagement: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [activeTab, setActiveTab] = useState<'All' | 'Pending' | 'Approved' | 'Rejected'>('All');
  const [leaves, setLeaves] = useState<LeaveRequest[]>(mockLeaveRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notification, setNotification] = useState<{message: string, type: 'success'|'error'} | null>(null);

  // Stats
  const stats = {
    present: 180,
    planned: 10,
    unplanned: 50,
    pending: leaves.filter(l => l.status === 'Pending').length
  };

  const filteredLeaves = leaves.filter(leave => {
    const matchesTab = activeTab === 'All' || leave.status === activeTab;
    const matchesSearch = leave.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          leave.designation.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleStatusChange = (id: string, newStatus: 'Approved' | 'Rejected') => {
    setLeaves(prev => prev.map(l => l.id === id ? { ...l, status: newStatus } : l));
    showNotification(`Leave request ${newStatus.toLowerCase()} successfully`, newStatus === 'Approved' ? 'success' : 'error');
  };

  const showNotification = (msg: string, type: 'success'|'error') => {
    setNotification({ message: msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
        case 'Approved': return 'bg-green-100 text-green-700 border-green-200';
        case 'Rejected': return 'bg-red-100 text-red-700 border-red-200';
        default: return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10 relative">
        {/* Notification Toast */}
        {notification && (
            <div className={`fixed top-24 right-6 z-50 px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 text-white animate-in slide-in-from-right-10 duration-300 ${notification.type === 'success' ? 'bg-green-600' : 'bg-red-500'}`}>
                {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
                <span className="font-medium text-sm">{notification.message}</span>
            </div>
        )}

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
                <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Admin Leaves</h1>
                <p className="text-slate-500 dark:text-slate-400">Manage employee leave requests and attendance.</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors shadow-sm"
            >
                <Plus className="w-4 h-4" /> New Leave
            </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Total Present</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.present}</h3>
                        <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded flex items-center">
                            <ArrowUpRight className="w-3 h-3" /> +10.6%
                        </span>
                    </div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-primary-50 dark:bg-primary-900/30 rounded-full text-primary dark:text-primary-400 group-hover:scale-110 transition-transform">
                    <User className="w-6 h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Planned Leaves</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.planned}</h3>
                        <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded flex items-center">
                            <ArrowUpRight className="w-3 h-3" /> +8.95%
                        </span>
                    </div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-green-50 dark:bg-green-900/30 rounded-full text-green-600 dark:text-green-400 group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Unplanned Leaves</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.unplanned}</h3>
                        <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded flex items-center">
                            <ArrowUpRight className="w-3 h-3" /> +3.78%
                        </span>
                    </div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-yellow-50 dark:bg-yellow-900/30 rounded-full text-yellow-600 dark:text-yellow-400 group-hover:scale-110 transition-transform">
                    <Clock className="w-6 h-6" />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group">
                <div className="relative z-10">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Pending Requests</p>
                    <div className="flex items-baseline gap-2 mt-2">
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">{stats.pending}</h3>
                        <span className="text-xs font-bold text-green-600 bg-green-50 dark:bg-green-900/30 px-1.5 py-0.5 rounded flex items-center">
                            <ArrowUpRight className="w-3 h-3" /> +7.65%
                        </span>
                    </div>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-red-50 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400 group-hover:scale-110 transition-transform">
                    <AlertCircle className="w-6 h-6" />
                </div>
            </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex flex-1 w-full gap-4">
                <div className="relative w-full md:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Search employee..." 
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-white"
                    />
                </div>
                <div className="hidden md:flex items-center gap-2 border border-slate-200 dark:border-slate-600 rounded-lg px-3 bg-slate-50 dark:bg-slate-700">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <span className="text-sm text-slate-600 dark:text-slate-300">26 Nov 25 - 26 Dec 25</span>
                </div>
            </div>
            
            <div className="flex gap-3 w-full md:w-auto">
                 <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-sm">
                    <Filter className="w-4 h-4" /> Filters
                 </button>
                 <select 
                    value={activeTab}
                    onChange={(e) => setActiveTab(e.target.value as any)}
                    className="px-3 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 text-sm outline-none bg-white dark:bg-slate-800"
                 >
                    <option value="All">All Status</option>
                    <option value="Pending">Pending</option>
                    <option value="Approved">Approved</option>
                    <option value="Rejected">Rejected</option>
                 </select>
                 <div className="flex bg-slate-100 dark:bg-slate-700 rounded-lg p-1">
                    <button 
                        onClick={() => setViewMode('table')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'table' ? 'bg-white dark:bg-slate-600 shadow text-primary dark:text-primary-400' : 'text-slate-400'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                    <button 
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white dark:bg-slate-600 shadow text-primary dark:text-primary-400' : 'text-slate-400'}`}
                    >
                        <LayoutGrid className="w-4 h-4" />
                    </button>
                 </div>
            </div>
        </div>

        {/* Content View */}
        {viewMode === 'grid' ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLeaves.map(leave => (
                    <div key={leave.id} className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 p-6 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-3">
                                <img src={leave.image} alt="" className="w-12 h-12 rounded-full object-cover border border-slate-100 dark:border-slate-600" />
                                <div>
                                    <h3 className="font-bold text-slate-800 dark:text-white">{leave.employeeName}</h3>
                                    <p className="text-xs text-slate-500 dark:text-slate-400">{leave.designation}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusBadge(leave.status)}`}>
                                {leave.status}
                            </span>
                        </div>

                        <div className="space-y-3 mb-6">
                             <div className="flex justify-between text-sm">
                                 <span className="text-slate-500 dark:text-slate-400">Leave Type</span>
                                 <span className="font-medium text-slate-700 dark:text-slate-300">{leave.type}</span>
                             </div>
                             <div className="flex justify-between text-sm">
                                 <span className="text-slate-500 dark:text-slate-400">Duration</span>
                                 <span className="font-medium text-slate-700 dark:text-slate-300">{leave.days} Days <span className="text-xs text-slate-400 font-normal">({leave.fromDate} - {leave.toDate})</span></span>
                             </div>
                             <div className="bg-slate-50 dark:bg-slate-700/50 p-3 rounded-lg text-sm text-slate-600 dark:text-slate-300 italic border border-slate-100 dark:border-slate-700">
                                 "{leave.reason}"
                             </div>
                        </div>

                        {leave.status === 'Pending' && (
                            <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-700">
                                <button 
                                    onClick={() => handleStatusChange(leave.id, 'Rejected')}
                                    className="flex-1 py-2 border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-sm font-medium hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center justify-center gap-2"
                                >
                                    <X className="w-4 h-4" /> Reject
                                </button>
                                <button 
                                    onClick={() => handleStatusChange(leave.id, 'Approved')}
                                    className="flex-1 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
                                >
                                    <Check className="w-4 h-4" /> Approve
                                </button>
                            </div>
                        )}
                        {leave.status !== 'Pending' && (
                            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 text-center text-xs text-slate-400">
                                 Action taken by Admin
                            </div>
                        )}
                    </div>
                ))}
             </div>
        ) : (
            <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-500 dark:text-slate-300 uppercase tracking-wider">
                                <th className="px-6 py-4">Employee</th>
                                <th className="px-6 py-4">Leave Type</th>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Duration</th>
                                <th className="px-6 py-4">Reason</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                            {filteredLeaves.map(leave => (
                                <tr key={leave.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <img src={leave.image} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-slate-600" />
                                            <div>
                                                <h4 className="font-bold text-slate-800 dark:text-white text-sm">{leave.employeeName}</h4>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">{leave.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{leave.type}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                                        {leave.fromDate} - {leave.toDate}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{leave.days} Days</td>
                                    <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400 max-w-xs truncate">{leave.reason}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusBadge(leave.status)}`}>
                                            {leave.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {leave.status === 'Pending' ? (
                                            <div className="flex justify-end gap-2">
                                                <button 
                                                    onClick={() => handleStatusChange(leave.id, 'Rejected')}
                                                    className="p-1.5 text-red-500 border border-red-200 dark:border-red-900/30 rounded hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    title="Reject"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                                <button 
                                                    onClick={() => handleStatusChange(leave.id, 'Approved')}
                                                    className="p-1.5 text-green-500 border border-green-200 dark:border-green-900/30 rounded hover:bg-green-50 dark:hover:bg-green-900/20"
                                                    title="Approve"
                                                >
                                                    <Check className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <span className="text-xs text-slate-400">Completed</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        )}
        
        {filteredLeaves.length === 0 && (
            <div className="text-center py-12 text-slate-500 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 border-dashed">
                <Calendar className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-600 mb-3" />
                <p>No leave requests found.</p>
            </div>
        )}

        {/* New Leave Modal */}
        {isModalOpen && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
                <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
                    <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50 dark:bg-slate-900">
                        <h2 className="font-bold text-lg text-slate-800 dark:text-white">New Leave Request</h2>
                        <button onClick={() => setIsModalOpen(false)} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500">
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Leave Type</label>
                            <select className="w-full p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 bg-white dark:bg-slate-700 text-slate-800 dark:text-white">
                                <option>Casual Leave</option>
                                <option>Sick Leave</option>
                                <option>Emergency</option>
                                <option>Vacation</option>
                            </select>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">From</label>
                                <input type="date" className="w-full p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-slate-700 dark:text-slate-300">To</label>
                                <input type="date" className="w-full p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Number of Days</label>
                            <input type="number" placeholder="e.g. 2" className="w-full p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 bg-white dark:bg-slate-700 text-slate-800 dark:text-white" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Reason</label>
                            <textarea rows={3} placeholder="Describe the reason..." className="w-full p-2.5 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-primary-100 resize-none bg-white dark:bg-slate-700 text-slate-800 dark:text-white"></textarea>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Attachment (Optional)</label>
                            <div className="border-2 border-dashed border-slate-200 dark:border-slate-600 rounded-lg p-4 text-center text-sm text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer">
                                Click to upload medical certificate or documents
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2 bg-slate-50 dark:bg-slate-900">
                        <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">Cancel</button>
                        <button 
                            onClick={() => {
                                setIsModalOpen(false);
                                showNotification('Leave request submitted successfully', 'success');
                            }}
                            className="px-6 py-2 bg-primary hover:bg-primary-700 text-white rounded-lg text-sm font-medium shadow-sm transition-colors"
                        >
                            Submit Request
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );
};
