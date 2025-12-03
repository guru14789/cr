
import React, { useState } from 'react';
import { 
  User, Globe, Building, Smartphone, Monitor, DollarSign, MoreHorizontal,
  Camera, ChevronRight, ChevronDown, Lock, Shield, Mail, Phone, Ban, Trash2,
  Edit2, ToggleRight, LogOut, Laptop, Chrome, Smartphone as PhoneIcon,
  Plus, Search, Check, X, Image as ImageIcon, FileText, Star,
  Bell, Share2, Calendar, Clock, AlertCircle, Briefcase, Layers, Tag,
  Video, MessageSquare
} from 'lucide-react';

export const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  // Sidebar expansion state - keys are parent IDs
  const [expandedMenus, setExpandedMenus] = useState<string[]>(['account', 'website', 'clinic', 'app']);

  // --- Mock Data & State for various pages ---

  // Notifications
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'New Appointment Booking', desc: 'Alert when an appointment is booked', email: true, sms: true, inapp: true },
    { id: 2, title: 'Appointment Cancellation', desc: 'Alert if a appointment is cancel', email: true, sms: true, inapp: true },
    { id: 3, title: 'Lab Report Ready', desc: 'Notify when test reports are available', email: true, sms: true, inapp: true },
    { id: 4, title: 'Follow-up Reminders', desc: 'Scheduled follow-ups from doctors', email: true, sms: true, inapp: true },
    { id: 5, title: 'Billing/Invoice Notification', desc: 'Notify when a new bill or invoice is generated', email: true, sms: true, inapp: true },
    { id: 6, title: 'System Alerts', desc: 'Login attempts, data changes, or system updates.', email: true, sms: true, inapp: true },
  ]);

  // Devices
  const devices = [
    { id: 1, name: 'Chrome - Windows', date: '30 Apr 2025, 11:15 AM', icon: Chrome },
    { id: 2, name: 'Safari Macos', date: '30 Apr 2025, 11:15 AM', icon: Laptop },
    { id: 3, name: 'Chrome - Windows', date: '30 Apr 2025, 11:15 AM', icon: Chrome },
    { id: 4, name: 'Chrome - Windows', date: '19 Mar 2025, 02:50 PM', icon: Chrome },
  ];

  // Working Hours
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [workingDays, setWorkingDays] = useState(weekDays.map(d => ({
      day: d, 
      isOpen: !['Saturday', 'Sunday'].includes(d),
      start: '09:30 AM', 
      end: '09:30 AM'
  })));

  // Cancellation Reasons
  const [cancelReasons, setCancelReasons] = useState([
      { id: 1, reason: 'Personal Emergency', date: '30 Apr 2025', status: 'Active' },
      { id: 2, reason: 'Feeling Better', date: '15 Apr 2025', status: 'Active' },
      { id: 3, reason: 'Transportation Issues', date: '02 Apr 2025', status: 'Active' },
      { id: 4, reason: 'Booked by Mistake', date: '27 Mar 2025', status: 'Active' },
      { id: 5, reason: 'Forgot Appointment', date: '25 Jan 2025', status: 'Inactive' },
  ]);

  // Signatures
  const [signatures, setSignatures] = useState([
      { id: 1, name: 'Samuel Donatte', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/John_Hancock_Signature.svg/1200px-John_Hancock_Signature.svg.png', status: 'Active', isDefault: true },
      { id: 2, name: 'Michael Smith', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Barack_Obama_signature.svg/1200px-Barack_Obama_signature.svg.png', status: 'Active', isDefault: false },
      { id: 3, name: 'Alberto Alleo', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Signature_of_Donald_Trump.svg/1200px-Signature_of_Donald_Trump.svg.png', status: 'Active', isDefault: false },
      { id: 4, name: 'Ernesto Janetts', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Signature_of_Joe_Biden.svg/1200px-Signature_of_Joe_Biden.svg.png', status: 'Inactive', isDefault: false },
  ]);

  // Custom Fields
  const [customFields, setCustomFields] = useState([
      { id: 1, module: 'Patient', label: 'Preferred Language', type: 'Select', default: 'English', required: true, status: 'Active' },
      { id: 2, module: 'Staff', label: 'Job Type', type: 'Text', default: 'Full Time', required: true, status: 'Active' },
  ]);

  // --- Helpers ---
  const toggleMenu = (id: string) => {
    setExpandedMenus(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const inputClass = "w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 bg-slate-50/50 dark:bg-slate-900 text-slate-800 dark:text-white transition-all text-sm";
  const labelClass = "block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wide";
  
  // --- Render Functions ---

  const renderProfile = () => (
    <div className="space-y-8 animate-in fade-in duration-300">
      <section className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Basic Information</h3>
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex flex-col items-center gap-3">
                <div className="relative group cursor-pointer">
                  <img src="https://ui-avatars.com/api/?name=Dr+Admin&size=128&background=0d9488&color=fff" alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-slate-100 dark:border-slate-700 shadow-sm group-hover:border-primary transition-colors" />
                  <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
                      <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wide">Profile Image</p>
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                <div><label className={labelClass}>First Name <span className="text-rose-500">*</span></label><input type="text" className={inputClass} defaultValue="James" /></div>
                <div><label className={labelClass}>Last Name <span className="text-rose-500">*</span></label><input type="text" className={inputClass} defaultValue="Adair" /></div>
                <div><label className={labelClass}>Email <span className="text-rose-500">*</span></label><input type="email" className={inputClass} defaultValue="james@gmail.com" /></div>
                <div><label className={labelClass}>Phone Number <span className="text-rose-500">*</span></label><input type="tel" className={inputClass} defaultValue="+1 41245 54132" /></div>
            </div>
          </div>
      </section>
      <section className="space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-4">Address Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div><label className={labelClass}>Address Line 1</label><input type="text" className={inputClass} /></div>
            <div><label className={labelClass}>Address Line 2</label><input type="text" className={inputClass} /></div>
            <div><label className={labelClass}>Country</label><select className={inputClass}><option>Select</option><option>USA</option><option>UK</option></select></div>
            <div><label className={labelClass}>State</label><select className={inputClass}><option>Select</option><option>California</option></select></div>
            <div><label className={labelClass}>City</label><select className={inputClass}><option>Select</option><option>Los Angeles</option></select></div>
            <div><label className={labelClass}>Pincode</label><input type="text" className={inputClass} /></div>
          </div>
      </section>
      <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          <button className="px-6 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">Cancel</button>
          <button className="px-6 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 transition-all hover:scale-105">Save Changes</button>
      </div>
    </div>
  );

  const renderSecurity = () => (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-in fade-in duration-300">
      <div className="xl:col-span-2 space-y-6">
          <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">Security Settings</h3>
          {[
            { label: 'Password', desc: 'Set a unique password to secure the account' },
            { label: 'Two Factor Authentication', desc: 'Use your mobile phone to receive security PIN.', toggle: true },
            { label: 'Google Authentication', desc: 'Connect to Google', toggle: true },
            { label: 'Phone Number', desc: 'Phone Number associated with the account', actions: true },
            { label: 'Email Address', desc: 'Email Address associated with the account', actions: true },
            { label: 'Deactivate Account', desc: 'Your account will be deactivated and reactivated upon signing in again.', button: <Ban className="w-4 h-4" /> },
            { label: 'Delete Account', desc: 'Your account will be permanently deleted', button: <Trash2 className="w-4 h-4" /> }
          ].map((item, idx) => (
             <div key={idx} className="flex justify-between items-center py-5 border-b border-slate-100 dark:border-slate-800 last:border-0 group">
                 <div className="max-w-[80%]">
                    <h4 className="font-bold text-slate-800 dark:text-white text-sm">{item.label}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.desc}</p>
                 </div>
                 {item.toggle ? (
                    <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary cursor-pointer"><span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition shadow-sm" /></div>
                 ) : item.actions ? (
                    <div className="flex gap-2">
                        <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors"><Trash2 className="w-4 h-4" /></button>
                    </div>
                 ) : item.button ? (
                    <button className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg transition-colors">{item.button}</button>
                 ) : (
                    <button className="p-2 text-slate-400 hover:text-primary hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg transition-colors"><Edit2 className="w-4 h-4" /></button>
                 )}
             </div>
          ))}
      </div>
      <div className="xl:col-span-1">
         <div className="bg-slate-50/50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-800 h-full">
            <h4 className="font-bold text-slate-800 dark:text-white mb-2 text-sm uppercase tracking-wide">Browsers & Devices</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6 font-medium">Active sessions on your account</p>
            <button className="w-full bg-slate-200 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-900/30 text-slate-700 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-400 py-2.5 rounded-xl text-sm font-bold flex items-center justify-center gap-2 mb-6 transition-colors shadow-sm">
                <LogOut className="w-4 h-4" /> Sign out from all
            </button>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
               {devices.map(device => (
                  <div key={device.id} className="flex items-start gap-3 p-3 bg-white dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow">
                     <div className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300"><device.icon className="w-5 h-5" /></div>
                     <div className="flex-1 min-w-0"><h5 className="font-bold text-slate-800 dark:text-white text-sm">{device.name}</h5><p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">{device.date}</p></div>
                     <button className="text-slate-400 hover:text-rose-500 p-1.5 rounded hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-colors"><LogOut className="w-4 h-4" /></button>
                  </div>
               ))}
            </div>
         </div>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Notification Preferences</h3>
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
                        <th className="py-3 px-2 w-1/2">Activity Type</th>
                        <th className="py-3 px-2 text-center">Email</th>
                        <th className="py-3 px-2 text-center">SMS</th>
                        <th className="py-3 px-2 text-center">App Push</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {notifications.map(notif => (
                        <tr key={notif.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                            <td className="py-4 px-2">
                                <h4 className="font-bold text-slate-800 dark:text-white text-sm">{notif.title}</h4>
                                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{notif.desc}</p>
                            </td>
                            <td className="py-4 px-2 text-center">
                                <input type="checkbox" checked={notif.email} onChange={() => {}} className="accent-primary w-4 h-4 rounded cursor-pointer" />
                            </td>
                            <td className="py-4 px-2 text-center">
                                <input type="checkbox" checked={notif.sms} onChange={() => {}} className="accent-primary w-4 h-4 rounded cursor-pointer" />
                            </td>
                            <td className="py-4 px-2 text-center">
                                <input type="checkbox" checked={notif.inapp} onChange={() => {}} className="accent-primary w-4 h-4 rounded cursor-pointer" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        <div className="flex justify-end pt-6">
            <button className="px-6 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 transition-all hover:scale-105">Save Preferences</button>
        </div>
    </div>
  );

  const renderIntegrations = () => (
    <div className="space-y-6 animate-in fade-in duration-300">
        <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-6">Connected Apps</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
                { name: 'Google Calendar', desc: 'Sync appointments with your calendar', icon: Calendar, connected: true },
                { name: 'Zoom', desc: 'Enable video consultations', icon: Video, connected: false },
                { name: 'Stripe', desc: 'Process payments securely', icon: DollarSign, connected: true },
                { name: 'Slack', desc: 'Get team notifications', icon: MessageSquare, connected: false },
            ].map((app, idx) => (
                <div key={idx} className="p-5 border border-slate-200 dark:border-slate-700 rounded-2xl flex items-start gap-4 hover:shadow-md transition-shadow bg-white dark:bg-slate-800">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${app.connected ? 'bg-primary-50 text-primary dark:bg-primary-900/20' : 'bg-slate-100 text-slate-500 dark:bg-slate-700'}`}>
                        <app.icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h4 className="font-bold text-slate-800 dark:text-white">{app.name}</h4>
                            <div className={`relative inline-flex h-5 w-9 items-center rounded-full cursor-pointer transition-colors ${app.connected ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-600'}`}>
                                <span className={`inline-block h-3 w-3 transform rounded-full bg-white transition shadow-sm ${app.connected ? 'translate-x-5' : 'translate-x-1'}`} />
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{app.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );

  // --- Main Render ---
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-10">
      <div><h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Settings</h1></div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full lg:w-72 shrink-0 space-y-2">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-3 sticky top-24">
            
            {/* Account Settings Group */}
            <div>
              <button onClick={() => toggleMenu('account')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all mb-1 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${expandedMenus.includes('account') ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                <div className="flex items-center gap-3"><div className="p-1.5 bg-primary-50 dark:bg-primary-900/20 rounded-lg text-primary"><User className="w-4 h-4" /></div> Account Settings</div>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedMenus.includes('account') ? 'rotate-90 text-primary' : 'text-slate-400'}`} />
              </button>
              {expandedMenus.includes('account') && (
                <div className="ml-11 space-y-1 my-1 border-l-2 border-slate-100 dark:border-slate-700 pl-2">
                   {[
                     { id: 'profile', label: 'Profile' },
                     { id: 'security', label: 'Security' },
                     { id: 'notifications', label: 'Notifications' },
                     { id: 'integrations', label: 'Integrations' }
                   ].map(sub => (
                     <button key={sub.id} onClick={() => setActiveTab(sub.id)} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all relative flex items-center ${activeTab === sub.id ? 'text-primary font-bold bg-primary-50 dark:bg-primary-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/50'}`}>
                        {sub.label}
                     </button>
                   ))}
                </div>
              )}
            </div>

            {/* Website Settings Group */}
            <div>
              <button onClick={() => toggleMenu('website')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all mb-1 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${expandedMenus.includes('website') ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                <div className="flex items-center gap-3"><div className="p-1.5 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-500"><Globe className="w-4 h-4" /></div> Website Settings</div>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedMenus.includes('website') ? 'rotate-90 text-blue-500' : 'text-slate-400'}`} />
              </button>
              {expandedMenus.includes('website') && (
                <div className="ml-11 space-y-1 my-1 border-l-2 border-slate-100 dark:border-slate-700 pl-2">
                   <button onClick={() => setActiveTab('organization')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeTab === 'organization' ? 'text-primary font-bold bg-primary-50 dark:bg-primary-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>Organization</button>
                </div>
              )}
            </div>

            {/* Clinic Settings Group */}
            <div>
              <button onClick={() => toggleMenu('clinic')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all mb-1 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${expandedMenus.includes('clinic') ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                <div className="flex items-center gap-3"><div className="p-1.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg text-emerald-500"><Building className="w-4 h-4" /></div> Clinic Settings</div>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedMenus.includes('clinic') ? 'rotate-90 text-emerald-500' : 'text-slate-400'}`} />
              </button>
              {expandedMenus.includes('clinic') && (
                <div className="ml-11 space-y-1 my-1 border-l-2 border-slate-100 dark:border-slate-700 pl-2">
                   <button onClick={() => setActiveTab('appointment-settings')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeTab === 'appointment-settings' ? 'text-primary font-bold bg-primary-50 dark:bg-primary-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>Appointment</button>
                   <button onClick={() => setActiveTab('working-hours')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeTab === 'working-hours' ? 'text-primary font-bold bg-primary-50 dark:bg-primary-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>Working Hours</button>
                   <button onClick={() => setActiveTab('cancellation')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeTab === 'cancellation' ? 'text-primary font-bold bg-primary-50 dark:bg-primary-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>Cancellation Reason</button>
                </div>
              )}
            </div>

            {/* App Settings Group */}
            <div>
              <button onClick={() => toggleMenu('app')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all mb-1 hover:bg-slate-50 dark:hover:bg-slate-700/50 ${expandedMenus.includes('app') ? 'text-slate-800 dark:text-white' : 'text-slate-600 dark:text-slate-400'}`}>
                <div className="flex items-center gap-3"><div className="p-1.5 bg-violet-50 dark:bg-violet-900/20 rounded-lg text-violet-500"><Smartphone className="w-4 h-4" /></div> App Settings</div>
                <ChevronRight className={`w-4 h-4 transition-transform ${expandedMenus.includes('app') ? 'rotate-90 text-violet-500' : 'text-slate-400'}`} />
              </button>
              {expandedMenus.includes('app') && (
                <div className="ml-11 space-y-1 my-1 border-l-2 border-slate-100 dark:border-slate-700 pl-2">
                   <button onClick={() => setActiveTab('invoice-settings')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeTab === 'invoice-settings' ? 'text-primary font-bold bg-primary-50 dark:bg-primary-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>Invoice Settings</button>
                   <button onClick={() => setActiveTab('invoice-templates')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeTab === 'invoice-templates' ? 'text-primary font-bold bg-primary-50 dark:bg-primary-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>Invoice Templates</button>
                   <button onClick={() => setActiveTab('signatures')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeTab === 'signatures' ? 'text-primary font-bold bg-primary-50 dark:bg-primary-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>Signatures</button>
                   <button onClick={() => setActiveTab('custom-fields')} className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all ${activeTab === 'custom-fields' ? 'text-primary font-bold bg-primary-50 dark:bg-primary-900/20' : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'}`}>Custom Fields</button>
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 p-6 md:p-8 min-h-[600px]">
           {activeTab === 'profile' && renderProfile()}
           {activeTab === 'security' && renderSecurity()}
           {activeTab === 'notifications' && renderNotifications()}
           {activeTab === 'integrations' && renderIntegrations()}
           
           {!['profile', 'security', 'notifications', 'integrations'].includes(activeTab) && (
             <div className="flex flex-col items-center justify-center h-full text-slate-400">
                <div className="p-6 bg-slate-50 dark:bg-slate-700/50 rounded-full mb-4"><Monitor className="w-10 h-10 text-slate-300 dark:text-slate-500" /></div>
                <p className="font-medium">Settings panel for <span className="font-bold text-slate-600 dark:text-slate-300 capitalize">{activeTab.replace('-', ' ')}</span></p>
                <p className="text-sm mt-2 max-w-md text-center">Use the sidebar to navigate between different configuration modules.</p>
             </div>
           )}
        </div>
      </div>
    </div>
  );
};
