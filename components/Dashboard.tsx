
import React, { useState, useMemo } from 'react';
import { 
  Users, DollarSign, Activity, TrendingUp, TrendingDown,
  Calendar, Clock, CheckCircle, X, Plus, MoreHorizontal, 
  ChevronDown, ChevronLeft, ChevronRight, MapPin, Phone, Mail,
  Stethoscope, BedDouble, FileText, ArrowUpRight, Search,
  Check, Edit, Trash2, AlertCircle
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend, LineChart, Line
} from 'recharts';
import { mockLeaveRequests } from '../services/mockData';

// --- Colors from Hospital Theme ---
const COLORS = {
  primary: '#0d9488', // Teal 600
  secondary: '#64748B', // Slate 500
  success: '#10b981', // Emerald 500
  warning: '#f59e0b', // Amber 500
  danger: '#ef4444', // Red 500
  info: '#0ea5e9', // Sky 500
  chartBlue: '#0ea5e9',
  chartTeal: '#14b8a6',
  chartPurple: '#8b5cf6',
  chartOrange: '#f97316',
  chartDonut: ['#0d9488', '#0ea5e9', '#f43f5e'] // Teal, Sky, Rose
};

interface AdminDashboardProps {
  onNavigate: (tab: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  // State for Leave Requests
  const [leaveRequests, setLeaveRequests] = useState(mockLeaveRequests.filter(l => l.status === 'Pending').slice(0, 5));
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Calendar State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleLeaveAction = (id: string, action: 'approve' | 'reject') => {
    setLeaveRequests(prev => prev.filter(lr => lr.id !== id));
    
    // Show visual feedback
    const message = action === 'approve' ? 'Leave Request Approved' : 'Leave Request Rejected';
    const type = action === 'approve' ? 'success' : 'error';
    setNotification({ message, type });

    // Auto hide notification
    setTimeout(() => setNotification(null), 3000);
  };

  // Calendar Logic
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay(); // 0 is Sunday

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
      setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  };

  const isSelected = (day: number) => {
      return day === selectedDate.getDate() &&
             currentDate.getMonth() === selectedDate.getMonth() &&
             currentDate.getFullYear() === selectedDate.getFullYear();
  };

