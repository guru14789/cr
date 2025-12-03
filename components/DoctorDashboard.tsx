
import React from 'react';
import { 
  Users, Calendar, Clock, Activity, ChevronRight, MoreVertical, 
  Video, MessageSquare, Phone, FileText, CheckCircle, AlertCircle,
  User, Plus
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

// Mock Data
const appointmentStats = [
  { name: 'Jan', total: 350, completed: 200 },
  { name: 'Feb', total: 280, completed: 180 },
  { name: 'Mar', total: 290, completed: 220 },
  { name: 'Apr', total: 270, completed: 190 },
  { name: 'May', total: 340, completed: 260 },
  { name: 'Jun', total: 210, completed: 150 },
  { name: 'Jul', total: 220, completed: 170 },
  { name: 'Aug', total: 190, completed: 140 },
  { name: 'Sep', total: 250, completed: 210 },
  { name: 'Oct', total: 200, completed: 160 },
  { name: 'Nov', total: 350, completed: 280 },
  { name: 'Dec', total: 360, completed: 300 },
];

const donughtData = [
  { name: 'Completed', value: 260, color: '#10b981' }, // Emerald
  { name: 'Pending', value: 21, color: '#f59e0b' },   // Amber
  { name: 'Cancelled', value: 50, color: '#ef4444' }, // Red
];

const recentAppointments = [
  { id: 1, name: 'Alberto Ripley', idNo: '+1 56556 54565', date: '27 May 2025 - 09:30 AM', mode: 'Online', status: 'Checked Out', fee: '$400', img: 'https://ui-avatars.com/api/?name=Alberto+Ripley&background=ccfbf1&color=0f766e' },
  { id: 2, name: 'Susan Babin', idNo: '+1 65658 95654', date: '26 May 2025 - 10:15 AM', mode: 'Online', status: 'Checked In', fee: '$370', img: 'https://ui-avatars.com/api/?name=Susan+Babin&background=e0f2fe&color=0369a1' },
  { id: 3, name: 'Carol Lam', idNo: '+1 55654 56647', date: '25 May 2025 - 02:40 PM', mode: 'In-Person', status: 'Cancelled', fee: '$450', img: 'https://ui-avatars.com/api/?name=Carol+Lam&background=fee2e2&color=b91c1c' },
  { id: 4, name: 'Marsha Noland', idNo: '+1 65668 54558', date: '24 May 2025 - 11:30 AM', mode: 'In-Person', status: 'Schedule', fee: '$310', img: 'https://ui-avatars.com/api/?name=Marsha+Noland&background=fef3c7&color=b45309' },
  { id: 5, name: 'John Elsass', idNo: '47851263', date: '23 May 2025 - 04:10 PM', mode: 'Online', status: 'Schedule', fee: '$400', img: 'https://ui-avatars.com/api/?name=John+Elsass&background=f3e8ff&color=7e22ce' },
];

const topPatients = [
  { name: 'Alberto Ripley', phone: '+1 56556 54565', count: 20, img: 'https://ui-avatars.com/api/?name=Alberto+Ripley&background=random' },
  { name: 'Susan Babin', phone: '+1 65658 95654', count: 18, img: 'https://ui-avatars.com/api/?name=Susan+Babin&background=random' },
  { name: 'Carol Lam', phone: '+1 55654 56647', count: 16, img: 'https://ui-avatars.com/api/?name=Carol+Lam&background=random' },
  { name: 'Marsha Noland', phone: '+1 65668 54558', count: 14, img: 'https://ui-avatars.com/api/?name=Marsha+Noland&background=random' },
  { name: 'Irma Armstrong', phone: '+1 45214 66568', count: 12, img: 'https://ui-avatars.com/api/?name=Irma+Armstrong&background=random' },
];

export const DoctorDashboard: React.FC = () => {
  
  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'Checked Out': return 'bg-emerald-500 text-white';
      case 'Checked In': return 'bg-amber-400 text-white';
      case 'Cancelled': return 'bg-rose-500 text-white';
      case 'Schedule': return 'bg-blue-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-white">Doctor Dashboard</h1>
        <div className="flex gap-3">
           <button className="bg-primary hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 shadow-sm transition-colors">
              <Plus className="w-4 h-4" /> New Appointment
           </button>
           <button className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <Calendar className="w-4 h-4" /> Schedule Availability
           </button>
        </div>
      </div>

      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
         {/* Total Appointments */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-primary-200 transition-all min-w-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Total Appointments</p>
                  <div className="flex items-center gap-2 mt-1">
                     <h3 className="text-2xl font-bold text-slate-800 dark:text-white">658</h3>
                     <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-1.5 py-0.5 rounded">+95%</span>
                  </div>
               </div>
               <div className="p-2 border border-slate-100 dark:border-slate-700 rounded-lg group-hover:bg-primary-50 dark:group-hover:bg-primary-900/20 transition-colors">
                  <Calendar className="w-5 h-5 text-primary-600 dark:text-primary-400" />
               </div>
            </div>
            {/* Simple Bar Chart Visualization */}
            <div className="flex items-end gap-1 h-10 mt-2">
               {[40, 60, 45, 70, 50, 80, 60, 90, 65, 85].map((h, i) => (
                  <div key={i} className="flex-1 bg-primary rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
               ))}
            </div>
            <p className="text-xs text-slate-400 mt-2 text-right">in last 7 Days</p>
         </div>

         {/* Online Consultations */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-amber-200 transition-all min-w-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Online Consultations</p>
                  <div className="flex items-center gap-2 mt-1">
                     <h3 className="text-2xl font-bold text-slate-800 dark:text-white">125</h3>
                     <span className="bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400 text-xs font-bold px-1.5 py-0.5 rounded">-15%</span>
                  </div>
               </div>
               <div className="p-2 border border-slate-100 dark:border-slate-700 rounded-lg group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20 transition-colors">
                  <Video className="w-5 h-5 text-amber-500" />
               </div>
            </div>
            <div className="flex items-end gap-1 h-10 mt-2">
               {[60, 50, 70, 40, 55, 30, 45, 35, 50, 40].map((h, i) => (
                  <div key={i} className="flex-1 bg-amber-500 rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
               ))}
            </div>
            <p className="text-xs text-slate-400 mt-2 text-right">in last 7 Days</p>
         </div>

         {/* Cancelled Appointments */}
         <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm relative overflow-hidden group hover:border-teal-200 transition-all min-w-0">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-slate-500 dark:text-slate-400 text-sm">Cancelled Appointments</p>
                  <div className="flex items-center gap-2 mt-1">
                     <h3 className="text-2xl font-bold text-slate-800 dark:text-white">35</h3>
                     <span className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-xs font-bold px-1.5 py-0.5 rounded">+45%</span>
                  </div>
               </div>
               <div className="p-2 border border-slate-100 dark:border-slate-700 rounded-lg group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20 transition-colors">
                  <AlertCircle className="w-5 h-5 text-teal-500" />
               </div>
            </div>
            <div className="flex items-end gap-1 h-10 mt-2">
               {[30, 40, 25, 50, 35, 45, 40, 60, 55, 70].map((h, i) => (
                  <div key={i} className="flex-1 bg-teal-500 rounded-t-sm opacity-80" style={{ height: `${h}%` }}></div>
               ))}
            </div>
            <p className="text-xs text-slate-400 mt-2 text-right">in last 7 Days</p>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Upcoming Appointments Card */}
         <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col min-w-0">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800 dark:text-white">Upcoming Appointments</h3>
               <button className="text-xs text-slate-500 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-700">
                  Today <ChevronRight className="w-3 h-3 rotate-90" />
               </button>
            </div>
            
            <div className="flex items-center gap-4 mb-6">
               <img src="https://ui-avatars.com/api/?name=Andrew+Billard&background=0d9488&color=fff" className="w-16 h-16 rounded-full border-2 border-slate-100 dark:border-slate-700" alt="Patient" />
               <div>
                  <h4 className="font-bold text-lg text-slate-800 dark:text-white">Andrew Billard</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400">#AP455698</p>
               </div>
            </div>

            <div className="space-y-4 mb-6">
               <div>
                  <p className="text-sm font-medium text-slate-800 dark:text-white">General Visit</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-1">
                     <Calendar className="w-3 h-3" /> Monday, 31 Mar 2025
                     <Clock className="w-3 h-3 ml-2" /> 06:30 PM
                  </p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                  <div>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Department</p>
                     <p className="text-sm font-medium text-slate-800 dark:text-white">Cardiology</p>
                  </div>
                  <div>
                     <p className="text-xs text-slate-500 dark:text-slate-400">Type</p>
                     <p className="text-sm font-medium text-slate-800 dark:text-white">Online Consultation</p>
                  </div>
               </div>
            </div>

            <button className="w-full bg-primary hover:bg-primary-700 text-white py-3 rounded-lg font-medium mb-4 transition-colors shadow-lg shadow-primary-500/20">
               Start Appointment
            </button>

            <div className="grid grid-cols-2 gap-4">
               <button className="border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <MessageSquare className="w-4 h-4" /> Chat Now
               </button>
               <button className="border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                  <Video className="w-4 h-4" /> Video Call
               </button>
            </div>
         </div>

         {/* Appointments Graph */}
         <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 min-w-0">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800 dark:text-white">Appointments</h3>
               <button className="text-xs text-slate-500 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-700">
                  Monthly <ChevronRight className="w-3 h-3 rotate-90" />
               </button>
            </div>
            
            <div className="flex items-center gap-6 mb-4 text-sm">
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span> 
                  <span className="text-slate-600 dark:text-slate-300">Total Appointments</span>
               </div>
               <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span> 
                  <span className="text-slate-600 dark:text-slate-300">Completed Appointments</span>
               </div>
            </div>

            <div className="h-80 w-full min-w-0">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={appointmentStats} barGap={8} barSize={6}>
                     <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.5} />
                     <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                     <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                     <RechartsTooltip 
                        cursor={{fill: 'transparent'}}
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                     />
                     <Bar dataKey="total" fill="#0d9488" radius={[4, 4, 4, 4]} />
                     <Bar dataKey="completed" fill="#10b981" radius={[4, 4, 4, 4]} />
                  </BarChart>
               </ResponsiveContainer>
            </div>
         </div>
      </div>

      {/* 6 Small Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
         {[
            { label: 'Total Patient', val: '658', change: '+31%', icon: User, color: 'text-primary', bg: 'bg-primary-100 dark:bg-primary-900/30' },
            { label: 'Video Consultation', val: '256', change: '-21%', icon: Video, color: 'text-cyan-600', bg: 'bg-cyan-100 dark:bg-cyan-900/30' },
            { label: 'Rescheduled', val: '141', change: '+64%', icon: Calendar, color: 'text-emerald-600', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
            { label: 'Pre Visit Bookings', val: '524', change: '+38%', icon: FileText, color: 'text-rose-600', bg: 'bg-rose-100 dark:bg-rose-900/30' },
            { label: 'Walkin Bookings', val: '21', change: '+95%', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
            { label: 'Follow Ups', val: '451', change: '+76%', icon: Activity, color: 'text-teal-600', bg: 'bg-teal-100 dark:bg-teal-900/30' },
         ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
               <div className={`w-8 h-8 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                  <stat.icon className={`w-4 h-4 ${stat.color}`} />
               </div>
               <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{stat.label}</p>
               <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-1">{stat.val}</h4>
               <p className={`text-[10px] font-medium ${stat.change.startsWith('+') ? 'text-emerald-600' : 'text-rose-500'}`}>
                  {stat.change} <span className="text-slate-400 font-normal">Last Week</span>
               </p>
            </div>
         ))}
      </div>

      {/* Recent Appointments Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm overflow-hidden">
         <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-slate-800 dark:text-white">Recent Appointments</h3>
            <button className="text-xs text-slate-500 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-700">
               Weekly <ChevronRight className="w-3 h-3 rotate-90" />
            </button>
         </div>
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
               <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-700 dark:text-slate-300 font-bold">
                  <tr>
                     <th className="px-6 py-4">Patient</th>
                     <th className="px-6 py-4">Date & Time</th>
                     <th className="px-6 py-4">Mode</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Consultation Fees</th>
                     <th className="px-6 py-4"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {recentAppointments.map((apt, idx) => (
                     <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                        <td className="px-6 py-4">
                           <div className="flex items-center gap-3">
                              <img src={apt.img} className="w-10 h-10 rounded-full" alt="" />
                              <div>
                                 <p className="font-bold text-slate-800 dark:text-white">{apt.name}</p>
                                 <p className="text-xs text-slate-500 dark:text-slate-400">{apt.idNo}</p>
                              </div>
                           </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{apt.date}</td>
                        <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{apt.mode}</td>
                        <td className="px-6 py-4">
                           <span className={`px-3 py-1 rounded text-[10px] font-bold uppercase ${getStatusBadge(apt.status)}`}>
                              {apt.status}
                           </span>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-800 dark:text-white">{apt.fee}</td>
                        <td className="px-6 py-4 text-right">
                           <div className="flex justify-end gap-2">
                              <button className="p-1.5 border border-slate-200 dark:border-slate-600 rounded text-slate-400 hover:text-primary hover:border-primary transition-colors"><Phone className="w-3 h-3" /></button>
                              <button className="p-1.5 border border-slate-200 dark:border-slate-600 rounded text-slate-400 hover:text-primary hover:border-primary transition-colors"><MoreVertical className="w-3 h-3" /></button>
                           </div>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>

      {/* Bottom Section: Availability, Stats, Top Patients */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {/* Availability */}
         <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col min-w-0">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800 dark:text-white">Availability</h3>
               <button className="text-xs text-slate-500 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-700">
                  Trustcare Clinic <ChevronRight className="w-3 h-3 rotate-90" />
               </button>
            </div>
            
            <div className="space-y-4 flex-1">
               {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-700/50 pb-2 last:border-0">
                     <span className="font-bold text-slate-700 dark:text-slate-300">{day}</span>
                     <span className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> 11:00 PM - 12:30 PM
                     </span>
                  </div>
               ))}
               <div className="flex justify-between items-center text-sm border-b border-slate-50 dark:border-slate-700/50 pb-2">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Sun</span>
                  <span className="text-rose-500 flex items-center gap-2">
                     <Clock className="w-3 h-3" /> Closed
                  </span>
               </div>
            </div>
            
            <button className="w-full bg-slate-50 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-sm py-3 rounded-lg mt-4 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors">
               Edit Availability
            </button>
         </div>

         {/* Appointment Statistics (Donut) */}
         <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col items-center min-w-0">
            <div className="flex justify-between items-center w-full mb-2">
               <h3 className="font-bold text-slate-800 dark:text-white">Appointment Statistics</h3>
               <button className="text-xs text-slate-500 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-700">
                  Monthly <ChevronRight className="w-3 h-3 rotate-90" />
               </button>
            </div>
            
            <div className="h-64 w-full relative flex items-center justify-center">
               <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                     <Pie
                        data={donughtData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={0}
                        dataKey="value"
                        startAngle={90}
                        endAngle={-270}
                     >
                        {donughtData.map((entry, index) => (
                           <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                        ))}
                     </Pie>
                  </PieChart>
               </ResponsiveContainer>
               {/* Center Icon/Text */}
               <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                   
               </div>
            </div>

            <div className="flex justify-center gap-6 w-full mt-4">
               {donughtData.map((entry, idx) => (
                  <div key={idx} className="text-center">
                     <div className="flex items-center gap-1 justify-center mb-1">
                        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">{entry.name}</span>
                     </div>
                     <p className="font-bold text-lg text-slate-800 dark:text-white">{entry.value}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* Top Patients */}
         <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm p-6 flex flex-col min-w-0">
            <div className="flex justify-between items-center mb-6">
               <h3 className="font-bold text-slate-800 dark:text-white">Top Patients</h3>
               <button className="text-xs text-slate-500 border border-slate-200 dark:border-slate-600 rounded px-2 py-1 flex items-center gap-1 hover:bg-slate-50 dark:hover:bg-slate-700">
                  Weekly <ChevronRight className="w-3 h-3 rotate-90" />
               </button>
            </div>
            
            <div className="space-y-4">
               {topPatients.map((patient, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <img src={patient.img} className="w-10 h-10 rounded-full" alt="" />
                        <div>
                           <p className="font-bold text-slate-800 dark:text-white text-sm">{patient.name}</p>
                           <p className="text-xs text-slate-500 dark:text-slate-400">{patient.phone}</p>
                        </div>
                     </div>
                     <span className="text-[10px] text-primary bg-primary-50 dark:bg-primary-900/20 border border-primary-100 dark:border-primary-900/30 px-2 py-1 rounded">
                        {patient.count} Appointments
                     </span>
                  </div>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
};
