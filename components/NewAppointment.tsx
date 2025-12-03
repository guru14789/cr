
import React, { useState } from 'react';
import { 
  Calendar, Clock, User, FileText, ChevronDown, Search, Plus, 
  X, CheckCircle, ArrowLeft, Save, Stethoscope, Building
} from 'lucide-react';
import { mockPatients, mockDoctors, mockDepartments } from '../services/mockData';

interface NewAppointmentProps {
  onCancel: () => void;
  onSave: () => void;
}

export const NewAppointment: React.FC<NewAppointmentProps> = ({ onCancel, onSave }) => {
  const [formData, setFormData] = useState({
    patientId: '',
    department: '',
    doctorId: '',
    type: 'In-Person',
    date: '',
    time: '',
    reason: '',
    status: 'Scheduled'
  });

  const [notification, setNotification] = useState<string | null>(null);

  // Generate a mock ID
  const appointmentId = "AP234354";

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    // Validation could go here
    setNotification('Appointment created successfully!');
    setTimeout(() => {
      onSave();
    }, 1500);
  };

  const inputClass = "w-full p-3 border border-slate-200 dark:border-slate-700 rounded-xl outline-none focus:ring-2 focus:ring-primary-100 focus:border-primary-300 transition-all bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 placeholder:text-slate-400 text-sm";
  const labelClass = "block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1.5";

  // Filter doctors based on selected department
  const filteredDoctors = formData.department 
    ? mockDoctors.filter(doc => doc.department === formData.department)
    : mockDoctors;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-300 pb-10 flex flex-col h-full">
      {/* Notification Toast */}
      {notification && (
        <div className="fixed top-24 right-6 z-50 bg-emerald-600 text-white px-6 py-3 rounded-xl shadow-xl flex items-center gap-3 animate-in slide-in-from-right-10 duration-300">
            <CheckCircle className="w-5 h-5" />
            <span className="font-medium">{notification}</span>
        </div>
      )}

      {/* Header */}
      <div className="mb-6 flex items-center gap-4">
        <button 
          onClick={onCancel}
          className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-xl font-bold text-slate-800 dark:text-white">Appointments</h1>
      </div>

      {/* Form Card */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-soft border border-slate-100 dark:border-slate-800 flex-1 flex flex-col">
         <div className="p-6 md:p-8 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                
                {/* Appointment ID */}
                <div className="md:col-span-2">
                    <label className={labelClass}>Appointment ID <span className="text-rose-500">*</span></label>
                    <input 
                      type="text" 
                      value={appointmentId} 
                      readOnly 
                      className={`${inputClass} bg-slate-50 dark:bg-slate-900 cursor-not-allowed text-slate-500`} 
                    />
                </div>

                {/* Patient */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <label className={labelClass}>Patient <span className="text-rose-500">*</span></label>
                        <button className="text-xs font-bold text-primary hover:text-primary-700 flex items-center gap-1 transition-colors">
                            <Plus className="w-3 h-3" /> Add New
                        </button>
                    </div>
                    <select 
                      value={formData.patientId}
                      onChange={(e) => handleChange('patientId', e.target.value)}
                      className={inputClass}
                    >
                        <option value="">Select Patient</option>
                        {mockPatients.map(p => (
                            <option key={p.id} value={p.id}>{p.name} ({p.id})</option>
                        ))}
                    </select>
                </div>

                {/* Department */}
                <div>
                    <label className={labelClass}>Department <span className="text-rose-500">*</span></label>
                    <select 
                      value={formData.department}
                      onChange={(e) => handleChange('department', e.target.value)}
                      className={inputClass}
                    >
                        <option value="">Select Department</option>
                        {mockDepartments.map(d => (
                            <option key={d.id} value={d.name}>{d.name}</option>
                        ))}
                    </select>
                </div>

                {/* Doctor */}
                <div>
                    <label className={labelClass}>Doctor <span className="text-rose-500">*</span></label>
                    <select 
                      value={formData.doctorId}
                      onChange={(e) => handleChange('doctorId', e.target.value)}
                      className={inputClass}
                      disabled={!formData.department} // Optional: disable if no dept selected
                    >
                        <option value="">Select Doctor</option>
                        {filteredDoctors.map(d => (
                            <option key={d.id} value={d.id}>{d.name}</option>
                        ))}
                    </select>
                </div>

                {/* Appointment Type */}
                <div>
                    <label className={labelClass}>Appointment Type <span className="text-rose-500">*</span></label>
                    <select 
                      value={formData.type}
                      onChange={(e) => handleChange('type', e.target.value)}
                      className={inputClass}
                    >
                        <option value="In-Person">In-Person</option>
                        <option value="Online">Online Consultation</option>
                        <option value="Home Visit">Home Visit</option>
                    </select>
                </div>

                {/* Date */}
                <div>
                    <label className={labelClass}>Date of Appointment <span className="text-rose-500">*</span></label>
                    <div className="relative">
                        <input 
                          type="date" 
                          value={formData.date}
                          onChange={(e) => handleChange('date', e.target.value)}
                          className={inputClass} 
                        />
                        <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                {/* Time */}
                <div>
                    <label className={labelClass}>Time <span className="text-rose-500">*</span></label>
                    <div className="relative">
                        <input 
                          type="time" 
                          value={formData.time}
                          onChange={(e) => handleChange('time', e.target.value)}
                          className={inputClass} 
                        />
                        <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                    </div>
                </div>

                {/* Reason */}
                <div className="md:col-span-2">
                    <label className={labelClass}>Appointment Reason <span className="text-rose-500">*</span></label>
                    <textarea 
                      value={formData.reason}
                      onChange={(e) => handleChange('reason', e.target.value)}
                      className={`${inputClass} resize-none h-32`}
                      placeholder="Describe symptoms or reason for visit..."
                    ></textarea>
                </div>

                {/* Status */}
                <div className="md:col-span-2">
                    <label className={labelClass}>Status <span className="text-rose-500">*</span></label>
                    <select 
                      value={formData.status}
                      onChange={(e) => handleChange('status', e.target.value)}
                      className={inputClass}
                    >
                        <option value="Scheduled">Scheduled</option>
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                    </select>
                </div>
            </div>
         </div>

         {/* Footer Actions */}
         <div className="p-6 md:p-8 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 rounded-b-2xl">
             <button 
               onClick={onCancel}
               className="px-6 py-2.5 text-slate-600 dark:text-slate-300 font-bold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors"
             >
                Cancel
             </button>
             <button 
               onClick={handleSubmit}
               className="px-6 py-2.5 bg-primary hover:bg-primary-700 text-white font-bold text-sm rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:scale-105"
             >
                Create Appointment
             </button>
         </div>
      </div>

      <div className="text-center mt-8 text-xs text-slate-400 font-medium">
         2025 © Preclinic, All Rights Reserved
      </div>
    </div>
  );
};