  const isToday = (day: number) => {
      const today = new Date();
      return day === today.getDate() &&
             currentDate.getMonth() === today.getMonth() &&
             currentDate.getFullYear() === today.getFullYear();
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // --- 1. Stats Card Data ---
  const statsCards = useMemo(() => [
    { 
        label: 'Total Doctors', value: '247', change: '+95%', period: 'last 7 Days', 
        icon: Stethoscope, color: 'text-teal-600', bg: 'bg-teal-50 dark:bg-teal-900/20', 
        target: 'doctors',
        chart: (
            <BarChart data={[{v:20}, {v:40}, {v:30}, {v:70}, {v:40}, {v:80}, {v:60}]}>
                <Bar dataKey="v" fill="#0d9488" radius={[2, 2, 2, 2]} />
            </BarChart>
        ) 
    },
    { 
        label: 'Active Patients', value: '4,178', change: '+25%', period: 'last 7 Days', 
        icon: Users, color: 'text-sky-600', bg: 'bg-sky-50 dark:bg-sky-900/20', 
        target: 'patients',
        chart: (
            <LineChart data={[{v:20}, {v:30}, {v:25}, {v:45}, {v:35}, {v:50}, {v:45}]}>
                <Line type="monotone" dataKey="v" stroke="#0ea5e9" strokeWidth={3} dot={false} />
            </LineChart>
        ) 
    },
    { 
        label: 'Appointments', value: '12,178', change: '-15%', period: 'last 7 Days', 
        icon: Calendar, color: 'text-violet-600', bg: 'bg-violet-50 dark:bg-violet-900/20', 
        target: 'appointments',
        chart: (
            <BarChart data={[{v:50}, {v:40}, {v:60}, {v:30}, {v:50}, {v:40}, {v:60}]}>
                <Bar dataKey="v" fill="#8b5cf6" radius={[2, 2, 2, 2]} />
            </BarChart>
        ) 
    },
    { 
        label: 'Total Revenue', value: '$551,240', change: '+25%', period: 'last 7 Days', 
        icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50 dark:bg-emerald-900/20', 
        target: 'income',
        chart: (
            <AreaChart data={[{v:30}, {v:40}, {v:35}, {v:50}, {v:45}, {v:60}, {v:70}]}>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                </defs>
                <Area type="monotone" dataKey="v" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
            </AreaChart>
        ) 
    },
  ], []);

  // --- 2. Appointment Stats Data ---
  const aptStatsData = [
    { name: 'Jan', completed: 40, ongoing: 20, rescheduled: 10 },
    { name: 'Feb', completed: 30, ongoing: 15, rescheduled: 20 },
    { name: 'Mar', completed: 50, ongoing: 25, rescheduled: 15 },
    { name: 'Apr', completed: 45, ongoing: 20, rescheduled: 10 },
    { name: 'May', completed: 60, ongoing: 30, rescheduled: 25 },
    { name: 'Jun', completed: 55, ongoing: 25, rescheduled: 20 },
    { name: 'Jul', completed: 40, ongoing: 15, rescheduled: 10 },
    { name: 'Aug', completed: 50, ongoing: 25, rescheduled: 15 },
    { name: 'Sep', completed: 65, ongoing: 35, rescheduled: 20 },
    { name: 'Oct', completed: 55, ongoing: 25, rescheduled: 15 },
    { name: 'Nov', completed: 45, ongoing: 20, rescheduled: 10 },
    { name: 'Dec', completed: 60, ongoing: 30, rescheduled: 20 },
  ];

  // --- 3. Calendar Events ---
  const calendarEvents = useMemo(() => {
      const dateStr = selectedDate.toLocaleDateString('en-US', { weekday: 'short', day: '2-digit', month: 'short' });
      return [
        { title: 'General Checkup', date: `${dateStr}, 10:00 AM`, img: 'https://ui-avatars.com/api/?name=GV&background=0d9488&color=fff' },
        { title: 'Cardiology Consult', date: `${dateStr}, 02:15 PM`, img: 'https://ui-avatars.com/api/?name=CC&background=0ea5e9&color=fff' },
        { title: 'Post-Op Follow-up', date: `${dateStr}, 04:30 PM`, img: 'https://ui-avatars.com/api/?name=PF&background=f43f5e&color=fff' },
      ];
  }, [selectedDate]);

  // --- 4. Popular Doctors ---
  const popularDoctors = [
      { name: 'Dr. Alexander', specialty: 'Cardiologist', bookings: 258, img: 'https://ui-avatars.com/api/?name=DA&background=ccfbf1&color=0f766e' },
      { name: 'Dr. Emily', specialty: 'Pediatrician', bookings: 125, img: 'https://ui-avatars.com/api/?name=DE&background=e0f2fe&color=0369a1' },
      { name: 'Dr. David Lee', specialty: 'Gynecologist', bookings: 115, img: 'https://ui-avatars.com/api/?name=DL&background=fae8ff&color=86198f' },
  ];

  // --- 5. Doctor Schedule ---
  const doctorSchedule = [
      { name: 'Dr. Sarah Johnson', specialty: 'Orthopedic Surgeon', img: 'https://ui-avatars.com/api/?name=SJ&background=random' },
      { name: 'Dr. Emily Carter', specialty: 'Pediatrician', img: 'https://ui-avatars.com/api/?name=EC&background=random' },
      { name: 'Dr. David Lee', specialty: 'Gynecologist', img: 'https://ui-avatars.com/api/?name=DL&background=random' },
      { name: 'Dr. Michael Smith', specialty: 'Cardiologist', img: 'https://ui-avatars.com/api/?name=MS&background=random' },
  ];

  // --- 6. Income ---
  const incomeData = [
      { name: 'Cardiology', count: '4,556', amount: '$5,985' },
      { name: 'Radiology', count: '4,125', amount: '$5,194' },
      { name: 'Dental Surgery', count: '1,796', amount: '$2,716' },
      { name: 'Orthopaedics', count: '3,827', amount: '$4,682' },
      { name: 'General Medicine', count: '9,894', amount: '$9,450' },
  ];

  // --- 7. Appointments Table ---
  const appointments = [
      { doctor: 'Dr. John Smith', docSpec: 'Neurosurgeon', patient: 'Jesus Adams', patId: '#INV5889', date: '28 May 2025 - 11:15 AM', mode: 'Online', status: 'Confirmed', img1: 'https://ui-avatars.com/api/?name=JS&background=random', img2: 'https://ui-avatars.com/api/?name=JA&background=random' },
      { doctor: 'Dr. Lisa White', docSpec: 'Oncologist', patient: 'Ezra Belcher', patId: '#INV7874', date: '29 May 2025 - 11:30 AM', mode: 'In-Person', status: 'Cancelled', img1: 'https://ui-avatars.com/api/?name=LW&background=random', img2: 'https://ui-avatars.com/api/?name=EB&background=random' },
      { doctor: 'Dr. Patricia Brown', docSpec: 'Pulmonologist', patient: 'Glen Lentz', patId: '#INV4458', date: '30 May 2025 - 09:30 AM', mode: 'Online', status: 'Confirmed', img1: 'https://ui-avatars.com/api/?name=PB&background=random', img2: 'https://ui-avatars.com/api/?name=GL&background=random' },
      { doctor: 'Dr. Rachel Green', docSpec: 'Urologist', patient: 'Bernard Griffith', patId: '#INV5456', date: '30 May 2025 - 10:00 AM', mode: 'Online', status: 'Checked Out', img1: 'https://ui-avatars.com/api/?name=RG&background=random', img2: 'https://ui-avatars.com/api/?name=BG&background=random' },
      { doctor: 'Dr. Michael Smith', docSpec: 'Cardiologist', patient: 'John Elsass', patId: '#INV4557', date: '30 May 2025 - 11:00 AM', mode: 'Online', status: 'Schedule', img1: 'https://ui-avatars.com/api/?name=MS&background=random', img2: 'https://ui-avatars.com/api/?name=JE&background=random' },
  ];

  // --- 8. Bottom Lists ---
  const topPatients = [
      { name: 'Jesus Adams', paid: '$6589', apps: '80 Appointments', img: 'https://ui-avatars.com/api/?name=JA&background=random' },
      { name: 'Ezra Belcher', paid: '$5632', apps: '60 Appointments', img: 'https://ui-avatars.com/api/?name=EB&background=random' },
      { name: 'Glen Lentz', paid: '$4125', apps: '40 Appointments', img: 'https://ui-avatars.com/api/?name=GL&background=random' },
      { name: 'Bernard Griffith', paid: '$3140', apps: '25 Appointments', img: 'https://ui-avatars.com/api/?name=BG&background=random' },
      { name: 'John Elsass', paid: '$2654', apps: '25 Appointments', img: 'https://ui-avatars.com/api/?name=JE&background=random' },
  ];

  const transactions = [
      { name: 'General Check-up', id: '#INV5889', amount: '+$234', status: 'success' },
      { name: 'Online Consultation', id: '#INV7874', amount: '+$234', status: 'success' },
      { name: 'Purchase Product', id: '#INV4458', amount: '-$69', status: 'danger' },
      { name: 'Online Consultation', id: '#INV5456', amount: '+$234', status: 'success' },
      { name: 'Online Consultation', id: '#INV4557', amount: '+$234', status: 'success' },
  ];

  return (
    <div className="space-y-6 pb-10 animate-in fade-in duration-500 relative">
      
      {/* Action Notification */}
      {notification && (
        <div className={`fixed top-24 right-6 z-50 px-4 py-3 rounded-xl shadow-xl flex items-center gap-3 text-white animate-in slide-in-from-right-10 duration-300 ${notification.type === 'success' ? 'bg-emerald-600' : 'bg-rose-500'}`}>
           {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
           <span className="font-medium text-sm">{notification.message}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Admin Dashboard</h2>
          <div className="flex gap-3">
              <button 
                onClick={() => onNavigate('new-appointment')}
                className="bg-primary hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-primary-200 dark:shadow-none transition-all hover:scale-105 flex items-center gap-2"
              >
                  <Plus className="w-4 h-4 stroke-[3]" /> New Appointment
              </button>
              <button 
                onClick={() => onNavigate('doctor-schedule')}
                className="bg-white dark:bg-slate-800 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 border border-slate-200 px-5 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition-colors flex items-center gap-2"
              >
                  <Calendar className="w-4 h-4" /> Schedule
              </button>
          </div>
      </div>

      {/* 1. Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {statsCards.map((stat, idx) => (
              <div 
                key={idx} 
                onClick={() => onNavigate(stat.target)}
                className="bg-white dark:bg-slate-800 rounded-2xl p-5 shadow-soft border border-slate-100 dark:border-slate-800 flex justify-between items-stretch cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group border-t-4 hover:border-t-primary-500 min-w-0"
                style={{ borderTopColor: idx === 0 ? '#0d9488' : idx === 1 ? '#0ea5e9' : idx === 2 ? '#8b5cf6' : '#10b981' }}
              >
                  <div className="flex flex-col justify-between py-1 min-w-0">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                          <stat.icon className="w-6 h-6" />
                      </div>
                      <div>
                          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.label}</p>
                          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-1 truncate">{stat.value}</h3>
                      </div>
                  </div>
                  <div className="flex flex-col justify-between items-end min-w-0">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-rose-50 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'}`}>
                          {stat.change}
                      </span>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 text-right mb-2 font-medium">{stat.period}</p>
                      <div className="w-24 md:w-28 h-12 opacity-80 group-hover:opacity-100 transition-opacity">
                          <ResponsiveContainer width="100%" height="100%">
                              {stat.chart}
                          </ResponsiveContainer>
                      </div>
                  </div>
              </div>
          ))}
      </div>

      {/* 2. Appointment Statistics & Calendar */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Chart */}
          <div className="xl:col-span-2 bg-white dark:bg-slate-800 rounded-2xl p-4 md:p-6 shadow-soft border border-slate-100 dark:border-slate-800 min-w-0">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Appointment Statistics</h3>
                  <div className="flex items-center gap-2 border border-slate-200 dark:border-slate-700 rounded-lg p-1 bg-slate-50 dark:bg-slate-900">
                      <span className="text-xs font-bold px-3 py-1.5 bg-white dark:bg-slate-700 rounded-md text-slate-700 dark:text-white shadow-sm">Monthly</span>
                      <span className="text-xs font-medium px-3 py-1.5 text-slate-500 dark:text-slate-400 cursor-pointer hover:text-slate-700">Weekly</span>
                  </div>
              </div>
              
              {/* Tabs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-primary-50 dark:bg-primary-900/20 p-4 rounded-xl text-center border border-primary-100 dark:border-primary-900/30">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide flex items-center justify-center gap-1.5"><span className="w-2 h-2 rounded-full bg-primary"></span> All</p>
                      <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-1">6,314</p>
                  </div>
                  <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-xl text-center border border-rose-100 dark:border-rose-900/30">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide flex items-center justify-center gap-1.5"><span className="w-2 h-2 rounded-full bg-rose-500"></span> Cancelled</p>
                      <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-1">456</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-xl text-center border border-amber-100 dark:border-amber-900/30">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide flex items-center justify-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500"></span> Reschedule</p>
                      <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-1">745</p>
                  </div>
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-xl text-center border border-emerald-100 dark:border-emerald-900/30">
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide flex items-center justify-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Completed</p>
                      <p className="text-xl md:text-2xl font-bold text-slate-800 dark:text-white mt-1">4,578</p>
                  </div>
              </div>

              {/* Bar Chart */}
              <div className="h-[300px] md:h-[320px] w-full min-w-0">
                  <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={aptStatsData} barGap={8} barSize={8}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" strokeOpacity={0.6} />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 500}} />
                          <Tooltip 
                            cursor={{fill: 'transparent'}} 
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)', padding: '12px' }}
                          />
                          <Legend wrapperStyle={{paddingTop: '20px'}} iconType="circle" />
                          <Bar name="Completed" dataKey="completed" fill="#0ea5e9" radius={[4, 4, 4, 4]} />
                          <Bar name="Ongoing" dataKey="ongoing" fill="#0d9488" radius={[4, 4, 4, 4]} />
                          <Bar name="Rescheduled" dataKey="rescheduled" fill="#f59e0b" radius={[4, 4, 4, 4]} />
                      </BarChart>
                  </ResponsiveContainer>
              </div>
          </div>

          {/* Right Calendar/Appointments */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 flex flex-col min-w-0">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Appointments</h3>
                  <button 
                    onClick={() => onNavigate('appointments')}
                    className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 hover:text-primary-600 font-medium transition-colors"
                  >
                      View All <ChevronRight className="w-3 h-3" />
                  </button>
              </div>
              
              {/* Functional Mini Calendar */}
              <div className="mb-6 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between items-center mb-4">
                      <button onClick={handlePrevMonth} className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded-lg shadow-sm transition-all"><ChevronLeft className="w-4 h-4 text-slate-500" /></button>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                      </span>
                      <button onClick={handleNextMonth} className="p-1 hover:bg-white dark:hover:bg-slate-800 rounded-lg shadow-sm transition-all"><ChevronRight className="w-4 h-4 text-slate-500" /></button>
                  </div>
                  <div className="grid grid-cols-7 text-center text-xs gap-y-3">
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => <span key={d} className="text-slate-400 font-bold">{d}</span>)}
                      {/* Offset days */}
                      {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                          <span key={`empty-${i}`} />
                      ))}
                      {/* Days */}
                      {Array.from({length: daysInMonth}).map((_, i) => {
                          const day = i + 1;
                          const isSel = isSelected(day);
                          const isTdy = isToday(day);
                          return (
                            <span 
                                key={day} 
                                onClick={() => handleDateClick(day)}
                                className={`w-8 h-8 flex items-center justify-center rounded-lg mx-auto cursor-pointer transition-all text-xs font-medium
                                ${isSel 
                                    ? 'bg-primary text-white shadow-lg shadow-primary-500/30 scale-110' 
                                    : isTdy 
                                        ? 'bg-primary-100 text-primary-700 font-bold dark:bg-primary-900/50 dark:text-primary-300'
                                        : 'text-slate-600 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-700 hover:shadow-sm'
                                }`}
                            >
                                {day}
                            </span>
                          );
                      })}
                  </div>
              </div>

              {/* Dynamic Upcoming List */}
              <div className="space-y-3 mb-4 flex-1 overflow-y-auto pr-1 custom-scrollbar min-h-[150px]">
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                      {selectedDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long' })}
                  </div>
                  {calendarEvents.map((ev, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-800 hover:shadow-md transition-all group cursor-pointer">
                          <div className="relative">
                             <img src={ev.img} alt="user" className="w-10 h-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" />
                             <div className="absolute -bottom-1 -right-1 bg-white dark:bg-slate-800 rounded-full p-0.5">
                                <div className="w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-slate-800"></div>
                             </div>
                          </div>
                          <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-primary-600 transition-colors truncate">{ev.title}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1 font-medium">
                                  <Clock className="w-3 h-3" /> {ev.date.split(', ')[1]}
                              </p>
                          </div>
                          <button className="p-1.5 rounded-lg text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-colors">
                             <ArrowUpRight className="w-4 h-4" />
                          </button>
                      </div>
                  ))}
              </div>
          </div>
      </div>

      {/* 3. Popular Doctors */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 min-w-0">
          <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">Top Performing Doctors</h3>
              <button 
                onClick={() => onNavigate('doctors')}
                className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-700 font-medium"
              >
                  Weekly Report <ChevronDown className="w-3 h-3" />
              </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {popularDoctors.map((doc, idx) => (
                  <div key={idx} className="border border-slate-100 dark:border-slate-800 rounded-2xl p-5 flex items-center gap-4 hover:shadow-lg transition-all bg-slate-50/30 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800">
                      <div className="relative">
                          <img src={doc.img} alt={doc.name} className="w-16 h-16 rounded-full object-cover shadow-md" />
                          <div className="absolute bottom-0 right-0 px-1.5 py-0.5 bg-white dark:bg-slate-800 rounded-full shadow-sm text-[10px] font-bold text-slate-700 flex items-center gap-0.5">
                             ⭐ 4.9
                          </div>
                      </div>
                      <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-slate-800 dark:text-white text-base truncate">{doc.name}</h4>
                          <p className="text-primary-600 dark:text-primary-400 text-xs font-medium mb-1.5 uppercase tracking-wide truncate">{doc.specialty}</p>
                          <div className="flex items-center gap-2">
                             <div className="h-1.5 w-16 bg-slate-200 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-primary rounded-full" style={{width: '85%'}}></div>
                             </div>
                             <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{doc.bookings} Visits</p>
                          </div>
                      </div>
                  </div>
              ))}
          </div>
      </div>

      {/* 4. Mid Section: Depts, Schedule, Income */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Departments */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 min-w-0">
              <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Department Split</h3>
                  <button onClick={() => onNavigate('departments')} className="p-1 hover:bg-slate-50 rounded-lg text-slate-400"><MoreHorizontal className="w-5 h-5" /></button>
              </div>
              <div className="h-64 relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                          <Pie 
                              data={[{name: 'Cardiology', value: 214}, {name: 'Dental', value: 150}, {name: 'Neurology', value: 121}]} 
                              innerRadius={70} outerRadius={90} 
                              dataKey="value" stroke="none"
                              paddingAngle={5}
                              cornerRadius={5}
                          >
                              {COLORS.chartDonut.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry} />
                              ))}
                          </Pie>
                      </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Total Patients</p>
                      <p className="text-3xl font-extrabold text-slate-800 dark:text-white">638</p>
                  </div>
              </div>
              <div className="flex justify-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 flex-wrap">
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-teal-600"></span> Cardiology</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-sky-500"></span> Dental</div>
                  <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-rose-500"></span> Neurology</div>
              </div>
          </div>

          {/* Doctors Schedule */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 min-w-0">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Doctors Availability</h3>
                  <button 
                    onClick={() => onNavigate('doctor-schedule')}
                    className="text-xs text-primary-600 font-bold uppercase hover:underline tracking-wide"
                  >
                      View All
                  </button>
              </div>
              <div className="flex justify-between mb-8 text-center bg-slate-50 dark:bg-slate-900/50 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div><p className="text-xs text-slate-500 font-bold uppercase mb-1">Available</p><p className="text-2xl font-extrabold text-emerald-600">48</p></div>
                  <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                  <div><p className="text-xs text-slate-500 font-bold uppercase mb-1">Busy</p><p className="text-2xl font-extrabold text-amber-500">28</p></div>
                  <div className="w-px bg-slate-200 dark:bg-slate-700"></div>
                  <div><p className="text-xs text-slate-500 font-bold uppercase mb-1">Leave</p><p className="text-2xl font-extrabold text-rose-500">12</p></div>
              </div>
              <div className="space-y-5">
                  {doctorSchedule.map((doc, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                          <div className="relative">
                             <img src={doc.img} alt={doc.name} className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-slate-700 shadow-sm" />
                             <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></span>
                          </div>
                          <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-bold text-slate-800 dark:text-white truncate">{doc.name}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 truncate font-medium">{doc.specialty}</p>
                          </div>
                          <button 
                            onClick={() => onNavigate('new-appointment')}
                            className="bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs px-3 py-1.5 rounded-lg font-bold hover:bg-primary hover:text-white transition-colors"
                          >
                            Book
                          </button>
                      </div>
                  ))}
              </div>
          </div>

          {/* Income By Treatment */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 min-w-0">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Revenue Stream</h3>
                  <div className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-md flex items-center gap-1">
                     <TrendingUp className="w-3 h-3" /> +12%
                  </div>
              </div>
              <div className="space-y-6">
                  {incomeData.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center group">
                          <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-500">
                                {idx + 1}
                              </div>
                              <div>
                                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">{item.name}</h4>
                                  <p className="text-[10px] text-slate-400 font-medium uppercase">{item.count} Cases</p>
                              </div>
                          </div>
                          <h4 className="text-sm font-bold text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">{item.amount}</h4>
                      </div>
                  ))}
              </div>
              <button onClick={() => onNavigate('income')} className="w-full mt-6 py-2.5 border border-dashed border-slate-300 rounded-xl text-xs font-bold text-slate-500 hover:border-primary hover:text-primary transition-colors">
                  View Full Report
              </button>
          </div>
      </div>

      {/* 5. All Appointments Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 min-w-0">
          <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-800 dark:text-white text-lg">Recent Appointments</h3>
              <button 
                onClick={() => onNavigate('appointments')}
                className="text-xs text-slate-600 dark:text-slate-400 font-bold border border-slate-200 dark:border-slate-700 px-4 py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                  View All
              </button>
          </div>
          <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                  <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-700 text-xs font-bold text-slate-400 uppercase tracking-wider">
                          <th className="py-4 px-2 min-w-[150px]">Doctor</th>
                          <th className="py-4 px-2 min-w-[150px]">Patient</th>
                          <th className="py-4 px-2 min-w-[120px]">Date & Time</th>
                          <th className="py-4 px-2">Mode</th>
                          <th className="py-4 px-2">Status</th>
                          <th className="py-4 px-2 text-right">Action</th>
                      </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-50 dark:divide-slate-800/50">
                      {appointments.map((apt, idx) => (
                          <tr key={idx} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 transition-colors group">
                              <td className="py-3 px-2">
                                  <div className="flex items-center gap-3">
                                      <img src={apt.img1} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                                      <div>
                                          <p className="font-bold text-slate-800 dark:text-white">{apt.doctor}</p>
                                          <p className="text-xs text-primary-600 dark:text-primary-400 font-medium">{apt.docSpec}</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="py-3 px-2">
                                  <div className="flex items-center gap-3">
                                      <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold text-xs">
                                          {apt.patient.charAt(0)}
                                      </div>
                                      <div>
                                          <p className="font-bold text-slate-800 dark:text-white">{apt.patient}</p>
                                          <p className="text-xs text-slate-400 font-mono">{apt.patId}</p>
                                      </div>
                                  </div>
                              </td>
                              <td className="py-3 px-2 text-slate-600 dark:text-slate-300 font-medium">
                                  <div className="flex items-center gap-2">
                                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                                      {apt.date.split(' - ')[0]}
                                  </div>
                                  <div className="flex items-center gap-2 mt-1 text-xs text-slate-400">
                                      <Clock className="w-3 h-3" />
                                      {apt.date.split(' - ')[1]}
                                  </div>
                              </td>
                              <td className="py-3 px-2">
                                  <span className={`text-xs font-bold px-2 py-1 rounded-md ${apt.mode === 'Online' ? 'bg-sky-50 text-sky-600' : 'bg-orange-50 text-orange-600'}`}>
                                      {apt.mode}
                                  </span>
                              </td>
                              <td className="py-3 px-2">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wide border ${
                                      apt.status === 'Confirmed' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' :
                                      apt.status === 'Cancelled' ? 'text-rose-600 bg-rose-50 border-rose-100' :
                                      apt.status === 'Checked Out' ? 'text-violet-600 bg-violet-50 border-violet-100' :
                                      'text-blue-600 bg-blue-50 border-blue-100'
                                  }`}>
                                      {apt.status}
                                  </span>
                              </td>
                              <td className="py-3 px-2 text-right">
                                  <button className="p-1.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors">
                                      <MoreHorizontal className="w-4 h-4" />
                                  </button>
                              </td>
                          </tr>
                      ))}
                  </tbody>
              </table>
          </div>
      </div>

      {/* 6. Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Top 5 Patients */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 min-w-0">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Loyal Patients</h3>
                  <button className="text-xs text-slate-500 font-bold hover:text-slate-800">View All</button>
              </div>
              <div className="space-y-5">
                  {topPatients.map((p, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                          <img src={p.img} alt="" className="w-10 h-10 rounded-full border-2 border-white shadow-sm" />
                          <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">{p.name}</h4>
                              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">Paid: <span className="text-emerald-600">{p.paid}</span></p>
                          </div>
                          <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-100">{p.apps}</span>
                      </div>
                  ))}
              </div>
          </div>

          {/* Recent Transactions */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 min-w-0">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-slate-800 dark:text-white text-lg">Billing</h3>
                  <button onClick={() => onNavigate('transactions')} className="p-1.5 hover:bg-slate-100 rounded-lg text-slate-400"><ArrowUpRight className="w-4 h-4" /></button>
              </div>
              <div className="space-y-4">
                  {transactions.map((t, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md ${t.name.includes('Purchase') ? 'bg-gradient-to-br from-violet-500 to-indigo-600' : 'bg-gradient-to-br from-teal-400 to-emerald-600'}`}>
                             {t.name.includes('Purchase') ? 'S' : 'P'}
                          </div>
                          <div className="flex-1 min-w-0">
                              <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">{t.name}</h4>
                              <p className="text-xs text-slate-400 font-medium">{t.id}</p>
                          </div>
                          <span className={`text-sm font-bold ${t.status === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                              {t.amount}
                          </span>
                      </div>
                  ))}
              </div>
          </div>

          {/* Leave Requests */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-soft border border-slate-100 dark:border-slate-800 min-w-0">
              <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                      <h3 className="font-bold text-slate-800 dark:text-white text-lg">Pending Leaves</h3>
                      <span className="bg-rose-500 text-white px-2 py-0.5 rounded-md text-[10px] font-bold">{leaveRequests.length}</span>
                  </div>
                  <button 
                    onClick={() => onNavigate('leaves')}
                    className="text-xs text-slate-500 font-bold hover:text-slate-800"
                  >
                      Manage
                  </button>
              </div>
              <div className="space-y-4 min-h-[250px]">
                  {leaveRequests.length === 0 ? (
                      <div className="flex flex-col items-center justify-center h-full text-slate-400 py-8">
                          <CheckCircle className="w-10 h-10 mb-2 opacity-20" />
                          <p className="text-sm font-medium">All caught up!</p>
                      </div>
                  ) : (
                      leaveRequests.map((lr) => (
                          <div key={lr.id} className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-slate-100 dark:border-slate-800">
                              <img src={lr.image} alt="" className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700" />
                              <div className="flex-1 min-w-0">
                                  <h4 className="font-bold text-slate-800 dark:text-white text-sm truncate">{lr.employeeName}</h4>
                                  <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 font-medium">
                                      <span className="bg-white px-1.5 rounded border border-slate-200">{lr.type}</span>
                                      <span>{lr.days}d</span>
                                  </div>
                              </div>
                              <div className="flex gap-2">
                                  <button 
                                      onClick={() => handleLeaveAction(lr.id, 'reject')}
                                      className="w-8 h-8 rounded-lg border border-rose-200 text-rose-500 hover:bg-rose-50 flex items-center justify-center transition-colors"
                                  >
                                      <X className="w-4 h-4" />
                                  </button>
                                  <button 
                                      onClick={() => handleLeaveAction(lr.id, 'approve')}
                                      className="w-8 h-8 rounded-lg bg-emerald-500 text-white hover:bg-emerald-600 flex items-center justify-center shadow-sm transition-colors"
                                  >
                                      <Check className="w-4 h-4" />
                                  </button>
                              </div>
                          </div>
                      ))
                  )}
              </div>
          </div>
      </div>
    </div>
  );
};
