
import React, { useState } from 'react';
import { 
  ChevronLeft, ChevronRight, Download, Plus, Filter, 
  Search, Calendar as CalendarIcon, Clock, MoreVertical, 
  List, LayoutGrid, Settings, ChevronDown 
} from 'lucide-react';
import { mockAppointments } from '../services/mockData';
import { Appointment } from '../types';

export const CalendarView: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 11, 3)); // Dec 3, 2025 as per screenshot
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrev = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNext = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const renderMonthGrid = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Empty cells for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="min-h-[120px] bg-slate-50/30 dark:bg-slate-900/30 border-b border-r border-slate-100 dark:border-slate-800"></div>);
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
      const dayAppointments = mockAppointments.filter(apt => apt.date === dateStr);
      const isToday = day === 3 && currentDate.getMonth() === 11 && currentDate.getFullYear() === 2025; // Hardcoded check for demo visual match

      days.push(
        <div key={day} className={`min-h-[120px] p-2 border-b border-r border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 relative group transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/20 ${isToday ? 'bg-indigo-50/30 dark:bg-indigo-900/10' : ''}`}>
          <div className="flex justify-between items-start mb-2">
            <span className={`text-sm font-medium w-7 h-7 flex items-center justify-center rounded-full ${isToday ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-500 dark:text-slate-400'}`}>
              {day}
            </span>
            {dayAppointments.length > 0 && (
                <span className="text-[10px] font-bold text-slate-400 bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded-md">
                    {dayAppointments.length}
                </span>
            )}
          </div>
          
          <div className="space-y-1">
            {dayAppointments.slice(0, 3).map((apt, idx) => (
              <div 
                key={idx} 
                className={`text-[10px] p-1.5 rounded border truncate cursor-pointer transition-transform hover:scale-105 shadow-sm
                  ${apt.type === 'In-Person' 
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30' 
                    : apt.type === 'Telemedicine' 
                      ? 'bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-900/20 dark:border-sky-900/30'
                      : 'bg-amber-50 text-amber-700 border-amber-100 dark:bg-amber-900/20 dark:border-amber-900/30'
                  }`}
                title={`${apt.time} - ${apt.patientName}`}
              >
                <span className="font-bold mr-1">{apt.time.split(' ')[0]}</span> {apt.patientName}
              </div>
            ))}
            {dayAppointments.length > 3 && (
                <div className="text-[10px] text-slate-400 text-center font-medium hover:text-indigo-600 cursor-pointer">
                    + {dayAppointments.length - 3} more
                </div>
            )}
          </div>
        </div>
      );
    }

    // Fill remaining cells to complete the grid visually
    const totalCells = days.length;
    const remainingCells = 42 - totalCells; // 6 rows * 7 cols
    for (let i = 0; i < remainingCells; i++) {
        days.push(<div key={`next-${i}`} className="min-h-[120px] bg-slate-50/30 dark:bg-slate-900/30 border-b border-r border-slate-100 dark:border-slate-800"></div>);
    }

    return days;
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Appointment</h1>
        <div className="flex gap-3">
           <div className="flex items-center bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1">
              <button className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 rounded flex items-center gap-2">
                 Export <ChevronDown className="w-3 h-3" />
              </button>
              <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1"></div>
              <button className="p-1.5 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 rounded"><List className="w-4 h-4" /></button>
              <button className="p-1.5 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 rounded shadow-sm"><LayoutGrid className="w-4 h-4" /></button>
           </div>
           <button className="bg-indigo-900 hover:bg-indigo-800 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
              <Plus className="w-4 h-4" /> New Appointment
           </button>
        </div>
      </div>

      {/* Date Range & Filters Row */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
         <div className="flex items-center gap-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-600 dark:text-slate-300 shadow-sm">
             <CalendarIcon className="w-4 h-4 text-slate-400" />
             <span>3 Dec 25 - 3 Dec 25</span>
         </div>
         <div className="flex gap-3">
             <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm">
                 <Filter className="w-4 h-4" /> Filters
             </button>
             <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm">
                 Sort By : Recent <ChevronDown className="w-4 h-4" />
             </button>
         </div>
      </div>

      {/* Calendar Container */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
         {/* Calendar Toolbar */}
         <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-50/30 dark:bg-slate-800">
             <div className="flex items-center gap-2">
                 <button onClick={handleToday} className="px-3 py-1.5 bg-indigo-500 text-white rounded-md text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm">
                    today
                 </button>
                 <div className="flex bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600">
                    <button onClick={handlePrev} className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-l-md text-slate-500 dark:text-slate-400 border-r border-slate-200 dark:border-slate-600"><ChevronLeft className="w-4 h-4" /></button>
                    <button onClick={handleNext} className="p-1.5 hover:bg-slate-50 dark:hover:bg-slate-600 rounded-r-md text-slate-500 dark:text-slate-400"><ChevronRight className="w-4 h-4" /></button>
                 </div>
             </div>
             
             <h2 className="text-lg font-bold text-slate-800 dark:text-white uppercase tracking-wide">
                 {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
             </h2>

             <div className="flex bg-white dark:bg-slate-700 rounded-md border border-slate-200 dark:border-slate-600 p-0.5">
                 <button 
                    onClick={() => setView('month')}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${view === 'month' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                 >
                    month
                 </button>
                 <button 
                    onClick={() => setView('week')}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${view === 'week' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                 >
                    week
                 </button>
                 <button 
                    onClick={() => setView('day')}
                    className={`px-3 py-1 text-xs font-medium rounded-sm transition-all ${view === 'day' ? 'bg-indigo-900 text-white shadow-sm' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}
                 >
                    day
                 </button>
             </div>
         </div>

         {/* Calendar Grid */}
         <div className="border-t border-slate-100 dark:border-slate-700">
             {/* Days Header */}
             <div className="grid grid-cols-7 border-b border-slate-100 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800">
                 {daysOfWeek.map(day => (
                     <div key={day} className="py-3 text-center text-xs font-bold text-slate-500 dark:text-slate-400 uppercase border-r border-slate-100 dark:border-slate-700 last:border-r-0">
                         {day}
                     </div>
                 ))}
             </div>
             
             {/* Month Cells */}
             <div className="grid grid-cols-7">
                 {renderMonthGrid()}
             </div>
         </div>
      </div>
    </div>
  );
};
