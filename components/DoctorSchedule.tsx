
import React, { useState } from 'react';
import { Search, Filter, ChevronDown, Calendar, Eye, ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { mockDoctors } from '../services/mockData';

interface DoctorScheduleProps {
    onProfileClick?: (doctorId: string) => void;
    onScheduleClick?: (doctorId: string) => void;
}

export const DoctorSchedule: React.FC<DoctorScheduleProps> = ({ onProfileClick, onScheduleClick }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [showFilters, setShowFilters] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('All');

  // Helper to generate consistent mock schedule based on ID
  const getSchedule = (id: string) => {
    const hash = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
    return days.map((day, index) => ({
      day,
      available: (hash + index) % 3 !== 0 // 2/3rds chance of being available
    }));
  };

  const departments = ['All', ...Array.from(new Set(mockDoctors.map(d => d.department)))];

  // Filter Logic
  const filteredDoctors = mockDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          doc.phone.includes(searchTerm);
    const matchesDept = departmentFilter === 'All' || doc.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  // Sort Logic
  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
     return sortOrder === 'asc' 
        ? a.name.localeCompare(b.name) 
        : b.name.localeCompare(a.name);
  });

  // Pagination Logic
  const totalPages = Math.ceil(sortedDoctors.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentDoctors = sortedDoctors.slice(startIndex, startIndex + rowsPerPage);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setCurrentPage(1);
  };

  const toggleSort = () => {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Doctor Schedule</h1>
            <span className="bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-xs font-bold border border-indigo-100 dark:border-indigo-800">
                Total Doctors : {mockDoctors.length}
            </span>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm">
            <Download className="w-4 h-4" /> Export
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-96">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input 
                    type="text" 
                    placeholder="Search doctor or phone..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-white text-slate-800 dark:bg-slate-700 dark:text-white placeholder:text-slate-400 border border-slate-200 dark:border-slate-600 rounded-lg outline-none focus:ring-2 focus:ring-indigo-100"
                />
            </div>
            <div className="flex gap-3 w-full md:w-auto">
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-colors ${showFilters ? 'bg-indigo-50 border-indigo-200 text-indigo-600' : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-600 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'}`}
                >
                    <Filter className="w-4 h-4" /> Filters
                </button>
                <button 
                    onClick={toggleSort}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors bg-white dark:bg-slate-800"
                >
                    Sort By : Name ({sortOrder === 'asc' ? 'A-Z' : 'Z-A'}) <ChevronDown className="w-4 h-4" />
                </button>
            </div>
          </div>
          
          {/* Expanded Filters */}
          {showFilters && (
              <div className="pt-2 flex items-center gap-4 animate-in fade-in slide-in-from-top-1">
                  <div className="flex flex-col gap-1 w-full md:w-48">
                      <label className="text-xs font-semibold text-slate-500">Department</label>
                      <select 
                          value={departmentFilter}
                          onChange={(e) => setDepartmentFilter(e.target.value)}
                          className="w-full p-2 border border-slate-200 dark:border-slate-600 rounded-lg outline-none bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-200 text-sm"
                      >
                          {departments.map(d => <option key={d} value={d}>{d}</option>)}
                      </select>
                  </div>
                  <button 
                      onClick={() => {setDepartmentFilter('All'); setSearchTerm('');}}
                      className="mt-auto px-3 py-2 text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                      Reset
                  </button>
              </div>
          )}
      </div>

      {/* Doctors Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 dark:bg-slate-700 border-b border-slate-200 dark:border-slate-600 text-xs font-bold text-slate-800 dark:text-slate-200">
                        <th className="px-6 py-4">Doctor</th>
                        <th className="px-6 py-4">Department</th>
                        <th className="px-6 py-4">Phone</th>
                        <th className="px-6 py-4">Availability</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                    {currentDoctors.map((doc) => (
                        <tr key={doc.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                            <td className="px-6 py-4 cursor-pointer" onClick={() => onProfileClick?.(doc.id)}>
                                <div className="flex items-center gap-3">
                                    <img src={doc.image} alt="" className="w-10 h-10 rounded-full object-cover border border-slate-100 dark:border-slate-600" />
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800 dark:text-white hover:text-indigo-600 transition-colors">{doc.name}</h4>
                                        <p className="text-xs text-slate-500 dark:text-slate-400">{doc.specialty}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{doc.department}</td>
                            <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">{doc.phone}</td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    {getSchedule(doc.id).map((day, idx) => (
                                        <div 
                                            key={idx}
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                                                day.available 
                                                ? 'bg-[#3e49cd] text-white shadow-sm' 
                                                : 'bg-white dark:bg-slate-600 text-slate-800 dark:text-slate-300 border border-slate-100 dark:border-slate-500'
                                            }`}
                                        >
                                            {day.day}
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex justify-end gap-2">
                                    <button 
                                        onClick={() => onScheduleClick?.(doc.id)}
                                        className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors group"
                                        title="Book Appointment"
                                    >
                                        <Calendar className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </button>
                                    <button 
                                        onClick={() => onProfileClick?.(doc.id)}
                                        className="p-2 border border-slate-200 dark:border-slate-600 rounded-lg text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-slate-700 transition-colors group"
                                        title="View Profile"
                                    >
                                        <Eye className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    {currentDoctors.length === 0 && (
                        <tr>
                            <td colSpan={5} className="text-center py-10 text-slate-500 dark:text-slate-400 bg-slate-50/20">
                                <Search className="w-8 h-8 mx-auto mb-2 opacity-50" />
                                <p>No doctors found.</p>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
        
        {/* Pagination Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 dark:text-slate-400 bg-slate-50/50 dark:bg-slate-800">
            <div className="flex items-center gap-2">
                <span>Row Per Page</span>
                <select 
                    value={rowsPerPage} 
                    onChange={handleRowsPerPageChange}
                    className="border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-700 rounded px-2 py-1 outline-none focus:border-indigo-500"
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                </select>
                <span className="ml-2">Entries</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="mr-4">
                    Page {currentPage} of {totalPages || 1}
                </span>
                <button 
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" />
                </button>
                <div className="w-8 h-8 bg-[#3e49cd] text-white rounded flex items-center justify-center font-medium shadow-sm">
                    {currentPage}
                </div>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages || totalPages === 0}
                    className="p-2 border border-slate-200 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
