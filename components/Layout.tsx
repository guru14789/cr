
import React, { useState, useEffect, useRef } from 'react';
import { 
  LayoutDashboard, Users, Calendar, Stethoscope, 
  Settings, LogOut, Bell, Search, Menu, Mail, X,
  Maximize, Moon, Sun, Globe, ChevronLeft, ChevronRight, ChevronDown, Grid, FileText,
  Beaker, Pill, Briefcase, Layers, ShieldCheck, 
  MessageSquare, MapPin, Box, Clock, DollarSign, 
  FileText as InvoiceIcon, CreditCard, UserPlus,
  PieChart, HelpCircle, AlertTriangle, Tag, CheckSquare,
  Activity, CheckCircle, Trash2, Plus
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: { id: string; label: string }[];
}

interface SidebarGroup {
  title: string;
  items: SidebarItem[];
}

interface Notification {
  id: number;
  title: string;
  desc: string;
  time: string;
  read: boolean;
  type: 'info' | 'alert' | 'success';
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  // Initialized as empty for accordion behavior
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('theme');
    // Default to light mode (false) unless explicitly saved as 'dark'
    return saved === 'dark';
  });

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: 1, title: 'New Appointment', desc: 'Dr. Sarah booked with Patient #1001', time: '2 min ago', read: false, type: 'success' },
    { id: 2, title: 'Server Load High', desc: 'System usage > 90%', time: '1 hour ago', read: false, type: 'alert' },
    { id: 3, title: 'Leave Request', desc: 'Nurse James requested leave', time: '3 hours ago', read: true, type: 'info' },
    { id: 4, title: 'Daily Report', desc: 'Yesterday\'s summary is ready', time: '1 day ago', read: true, type: 'info' },
  ]);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Apply Theme Effect
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Click Outside to close notifications
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
            setShowNotifications(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabChange = (tab: string) => {
    onTabChange(tab);
    setIsMobileMenuOpen(false);
  };

  const toggleSubmenu = (id: string) => {
    // Accordion style: Close others when opening one
    setExpandedMenus(prev => 
      prev.includes(id) ? [] : [id]
    );
  };

  const markAllAsRead = () => {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: number, e: React.MouseEvent) => {
      e.stopPropagation();
      setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const sidebarGroups: SidebarGroup[] = [
    {
      title: 'Main Menu',
      items: [
        { id: 'admin-dashboard', label: 'Admin Dashboard', icon: LayoutDashboard },
        { id: 'doctor-dashboard', label: 'Doctor Dashboard', icon: Stethoscope },
        { id: 'patient-dashboard', label: 'Patient Dashboard', icon: Users },
      ]
    },
    {
      title: 'Clinic',
      items: [
        { 
            id: 'doctors-group', 
            label: 'Doctors', 
            icon: UserPlus,
            children: [
                { id: 'doctors', label: 'Doctors' },
                { id: 'doctor-details', label: 'Doctor Details' },
                { id: 'add-doctor', label: 'Add Doctor' },
                { id: 'doctor-schedule', label: 'Doctor Schedule' },
            ]
        },
        { 
            id: 'patients-group', 
            label: 'Patients', 
            icon: Users,
            children: [
                { id: 'patients', label: 'Patients' },
                { id: 'patient-details', label: 'Patient Details' },
                { id: 'create-patient', label: 'Create Patient' },
            ]
        },
        { 
            id: 'appointments-group', 
            label: 'Appointments', 
            icon: Calendar,
            children: [
                { id: 'appointments', label: 'Appointments' },
                { id: 'new-appointment', label: 'New Appointment' },
                { id: 'calendar', label: 'Calendar' },
            ]
        },
        { id: 'locations', label: 'Locations', icon: MapPin },
        { id: 'services', label: 'Services', icon: Activity },
        { id: 'specializations', label: 'Specializations', icon: Tag },
        { id: 'assets', label: 'Assets', icon: Box },
      ]
    },
    {
      title: 'HRM',
      items: [
        { id: 'staffs', label: 'Staffs', icon: Briefcase },
        { id: 'departments', label: 'Departments', icon: Layers },
        { 
            id: 'leaves-group', 
            label: 'Leaves', 
            icon: Calendar,
            children: [
                { id: 'leaves', label: 'Leaves' },
                { id: 'leave-type', label: 'Leave Type' },
            ]
        },
        { id: 'payroll', label: 'Payroll', icon: DollarSign },
      ]
    },
    {
      title: 'Finance & Accounts',
      items: [
        { id: 'income', label: 'Income', icon: PieChart },
        { id: 'invoices', label: 'Invoices', icon: InvoiceIcon },
        { id: 'transactions', label: 'Transactions', icon: Grid },
      ]
    },
    {
      title: 'Administration',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'reports', label: 'Reports', icon: FileText },
      ]
    }
  ];

  // Automatically expand group if a child is active
  useEffect(() => {
    for (const group of sidebarGroups) {
      for (const item of group.items) {
        if (item.children && item.children.some(child => child.id === activeTab)) {
          setExpandedMenus([item.id]);
          return;
        }
      }
    }
  }, [activeTab]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 font-sans transition-colors duration-300">
      
      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 h-screen bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 z-50 transition-all duration-300 ease-in-out shadow-soft
          ${isSidebarCollapsed ? 'w-20' : 'w-72'}
          ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
      >
        {/* Sidebar Header */}
        <div className="h-20 flex items-center justify-between px-5 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-teal-400 rounded-xl flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
              <Plus className="w-6 h-6 stroke-[3]" />
            </div>
            {!isSidebarCollapsed && (
              <div className="flex flex-col">
                <span className="font-bold text-xl tracking-tight text-slate-800 dark:text-white">
                  Medi<span className="text-primary-600">CRM</span>
                </span>
                <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Healthcare 360</span>
              </div>
            )}
          </div>
          <button 
             onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
             className="hidden md:flex p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 transition-colors"
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
          <button 
             onClick={() => setIsMobileMenuOpen(false)}
             className="md:hidden p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Sidebar Menu */}
        <div className="h-[calc(100vh-5rem)] overflow-y-auto overflow-x-hidden py-6 px-4 custom-scrollbar">
          {sidebarGroups.map((group, idx) => (
             <div key={idx} className="mb-8">
                {!isSidebarCollapsed && (
                  <h3 className="px-3 text-xs font-bold text-slate-400/80 dark:text-slate-600 uppercase tracking-wider mb-3">
                    {group.title}
                  </h3>
                )}
                <div className="space-y-1.5">
                   {group.items.map(item => {
                     const isActive = activeTab === item.id || item.children?.some(c => c.id === activeTab);
                     const isExpanded = expandedMenus.includes(item.id);
                     
                     return (
                       <div key={item.id}>
                          <button
                            onClick={() => item.children ? toggleSubmenu(item.id) : handleTabChange(item.id)}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all duration-200 group relative
                              ${isActive 
                                ? 'bg-gradient-to-r from-primary-50 to-teal-50/50 dark:from-primary-900/20 dark:to-transparent text-primary-700 dark:text-primary-400 font-semibold' 
                                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'}
                            `}
                            title={isSidebarCollapsed ? item.label : ''}
                          >
                             {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-primary-600 rounded-r-full"></div>
                             )}
                             
                             <div className="flex items-center gap-3.5">
                                <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-primary-600 dark:text-primary-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-300'}`} />
                                {!isSidebarCollapsed && <span>{item.label}</span>}
                             </div>
                             {!isSidebarCollapsed && item.children && (
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                             )}
                             
                             {/* Tooltip for collapsed mode */}
                             {isSidebarCollapsed && (
                               <div className="absolute left-16 top-1/2 -translate-y-1/2 bg-slate-800 text-white text-xs px-3 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 whitespace-nowrap shadow-xl">
                                  {item.label}
                                </div>
                             )}
                          </button>

                          {/* Submenu */}
                          {!isSidebarCollapsed && item.children && isExpanded && (
                             <div className="mt-1 ml-5 pl-4 border-l border-slate-200 dark:border-slate-700 space-y-1 animate-in slide-in-from-top-1 duration-200">
                                {item.children.map(child => (
                                   <button
                                     key={child.id}
                                     onClick={() => handleTabChange(child.id)}
                                     className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all relative flex items-center
                                       ${activeTab === child.id 
                                         ? 'text-primary-700 dark:text-primary-400 font-medium bg-primary-50/50 dark:bg-primary-900/10' 
                                         : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}
                                     `}
                                   >
                                      {activeTab === child.id && <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mr-2"></div>}
                                      {child.label}
                                   </button>
                                ))}
                             </div>
                          )}
                       </div>
                     );
                   })}
                </div>
             </div>
          ))}
          
          <div className="pt-6 mt-2 border-t border-slate-100 dark:border-slate-800">
             <button className="w-full flex items-center gap-3 px-3.5 py-3 text-slate-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors group">
                <LogOut className="w-5 h-5 group-hover:stroke-red-600" />
                {!isSidebarCollapsed && <span className="font-medium">Sign Out</span>}
             </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-50/50 dark:bg-slate-950">
        
        {/* Top Header - Glass Effect */}
        <header className="h-20 glass border-b border-slate-200/60 dark:border-slate-800 sticky top-0 z-30 px-6 md:px-8 flex justify-between items-center transition-all duration-300">
           <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsMobileMenuOpen(true)}
                className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
              >
                 <Menu className="w-6 h-6" />
              </button>
              
              <div className="hidden md:flex items-center gap-3 bg-white dark:bg-slate-900 px-4 py-2.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-700 w-80 focus-within:ring-2 focus-within:ring-primary-100 focus-within:border-primary-400 transition-all">
                 <Search className="w-4 h-4 text-slate-400" />
                 <input 
                   type="text" 
                   placeholder="Search patients, doctors, records..." 
                   className="bg-transparent border-none outline-none text-sm w-full text-slate-700 dark:text-slate-200 placeholder:text-slate-400"
                 />
              </div>
           </div>

           <div className="flex items-center gap-3 md:gap-5">
               {/* Dark Mode Toggle */}
               <button 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
               >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
               </button>

               <button className="hidden sm:block p-2.5 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                  <Globe className="w-5 h-5" />
               </button>

               {/* Notifications */}
               <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-800 hover:shadow-sm rounded-full transition-all border border-transparent hover:border-slate-200 dark:hover:border-slate-700 relative"
                  >
                     <Bell className="w-5 h-5" />
                     {unreadCount > 0 && (
                       <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse"></span>
                     )}
                  </button>

                  {/* Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 top-full mt-4 w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700 z-50 animate-in fade-in zoom-in-95 duration-200 overflow-hidden">
                        <div className="p-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
                            <h3 className="font-bold text-slate-800 dark:text-white">Notifications</h3>
                            <button onClick={markAllAsRead} className="text-xs font-semibold text-primary-600 dark:text-primary-400 hover:underline">Mark all read</button>
                        </div>
                        <div className="max-h-[24rem] overflow-y-auto custom-scrollbar">
                           {notifications.length === 0 ? (
                             <div className="p-12 text-center text-slate-500 dark:text-slate-400 text-sm flex flex-col items-center">
                               <Bell className="w-8 h-8 mb-3 opacity-20" />
                               No new notifications
                             </div>
                           ) : (
                             notifications.map(note => (
                               <div key={note.id} className={`p-4 border-b border-slate-50 dark:border-slate-700 last:border-0 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors cursor-pointer group ${!note.read ? 'bg-primary-50/30 dark:bg-primary-900/10' : ''}`}>
                                  <div className="flex gap-4">
                                      <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 ${note.type === 'alert' ? 'bg-red-500 shadow-lg shadow-red-200' : note.type === 'success' ? 'bg-green-500 shadow-lg shadow-green-200' : 'bg-blue-500 shadow-lg shadow-blue-200'}`}></div>
                                      <div className="flex-1">
                                          <div className="flex justify-between items-start">
                                            <h4 className={`text-sm ${!note.read ? 'font-bold text-slate-800 dark:text-white' : 'font-medium text-slate-600 dark:text-slate-300'}`}>{note.title}</h4>
                                            <span className="text-[10px] text-slate-400">{note.time}</span>
                                          </div>
                                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">{note.desc}</p>
                                      </div>
                                      <button 
                                        onClick={(e) => deleteNotification(note.id, e)}
                                        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all self-center"
                                      >
                                          <Trash2 className="w-3.5 h-3.5" />
                                      </button>
                                  </div>
                               </div>
                             ))
                           )}
                        </div>
                        <div className="p-3 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 text-center">
                            <button className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 transition-colors">View All Activity</button>
                        </div>
                    </div>
                  )}
               </div>

               <div className="h-8 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block"></div>

               <div className="flex items-center gap-3 pl-1 cursor-pointer hover:bg-white dark:hover:bg-slate-800 p-1.5 pr-3 rounded-full border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all">
                  <div className="relative">
                    <img 
                      src="https://ui-avatars.com/api/?name=Dr+Admin&background=0d9488&color=fff" 
                      alt="Profile" 
                      className="w-9 h-9 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" 
                    />
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-slate-800 rounded-full"></div>
                  </div>
                  <div className="hidden md:block">
                     <p className="text-sm font-bold text-slate-800 dark:text-white leading-none">Dr. Admin</p>
                     <p className="text-[10px] font-bold text-primary-600 dark:text-primary-400 uppercase tracking-wide mt-0.5">Administrator</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-400" />
               </div>
           </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50/50 dark:bg-slate-950 scroll-smooth">
           <div className="max-w-7xl mx-auto">
             {children}
           </div>
        </main>

      </div>
    </div>
  );
};