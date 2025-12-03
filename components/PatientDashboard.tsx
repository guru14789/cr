
import React from 'react';
import { Calendar, FileText, Activity, Clock, Plus, Download } from 'lucide-react';
import { mockAppointments } from '../services/mockData';

export const PatientDashboard: React.FC = () => {
  const nextAppointment = mockAppointments[0];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Hello, Rajesh</h1>
          <p className="text-slate-500 dark:text-slate-400">Welcome to your personal health dashboard.</p>
        </div>
        <button className="bg-primary hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-primary-500/20 transition-all hover:scale-105 font-medium">
           <Plus className="w-4 h-4 stroke-[3]" /> Book Appointment
        </button>
      </div>

      {/* Main Banner */}
      <div className="bg-gradient-to-br from-primary-600 to-emerald-500 dark:from-primary-700 dark:to-emerald-600 rounded-3xl p-8 md:p-10 text-white shadow-xl relative overflow-hidden group">
         <div className="relative z-10 max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">Upcoming Appointment</h2>
            <div className="flex items-start gap-5 bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/20 hover:bg-white/20 transition-colors">
               <div className="bg-white text-primary w-14 h-14 rounded-xl flex flex-col items-center justify-center shrink-0 shadow-lg">
                  <span className="text-xs font-bold uppercase tracking-wide">Oct</span>
                  <span className="text-xl font-bold leading-none">27</span>
               </div>
               <div>
                  <h3 className="font-bold text-xl">{nextAppointment.doctorName}</h3>
                  <div className="flex flex-wrap items-center gap-2 text-primary-50 mt-1 text-sm font-medium">
                     <span className="bg-white/20 px-2 py-0.5 rounded">{nextAppointment.department}</span>
                     <span>•</span>
                     <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {nextAppointment.time}</span>
                  </div>
               </div>
            </div>
         </div>
         <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none group-hover:scale-110 transition-transform duration-700">
            <Calendar className="w-72 h-72" />
         </div>
         <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Vitals */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 text-lg">
               <Activity className="w-5 h-5 text-rose-500" /> Recent Vitals
            </h3>
            <div className="space-y-5">
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Blood Pressure</span>
                     <span className="font-bold text-slate-800 dark:text-white text-lg">120/80</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                     <div className="bg-emerald-500 h-full w-[70%] rounded-full"></div>
                  </div>
               </div>
               <div>
                  <div className="flex justify-between items-center mb-2">
                     <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Heart Rate</span>
                     <span className="font-bold text-slate-800 dark:text-white text-lg">72 bpm</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
                     <div className="bg-rose-500 h-full w-[60%] rounded-full"></div>
                  </div>
               </div>
            </div>
         </div>

         {/* Medications */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 text-lg">
               <Clock className="w-5 h-5 text-amber-500" /> Medications
            </h3>
            <ul className="space-y-3">
               <li className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
                  <div className="flex-1">
                     <p className="text-sm font-bold text-slate-800 dark:text-white">Paracetamol</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">1 tablet after food</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-white dark:bg-slate-700 px-2 py-1 rounded">Morning</span>
               </li>
               <li className="flex items-center gap-4 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-xl border border-slate-100 dark:border-slate-700/50">
                  <div className="w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
                  <div className="flex-1">
                     <p className="text-sm font-bold text-slate-800 dark:text-white">Vitamin D</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">1 capsule daily</p>
                  </div>
                  <span className="text-xs font-bold text-slate-400 bg-white dark:bg-slate-700 px-2 py-1 rounded">Night</span>
               </li>
            </ul>
         </div>

         {/* Reports */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2 text-lg">
               <FileText className="w-5 h-5 text-sky-500" /> Recent Reports
            </h3>
            <div className="space-y-3">
               <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700/50 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group bg-slate-50/30 dark:bg-slate-800">
                  <div>
                     <p className="text-sm font-bold text-slate-800 dark:text-white">Blood Test Report</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">25 Oct 2025</p>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-slate-400 group-hover:text-primary transition-colors shadow-sm border border-slate-100 dark:border-slate-600">
                     <Download className="w-4 h-4" />
                  </div>
               </div>
               <div className="flex items-center justify-between p-4 border border-slate-100 dark:border-slate-700/50 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors cursor-pointer group bg-slate-50/30 dark:bg-slate-800">
                  <div>
                     <p className="text-sm font-bold text-slate-800 dark:text-white">X-Ray Report</p>
                     <p className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">10 Oct 2025</p>
                  </div>
                  <div className="p-2 bg-white dark:bg-slate-700 rounded-lg text-slate-400 group-hover:text-primary transition-colors shadow-sm border border-slate-100 dark:border-slate-600">
                     <Download className="w-4 h-4" />
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};
