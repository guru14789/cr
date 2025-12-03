
import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, Clock, User, Video, MapPin, 
  ChevronLeft, ChevronRight, Plus, X, Search, CheckCircle, AlertCircle
} from 'lucide-react';
import { mockAppointments, mockDoctors, mockPatients, addMockAppointment } from '../services/mockData';
import { Appointment, Patient, Doctor } from '../types';

interface AppointmentCalendarProps {
  initialDoctorId?: string | null;
}

export const AppointmentCalendar: React.FC<AppointmentCalendarProps> = ({ initialDoctorId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Filter State
  const [selectedDoctorFilter, setSelectedDoctorFilter] = useState<string | null>(initialDoctorId || null);

  // Booking Form State
  const [patientSearch, setPatientSearch] = useState('');
  const [showPatientResults, setShowPatientResults] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    time: '09:00 AM',
    type: 'In-Person' as Appointment['type'],
    notes: ''
  });

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', 
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'
  ];

  // Refresh appointments when component mounts
  useEffect(() => {
    setAppointments(mockAppointments);
  }, [isModalOpen]);

  // Update filter when initialDoctorId prop changes
  useEffect(() => {
    if (initialDoctorId) {
      setSelectedDoctorFilter(initialDoctorId);
    } else {
      setSelectedDoctorFilter(null);
    }
  }, [initialDoctorId]);

  // Auto-hide notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const filteredPatients = mockPatients.filter(p => 
    p.name.toLowerCase().includes(patientSearch.toLowerCase()) || 
    p.phone.includes(patientSearch)
  );

  const handlePatientSelect = (patient: Patient) => {
    setSelectedPatient(patient);
    setPatientSearch(patient.name);
    setShowPatientResults(false);
  };

  const handleDoctorSelect = (doctorId: string) => {
    const doc = mockDoctors.find(d => d.id === doctorId);
    setSelectedDoctor(doc || null);
  };

  const handleNewAppointmentClick = (slotTime?: string) => {
    if (selectedDoctorFilter) {
      const doc = mockDoctors.find(d => d.id === selectedDoctorFilter);
      if (doc) setSelectedDoctor(doc);
    } else {
      setSelectedDoctor(null);
    }

    if (slotTime) {
      setFormData(prev => ({ ...prev, time: slotTime }));
    }
    
    setIsModalOpen(true);
  };

  const handleBookAppointment = () => {
    if (!selectedPatient) {
      setNotification({ message: 'Please select a patient', type: 'error' });
      return;
    }
    if (!selectedDoctor) {
      setNotification({ message: 'Please select a doctor', type: 'error' });
      return;
    }
    if (!formData.time) {
      setNotification({ message: 'Please select a time slot', type: 'error' });
      return;
    }

    const isSlotTaken = appointments.some(apt => 
        apt.doctorName === selectedDoctor.name && 
        apt.date === formData.date && 
        apt.time === formData.time
    );

    if (isSlotTaken) {
        setNotification({ message: 'This slot is already booked for Dr. ' + selectedDoctor.name, type: 'error' });
        return;
    }

    const newAppointment: Appointment = {
      id: `APT-${Math.floor(Math.random() * 10000)}`,
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      doctorName: selectedDoctor.name,
      department: selectedDoctor.department,
      date: formData.date,
      time: formData.time,
      duration: 15, // default
      status: 'Scheduled',
      type: formData.type,
      notes: formData.notes
    };

    addMockAppointment(newAppointment);
    setAppointments([...mockAppointments]);
    setNotification({ message: 'Appointment booked successfully!', type: 'success' });
    setIsModalOpen(false);
    
    setSelectedPatient(null);
    setPatientSearch('');
    setSelectedDoctor(null);
    setFormData(prev => ({ ...prev, notes: '' }));
  };

  const getAppointmentsForSlot = (time: string) => {
    let filtered = appointments;
    
    // Apply doctor filter
    if (selectedDoctorFilter) {
      const doctorName = mockDoctors.find(d => d.id === selectedDoctorFilter)?.name;
      if (doctorName) {
        filtered = filtered.filter(app => app.doctorName === doctorName);
      }
    }

    return filtered.filter(app => app.time === time);
  };

  const getStatusColor = (status: Appointment['status']) => {
    switch(status) {
      case 'Scheduled': return 'bg-sky-50 border-sky-200 text-sky-700 dark:bg-sky-900/30 dark:border-sky-800 dark:text-sky-300';
      case 'Completed': return 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/30 dark:border-emerald-800 dark:text-emerald-300';
      case 'Cancelled': return 'bg-rose-50 border-rose-200 text-rose-700 dark:bg-rose-900/30 dark:border-rose-800 dark:text-rose-300';
      case 'Checked-In': return 'bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-900/30 dark:border-violet-800 dark:text-violet-300';
      default: return 'bg-slate-50 border-slate-200';
    }
  };

  // Toggle doctor filter
  const toggleDoctorFilter = (doctorId: string) => {
    if (selectedDoctorFilter === doctorId) {
      setSelectedDoctorFilter(null);
    } else {
      setSelectedDoctorFilter(doctorId);
    }
  };

  return (
    <div className="space-y-6 h-auto md:h-[calc(100vh-9rem)] flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 relative pb-10 md:pb-0">
      
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-24 right-6 z-[100] px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 text-white animate-in slide-in-from-top-4 duration-300 ${notification.type === 'success' ? 'bg-emerald-600' : 'bg-rose-500'}`}>
           {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
           <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 dark:text-white tracking-tight">Appointment Management</h1>
          <p className="text-slate-500 dark:text-slate-400">Schedule, reschedule, and manage clinical visits.</p>
        </div>
        <button 
          onClick={() => handleNewAppointmentClick()}
          className="bg-primary hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-primary-500/20 hover:scale-105 w-full md:w-auto justify-center font-medium text-sm"
        >
          <Plus className="w-4 h-4 stroke-[3]" />
          New Appointment
        </button>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Calendar Sidebar */}
        <div className="w-full lg:w-80 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 h-fit shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-slate-800 dark:text-white">October 2023</h3>
            <div className="flex gap-2">
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 transition-colors"><ChevronLeft className="w-4 h-4" /></button>
              <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-400 transition-colors"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2 text-center text-sm mb-3">
            {['S','M','T','W','T','F','S'].map(d => <span key={d} className="text-slate-400 font-bold text-xs">{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-2 text-center text-sm">
            {Array.from({length: 31}).map((_, i) => (
              <button 
                key={i} 
                className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all text-xs font-medium ${i+1 === 27 ? 'bg-primary text-white shadow-md shadow-primary-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'}`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-700">
            <h4 className="font-bold text-slate-800 dark:text-white mb-4 text-xs uppercase tracking-wide">Filter by Doctor</h4>
            <div className="space-y-2">
              <label className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 rounded-lg transition-colors group">
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedDoctorFilter === null ? 'bg-primary border-primary' : 'border-slate-300 dark:border-slate-600 group-hover:border-primary'}`}>
                    {selectedDoctorFilter === null && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                </div>
                <input 
                  type="checkbox" 
                  checked={selectedDoctorFilter === null}
                  onChange={() => setSelectedDoctorFilter(null)}
                  className="hidden" 
                />
                All Doctors
              </label>
              {mockDoctors.slice(0, 5).map(doc => (
                 <label key={doc.id} className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 p-2 rounded-lg transition-colors group">
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${selectedDoctorFilter === doc.id ? 'bg-primary border-primary' : 'border-slate-300 dark:border-slate-600 group-hover:border-primary'}`}>
                        {selectedDoctorFilter === doc.id && <div className="w-2 h-2 bg-white rounded-sm"></div>}
                    </div>
                    <input 
                      type="checkbox" 
                      checked={selectedDoctorFilter === doc.id}
                      onChange={() => toggleDoctorFilter(doc.id)}
                      className="hidden" 
                    />
                    {doc.name}
                 </label>
              ))}
            </div>
          </div>
        </div>

        {/* Daily Schedule - Flexible Height */}
        <div className="flex-1 bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col min-h-[500px]">
          <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0 backdrop-blur-sm">
            <div className="flex items-center gap-4">
               <h3 className="font-bold text-slate-800 dark:text-white text-lg">Friday, Oct 27</h3>
               <div className="flex gap-2">
                 <span className="px-2.5 py-0.5 rounded-full bg-primary-100 text-primary dark:bg-primary-900/30 dark:text-primary-300 text-xs font-bold border border-primary-200 dark:border-primary-800">Today</span>
                 {selectedDoctorFilter && (
                   <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300 text-xs font-bold flex items-center gap-1 border border-slate-200 dark:border-slate-600">
                     {mockDoctors.find(d => d.id === selectedDoctorFilter)?.name}
                     <X className="w-3 h-3 cursor-pointer hover:text-red-500 transition-colors" onClick={() => setSelectedDoctorFilter(null)} />
                   </span>
                 )}
               </div>
            </div>
            <div className="flex gap-1 bg-slate-100 dark:bg-slate-700 p-1 rounded-lg">
                <button className="px-3 py-1 text-xs font-bold bg-white dark:bg-slate-600 rounded-md shadow-sm text-slate-800 dark:text-white">Day</button>
                <button className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">Week</button>
                <button className="px-3 py-1 text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200">List</button>
            </div>
          </div>
          
          <div className="overflow-y-auto flex-1 p-2 md:p-4 custom-scrollbar">
            <div className="divide-y divide-slate-50 dark:divide-slate-800/50">
              {timeSlots.map(slot => {
                const apps = getAppointmentsForSlot(slot);
                return (
                  <div key={slot} className="flex min-h-[120px] group relative">
                    <div className="w-20 md:w-24 py-4 text-xs font-bold text-slate-400 border-r border-slate-100 dark:border-slate-700/50 pr-4 text-right shrink-0 sticky left-0">
                      {slot}
                    </div>
                    <div className="flex-1 p-2 pl-2 md:pl-4 relative">
                      {/* Hover Line */}
                      <div className="absolute top-0 left-0 w-full h-px bg-slate-50 dark:bg-slate-800 group-hover:bg-slate-100 dark:group-hover:bg-slate-700 transition-colors"></div>

                      {apps.length === 0 && (
                        <button 
                           onClick={() => handleNewAppointmentClick(slot)}
                           className="absolute left-4 top-4 opacity-0 group-hover:opacity-100 bg-white dark:bg-slate-700 border border-dashed border-slate-300 dark:border-slate-500 text-slate-500 dark:text-slate-300 px-3 py-1.5 rounded-lg text-xs font-medium hover:border-primary hover:text-primary transition-all shadow-sm z-20 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {apps.map(app => (
                            <div key={app.id} className={`p-3 rounded-xl border border-l-4 mb-2 last:mb-0 ${getStatusColor(app.status)} relative z-10 shadow-sm hover:shadow-md transition-all cursor-pointer bg-opacity-10 dark:bg-opacity-10 bg-white dark:bg-slate-800`}>
                            <div className="flex flex-col gap-2">
                                <div className="flex justify-between items-start">
                                    <div className="font-bold text-sm flex items-center gap-2 text-slate-800 dark:text-white">
                                        {app.type === 'Telemedicine' ? <Video className="w-3.5 h-3.5 text-sky-500" /> : <User className="w-3.5 h-3.5 text-emerald-500" />}
                                        {app.patientName}
                                    </div>
                                    <span className="text-[10px] font-bold uppercase tracking-wider opacity-70">{app.status}</span>
                                </div>
                                <div className="text-xs text-slate-500 dark:text-slate-400 pl-5.5">
                                    <p className="font-medium text-slate-700 dark:text-slate-300">{app.doctorName}</p>
                                    <p>{app.department}</p>
                                </div>
                                {app.notes && (
                                    <div className="mt-1 text-[10px] bg-white/50 dark:bg-black/20 p-1.5 rounded text-slate-600 dark:text-slate-400 italic border border-black/5">
                                    "{app.notes}"
                                    </div>
                                )}
                            </div>
                            </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-300">
           <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90dvh] border border-slate-100 dark:border-slate-700">
              <div className="p-5 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md">
                 <h2 className="font-bold text-lg text-slate-800 dark:text-white">Book Appointment</h2>
                 <button onClick={() => setIsModalOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400 transition-colors">
                    <X className="w-5 h-5" />
                 </button>
              </div>
              
              <div className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                 {/* Patient Search */}
                 <div className="space-y-2 relative">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Patient Search <span className="text-rose-500">*</span></label>
                    <div className="relative">
                       <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                       <input 
                          type="text" 
                          placeholder="Type name or phone number..." 
                          value={patientSearch}
                          onChange={(e) => {
                             setPatientSearch(e.target.value);
                             setShowPatientResults(true);
                             if(!e.target.value) setSelectedPatient(null);
                          }}
                          onFocus={() => setShowPatientResults(true)}
                          className={`w-full pl-10 pr-4 py-2.5 border rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all bg-slate-50/50 dark:bg-slate-900 dark:text-white text-sm ${selectedPatient ? 'border-emerald-500 bg-emerald-50/30 dark:bg-emerald-900/20' : 'border-slate-200 dark:border-slate-700'}`}
                       />
                       {selectedPatient && (
                          <CheckCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-500" />
                       )}
                    </div>
                    {/* Search Results Dropdown */}
                    {showPatientResults && patientSearch && !selectedPatient && (
                       <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-xl shadow-xl z-20 max-h-48 overflow-y-auto custom-scrollbar">
                          {filteredPatients.length > 0 ? (
                             filteredPatients.map(p => (
                                <div 
                                   key={p.id} 
                                   onClick={() => handlePatientSelect(p)}
                                   className="p-3 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-50 dark:border-slate-700 last:border-none flex justify-between items-center group"
                                >
                                   <div>
                                      <p className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-primary transition-colors">{p.name}</p>
                                      <p className="text-xs text-slate-500 dark:text-slate-400">{p.phone}</p>
                                   </div>
                                   <span className="text-[10px] font-mono bg-slate-100 dark:bg-slate-700 px-2 py-1 rounded text-slate-500 dark:text-slate-400">{p.id}</span>
                                </div>
                             ))
                          ) : (
                             <div className="p-4 text-sm text-slate-500 text-center">No patients found.</div>
                          )}
                       </div>
                    )}
                 </div>

                 {/* Doctor Selection */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Doctor <span className="text-rose-500">*</span></label>
                       <select 
                          className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none bg-slate-50/50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-primary-100 focus:border-primary-300 text-sm transition-all"
                          onChange={(e) => handleDoctorSelect(e.target.value)}
                          value={selectedDoctor?.id || ''}
                       >
                          <option value="">Select Doctor</option>
                          {mockDoctors.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Department</label>
                       <input 
                          type="text" 
                          readOnly 
                          value={selectedDoctor?.department || ''} 
                          className="w-full p-2.5 border border-slate-200 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 rounded-xl outline-none text-slate-500 dark:text-slate-400 cursor-not-allowed text-sm"
                          placeholder="Auto-filled"
                       />
                    </div>
                 </div>

                 {/* Date & Time */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Date <span className="text-rose-500">*</span></label>
                       <input 
                          type="date" 
                          value={formData.date}
                          onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                          className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 bg-slate-50/50 dark:bg-slate-900 dark:text-white text-sm transition-all" 
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Time <span className="text-rose-500">*</span></label>
                       <select 
                          value={formData.time}
                          onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                          className="w-full p-2.5 border border-slate-200 dark:border-slate-700 rounded-xl outline-none bg-slate-50/50 dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-primary-100 focus:border-primary-300 text-sm transition-all"
                       >
                          <option value="">Select Slot</option>
                          {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                       </select>
                    </div>
                 </div>

                 {/* Visit Type */}
                 <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Visit Type</label>
                    <div className="flex flex-wrap gap-4">
                       {['In-Person', 'Telemedicine', 'Walk-In'].map((type) => (
                           <label key={type} className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300 cursor-pointer group">
                              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${formData.type === type ? 'border-primary' : 'border-slate-300 dark:border-slate-600'}`}>
                                  {formData.type === type && <div className="w-2 h-2 rounded-full bg-primary"></div>}
                              </div>
                              <input 
                                 type="radio" 
                                 name="type" 
                                 checked={formData.type === type}
                                 onChange={() => setFormData(prev => ({ ...prev, type: type as any }))}
                                 className="hidden" 
                              /> 
                              <span className="group-hover:text-primary transition-colors">{type}</span>
                           </label>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-2">
                     <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Notes</label>
                     <textarea 
                        value={formData.notes}
                        onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                        className="w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl h-24 resize-none outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 text-sm bg-slate-50/50 dark:bg-slate-900 dark:text-white transition-all" 
                        placeholder="Reason for visit, symptoms, etc..."
                     ></textarea>
                 </div>
              </div>

              <div className="p-5 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-3 bg-slate-50/50 dark:bg-slate-900 mt-auto">
                 <button onClick={() => setIsModalOpen(false)} className="px-5 py-2.5 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-sm font-bold transition-colors">Cancel</button>
                 <button 
                    onClick={handleBookAppointment}
                    className="px-6 py-2.5 bg-primary hover:bg-primary-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-primary-500/20 transition-all hover:scale-105 flex items-center gap-2"
                 >
                    <CheckCircle className="w-4 h-4" />
                    Confirm Booking
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
